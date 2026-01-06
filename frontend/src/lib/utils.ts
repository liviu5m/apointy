import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { User } from "./Types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserRole(user: User | null): string {
  if (!user) return "default";
  if (user.role == "CUSTOMER") return "customer";
  if (user.role == "BUSINESS_OWNER") return "owner";
  return "default";
}

export function convertEnumServiceDuration(duration: string) {
  switch (duration) {
    case "MIN_15":
      return "15 min";
    case "MIN_30":
      return "30 min";
    case "MIN_45":
      return "45 min";
    case "HOUR_1":
      return "1 hour";
    case "HOUR_1_5":
      return "1.5 hours";
    case "HOUR_2":
      return "2 hours";
    default:
      return "";
  }
}
