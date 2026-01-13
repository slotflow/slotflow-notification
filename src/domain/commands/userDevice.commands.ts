import { UserDeviceProps } from "../contracts/userDevice.contract";

export type CreateUserDeviceProps = Pick<UserDeviceProps, "userId" | "fcmToken" | "platform" | "deviceId">;