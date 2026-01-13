import { GetAllNotificationsRequest, GetAllNotificationsResponse, RegisterDeviceRequest, TableData } from "./common.dtos";

export interface IRegisterDeviceUseCase {
    execute(payload: RegisterDeviceRequest): Promise<void>;
};

export interface IGetAllNotificationsUseCase {
    execute(payload: GetAllNotificationsRequest): Promise<TableData<GetAllNotificationsResponse>>
}