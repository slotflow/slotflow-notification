import { IdType } from "../types/enums";

// Google calendar event
export enum EventData {
  eventTitle = "Slotflow Appointment",
  eventAddBorderColor = "#635bff",
  eventAddTextColor = "#ffffff",
  eventCancelBorderColor = "#ff0000",
  eventCancelTextColor = "#fa3535",
  eventTimeZone = "Asia/Kolkata",
}

// Email service
export const emailServiceConstants = {
  gmail: "Gmail",
  slotflow: "Slotflow",
  source: "no-reply@slotflow.online",
};

export const PREFIX_MAP: Record<IdType, string> = {
  [IdType.EVENT]: "sf_evt_",
  [IdType.TRANSACTION]: "sf_trx_",
  [IdType.ROOM]: "sf_room_",
  [IdType.IDEMPOTENCY]: "sf_idem_",
  [IdType.FILE]: "sf_file_",
} as const;
