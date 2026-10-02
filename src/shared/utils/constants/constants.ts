import { IdType } from "../types/enums";
import { NotificationChannel } from "../../../application/dtos/common.dto";
import { NotificationType } from "../../../domain/commands/notification.commands";

// Google calendar event
export enum EventData {
  eventTitle = "Slotflow Appointment",
  eventAddBorderColor = "#635bff",
  eventAddTextColor = "#ffffff",
  eventCancelBorderColor = "#ff0000",
  eventCancelTextColor = "#ffffff",
  eventTimeZone = "Asia/Kolkata",
}

// Email service
export const emailServiceConstants = {
  gmail: "Gmail",
  slotflow: "Slotflow",
  source: "no-reply@slotflow.online"
};

export const notificationChannel = {
  EMAIL: 'email',
  PUSH: 'push',
  IN_APP: 'in_app',
} as const satisfies Record<string, NotificationChannel>;

export const notificationType = {
  ACCOUNT_ACTIVITY: 'account_activity',
  SYSTEM_UPDATES: 'system_updates',
  PROMOTIONAL_UPDATES: 'promotional_updates',
} as const satisfies Record<string, NotificationType>;

export const PREFIX_MAP: Record<IdType, string> = {
  [IdType.EVENT]: "sf_evt_",
  [IdType.TRANSACTION]: "sf_trx_",
  [IdType.ROOM]: "sf_room_",
  [IdType.IDEMPOTENCY]: "sf_idem_",
  [IdType.FILE]: "sf_file_",
} as const;