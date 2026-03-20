import { adminService } from "@/services/admin.service";
import { customerService } from "@/services/customer.service";
import { CustomerListParams } from "@/types/customer.types";
import { OrderListParams } from "@/types/order.types";
import { useIsHydrated, useUserType } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";

export function useCustomers(
  params?: CustomerListParams,
  options?: { enabled?: boolean },
) {
  const isHydrated = useIsHydrated();
  return useQuery({
    queryKey: ["customers", params],
    queryFn: () => adminService.getAllCustomers(params),
    enabled: isHydrated && (options?.enabled ?? true),
  });
}

export function useCustomerById(id: string) {
  const isHydrated = useIsHydrated();
  return useQuery({
    queryKey: ["customers", id],
    queryFn: () => adminService.getCustomerById(id),
    enabled: isHydrated && Boolean(id),
  });
}

export function useCustomerProfile() {
  const isHydrated = useIsHydrated();
  const userType = useUserType();
  return useQuery({
    queryKey: ["customers", "profile"],
    queryFn: () => customerService.getProfile(),
    // Only fetch when hydrated AND the logged-in user is actually a customer
    enabled: isHydrated && userType === "customer",
  });
}

export function useCustomerOrders(id: string, params?: OrderListParams) {
  const isHydrated = useIsHydrated();
  return useQuery({
    queryKey: ["customers", "orders", id, params],
    queryFn: () => customerService.getOrders(id, params),
    enabled: isHydrated && Boolean(id),
  });
}
