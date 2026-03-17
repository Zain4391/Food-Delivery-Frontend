import { UserType } from "./auth.types";

export const PROVIDER_MAP: Record<UserType, string> = {
  customer: "customer-login",
  driver: "driver-login",
  admin: "admin-login",
};

export const REDIRECT_MAP: Record<UserType, string> = {
  customer: "/dashboard/customer",
  driver: "/dashboard/driver",
  admin: "/dashboard/admin",
};

type RoleConfig = {
  label: string;
  register?: { href: string; label: string };
};

export const ROLE_CONFIG: Record<UserType, RoleConfig> = {
  customer: {
    label: "Customer",
    register: { href: "/register/customer", label: "Create an account" },
  },
  driver: {
    label: "Driver",
    register: { href: "/register/driver", label: "Join as a driver" },
  },
  admin: {
    label: "Admin",
  },
};
