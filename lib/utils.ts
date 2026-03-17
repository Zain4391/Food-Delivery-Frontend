import { ROLES } from "@/types/auth.types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string | null | undefined): string {
  if (!name) return "AD";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getRoleBadgeVariant(role: ROLES | undefined) {
  switch (role) {
    case ROLES.ADMIN:
      return "destructive";
    case ROLES.DRIVER:
      return "secondary";
    case ROLES.CUSTOMER:
    default:
      return "outline";
  }
}
