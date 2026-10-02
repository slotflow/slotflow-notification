import { google } from "googleapis";
import { ERROR_CODES } from "../../shared/utils/types/enums";
import { EventData } from "../../shared/utils/constants/constants";
import { AppError, UnauthorizedError } from "../../shared/error/appError";
import { IGoogleCalendarService,  } from "../../application/interfaces/services/IGoogleCalendarGateway.service";
import { AddEventToCalendarProps, UpdateGoogleCalendarEventRequest, CreateGoogleCalendarEventRequest, GetEventsFromCalendarProps } from "../../application/dtos/googleCalendar.dto";

export class GoogleCalendarGatewayServiceImpl implements IGoogleCalendarService {

    async createEvent(payload: CreateGoogleCalendarEventRequest): Promise<string> {
        try {
            const { appointmentDate, appointmentStatus, slotDuration, accessToken } = payload;

            const startDate = new Date(appointmentDate);
            const endDate = new Date(startDate.getTime() + slotDuration * 60 * 1000);

            const event: AddEventToCalendarProps = {
                summary: "Service Appointment",
                description: `You have an appointment scheduled on ${startDate.toLocaleString("en-IN", {
                    dateStyle: "full",
                    timeStyle: "short",
                })}`,
                start: {
                    dateTime: startDate.toISOString(),
                    timeZone: EventData.eventTimeZone,
                },
                end: {
                    dateTime: endDate.toISOString(),
                    timeZone: EventData.eventTimeZone,
                },
                extendedProperties: {
                    private: {
                        bookingStatus: appointmentStatus,
                        title: EventData.eventTitle,
                        backgroundColor: EventData.eventAddBorderColor,
                        textColor: EventData.eventAddTextColor,
                    },
                },
            };

            const auth = new google.auth.OAuth2();
            auth.setCredentials({ access_token: accessToken });

            const calendar = google.calendar({
                version: "v3",
                auth,
            });

            const response = await calendar.events.insert({
                calendarId: "primary",
                requestBody: event,
            });

            if (!response.data?.id) {
                throw new AppError(
                    "Failed to create Google Calendar event",
                    500,
                    false,
                    ERROR_CODES.GOOGLE_API_ERROR
                );
            }

            return response.data.id;
        } catch (error) {
            throw new AppError(
                "Failed to create Google Calendar event",
                500,
                false,
                ERROR_CODES.GOOGLE_API_ERROR
            );
        }
    };

    async updateEvent(payload: UpdateGoogleCalendarEventRequest): Promise<string> {
        try {
            const { accessToken, appointmentDate, appointmentStatus, eventId } = payload;

            const startDate = new Date(appointmentDate);

            const eventUpdate: Partial<AddEventToCalendarProps> = {
                description: `Appointment scheduled on ${startDate.toLocaleString("en-IN", {
                    dateStyle: "full",
                    timeStyle: "short",
                })} has been ${appointmentStatus}`,
                extendedProperties: {
                    private: {
                        bookingStatus: appointmentStatus,
                        title: `${EventData.eventTitle} ${appointmentStatus}`,
                        backgroundColor: EventData.eventCancelBorderColor,
                        textColor: EventData.eventCancelTextColor,
                    },
                },
            };

            const auth = new google.auth.OAuth2();
            auth.setCredentials({ access_token: accessToken });

            const calendar = google.calendar({ version: "v3", auth });

            const response = await calendar.events.update({
                calendarId: "primary",
                eventId,
                requestBody: eventUpdate,
            });

            if (!response.data?.id) {
                throw new AppError(
                    "Failed to update Google Calendar event",
                    500,
                    false,
                    ERROR_CODES.GOOGLE_API_ERROR
                );
            }

            return response.data.id;
        } catch (error) {
            throw new AppError(
                "Failed to update Google Calendar event",
                500,
                false,
                ERROR_CODES.GOOGLE_API_ERROR
            );
        }
    };

     async findEvents(accessToken: string): Promise<Array<GetEventsFromCalendarProps>> {
        try {

            const auth = new google.auth.OAuth2();
            auth.setCredentials({ access_token: accessToken });

            const calendar = google.calendar({ version: "v3", auth });

            const response = await calendar.events.list({
                calendarId: "primary",
            });

            return (response.data.items ?? []) as Array<GetEventsFromCalendarProps>;
        } catch (error: unknown) {
            throw this.handleGoogleError(error, "fetch events");
        }
    };

    private handleGoogleError(error: any, action: string): AppError {

        const status = error?.code || error?.response?.status;

        if (status === 401) {
            return new UnauthorizedError(
                "Google access token expired or invalid",
                ERROR_CODES.TOKEN_EXPIRED
            );
        }

        if (status === 403) {
            return new AppError(
                "Google permission denied",
                403,
                true,
                ERROR_CODES.FORBIDDEN
            );
        }

        if (status === 429) {
            return new AppError(
                "Google API rate limit exceeded",
                429,
                true,
                ERROR_CODES.GOOGLE_API_ERROR
            );
        }

        return new AppError(
            `Google API failed to ${action}`,
            502,
            false,
            ERROR_CODES.GOOGLE_API_ERROR
        );
    }

};
