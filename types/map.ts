import { UserType } from "./auth.types";

export const PROVIDER_MAP: Record<UserType, string> = {
  customer: "customer-login",
  driver: "driver-login",
  admin: "admin-login",
};

export const REDIRECT_MAP: Record<UserType, string> = {
  customer: "/customer/dashboard",
  driver: "/driver/dashboard",
  admin: "/admin/dashboard",
};
