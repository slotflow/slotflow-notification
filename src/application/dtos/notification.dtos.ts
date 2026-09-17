import { NotificationType } from "@aws-sdk/client-ses";
import { AppConnect, AppointmentStatus, PaymentAccountStatus, PlanName } from "../../domain/enums/enum";
import { notificationTemplateConstants } from "../../shared/utils/constants/notificationConstants";

// Notification data common event input
interface CommonNotificationEventInput {
    userId: string;
    notificationType: NotificationType;
}

/**
 * Main backend service notifications dtos
 */

export interface SendAccountBlockStatusNotificationEventInput extends CommonNotificationEventInput {
    templateKey: typeof notificationTemplateConstants.accountBlockStatus;
    isBlocked: boolean;
}

export interface SendAccountTrustStatusNotificationEventInput extends CommonNotificationEventInput{
    templateKey: typeof notificationTemplateConstants.accountTrustStatus;
    isTrusted: boolean;
}

export interface SendAppointmentStatusChangeForUserNotificationEventInput extends CommonNotificationEventInput {
    templateKey: typeof notificationTemplateConstants.providerAppointmentStatusForUser;
    appointmentStatus: AppointmentStatus;
}

export interface SendAppointmentStatusChangeForProviderNotificationEventInput extends CommonNotificationEventInput {
    templateKey: typeof notificationTemplateConstants.providerAppointmentStatusForProvider;
    appointmentDate: string;
    appointmentTime: string;
    appointmentMode: string;
    appointmentStatus: AppointmentStatus;
}

export interface SendAppConnectNotificationEventInput extends CommonNotificationEventInput {
    templateKey: typeof notificationTemplateConstants.appConnect;
    appName: AppConnect;
}

export interface ProviderPlanSubscribedNotificationEventInput extends CommonNotificationEventInput {
    templateKey: typeof notificationTemplateConstants.planSubscribed;
    planName: PlanName;
    isTrialBoolean: boolean;
    currentPeriodEnd: string;
}

export interface SlotBookedNotificationNotificationEventInput extends CommonNotificationEventInput {
    templateKey: typeof notificationTemplateConstants.slotBooked;
    appointmentDate: string;
    appointmentTime: string;
    providerName: string;
}

export interface GotAnAppointmentNotificationEventInput extends CommonNotificationEventInput {
    templateKey: typeof notificationTemplateConstants.gotAnAppointment;
    appointmentDate: string;
    appointmentTime: string;
    customerName: string;
}

export interface SendUpdatePasswordNotificationEventInput extends CommonNotificationEventInput {
    templateKey: typeof notificationTemplateConstants.passwordUpdate;
}


/**
 * Payment service notifications dtos
 */


// provider create payment success event
export interface ProviderSubscriptionPaymentSuccessNotificationEventInput extends CommonNotificationEventInput {
    templateKey: typeof notificationTemplateConstants.providerSubscriptionPaymentSuccess;
    transactionId: string;
};

// provider create payment failed event
export interface ProviderSubscriptionPaymentFailedNotificationEventInput extends CommonNotificationEventInput {
    templateKey: typeof notificationTemplateConstants.providerSubscriptionPaymentFailed;
};


export interface CreateBookingPaymentSuccessNotificationEventInput extends CommonNotificationEventInput {
    templateKey: typeof notificationTemplateConstants.userBookingPaymentSuccess;
    transactionId: string;
}

export interface StripeAccountStatusUpdatedNotificationEventInput extends CommonNotificationEventInput {
    templateKey: typeof notificationTemplateConstants.stripeAccountStatusUpdated;
    accountStatus: PaymentAccountStatus;
}

export interface UserBookingRefundPaymentSuccessNotificationEventInput extends CommonNotificationEventInput {
    templateKey: typeof notificationTemplateConstants.userBookingRefundPaymentSuccess;
    refundAmount: number;
    transactionId: string;
}


export type NotificationEventPayload =
    | SendAccountBlockStatusNotificationEventInput
    | SendAccountTrustStatusNotificationEventInput
    | SendAppointmentStatusChangeForUserNotificationEventInput
    | SendAppointmentStatusChangeForProviderNotificationEventInput
    | SendAppConnectNotificationEventInput
    | ProviderSubscriptionPaymentSuccessNotificationEventInput
    | ProviderSubscriptionPaymentFailedNotificationEventInput
    | ProviderPlanSubscribedNotificationEventInput
    | CreateBookingPaymentSuccessNotificationEventInput
    | SlotBookedNotificationNotificationEventInput
    | StripeAccountStatusUpdatedNotificationEventInput
    | SendUpdatePasswordNotificationEventInput
    | GotAnAppointmentNotificationEventInput
    | UserBookingRefundPaymentSuccessNotificationEventInput;

export type NotificationTemplateKey = NotificationEventPayload["templateKey"];

type PayloadFor<K extends NotificationTemplateKey> = Extract<
    NotificationEventPayload,
    { templateKey: K }
>;

export interface NotificationTemplateDefinition<K extends NotificationTemplateKey> {
    title: (data: Omit<PayloadFor<K>, "templateKey" | "notificationType" | "userId">) => string;
    body: (data: Omit<PayloadFor<K>, "templateKey" | "notificationType" | "userId">) => string;
}

export type NotificationTemplateRegistry = {
    [K in NotificationTemplateKey]: NotificationTemplateDefinition<K>;
};