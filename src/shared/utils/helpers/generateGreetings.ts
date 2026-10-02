import { GreetingOptions } from "../types/types";

export function getGreeting(options?: GreetingOptions): string {
  const { timeZone, name } = options || {};

  let hour: number;

  if (timeZone) {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "numeric",
      hour12: false,
    });
    hour = parseInt(formatter.format(new Date()), 10);
  } else {
    hour = new Date().getHours();
  }

  // Determine time-of-day greeting
  let greeting: string;

  if (hour >= 5 && hour < 12) {
    greeting = "Good morning";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Good afternoon";
  } else if (hour >= 17 && hour < 22) {
    greeting = "Good evening";
  } else {
    greeting = "Good night";
  }

  return name ? `${greeting}, ${name}!` : `${greeting}!`;
}