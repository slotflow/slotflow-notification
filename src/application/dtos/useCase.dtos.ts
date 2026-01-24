import { GetAllNotificationsRequest, GetAllNotificationsResponse, RegisterDeviceRequest, SendNotificationRequest, TableData } from "./common.dtos";

export interface IRegisterDeviceUseCase {
    execute(payload: RegisterDeviceRequest): Promise<void>;
};

export interface IGetAllNotificationsUseCase {
    execute(payload: GetAllNotificationsRequest): Promise<TableData<GetAllNotificationsResponse>>;
};

export interface ISendNotificationUseCase {
    execute(payload: SendNotificationRequest): Promise<void>;
};