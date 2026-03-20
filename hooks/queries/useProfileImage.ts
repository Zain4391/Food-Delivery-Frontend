/**
 * useProfileImage
 *
 * Returns the profile image URL for the currently logged-in user
 * regardless of role, by fetching their role-specific profile endpoint.
 *
 * Used by the Header so the uploaded photo shows immediately after
 * the settings page upload mutation invalidates the relevant query.
 */
"use client";

import { useIsHydrated, useUserType } from "@/store/auth.store";
import { useAdminProfile } from "./useAdmin";
import { useCustomerProfile } from "./useCustomer";
import { useDriverProfile } from "./useDriver";

export function useProfileImage(): string {
  const isHydrated = useIsHydrated();
  const userType = useUserType();

  // Each hook is always called (rules of hooks) but only one will
  // actually fetch because of the enabled flag.
  const { data: adminProfile } = useAdminProfile();
  const { data: customerProfile } = useCustomerProfile();
  const { data: driverProfile } = useDriverProfile();

  if (!isHydrated) return "";

  switch (userType) {
    case "admin":
      return adminProfile?.profile_img_url ?? "";
    case "customer":
      return customerProfile?.profile_img_url ?? "";
    case "driver":
      return driverProfile?.profile_img_url ?? "";
    default:
      return "";
  }
}
