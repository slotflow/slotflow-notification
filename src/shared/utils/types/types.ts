export type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

export interface GreetingOptions {
  timeZone?: string; // Optional IANA timezone string, e.g. "Asia/Kolkata"
  name?: string;     // Optional user name
}