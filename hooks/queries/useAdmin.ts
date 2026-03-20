import { adminService } from "@/services/admin.service";
import { useIsHydrated, useUserType } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";

export function useAdminProfile() {
  const isHydrated = useIsHydrated();
  const userType = useUserType();
  return useQuery({
    queryKey: ["admin", "profile"],
    queryFn: () => adminService.getProfile(),
    // Only fetch when hydrated AND the logged-in user is actually an admin
    enabled: isHydrated && userType === "admin",
  });
}
