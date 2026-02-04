import { Platform } from "../enums/enum";

export interface UserDeviceProps {
  _id: string;
  userId: string;
  fcmToken: string;
  platform: Platform;
  deviceId: string;
  isActive: boolean;
  lastUsedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};
