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
