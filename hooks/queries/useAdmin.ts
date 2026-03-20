import { adminService } from "@/services/admin.service";
import { useIsHydrated } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";

export function useAdminProfile() {
  const isHydrated = useIsHydrated();
  return useQuery({
    queryKey: ["admin", "profile"],
    queryFn: () => adminService.getProfile(),
    enabled: isHydrated,
  });
}
