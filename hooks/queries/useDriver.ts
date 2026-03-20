import { adminService } from "@/services/admin.service";
import { driverService } from "@/services/driver.service";
import {
  DeliveredOrdersDTO,
  DriverListParams,
  PendingOrdersDTO,
} from "@/types/driver.types";
import { OrderListParams } from "@/types/order.types";
import { useIsHydrated } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";

export function useDrivers(
  params?: DriverListParams,
  options?: { enabled?: boolean },
) {
  const isHydrated = useIsHydrated();
  return useQuery({
    queryKey: ["drivers", params],
    queryFn: () => adminService.getAllDrivers(params),
    enabled: isHydrated && (options?.enabled ?? true),
  });
}

export function useDriver(id: string) {
  const isHydrated = useIsHydrated();
  return useQuery({
    queryKey: ["drivers", id],
    queryFn: () => adminService.getDriverById(id),
    enabled: isHydrated && Boolean(id),
  });
}

export function useDriverProfile() {
  const isHydrated = useIsHydrated();
  return useQuery({
    queryKey: ["drivers", "profile"],
    queryFn: () => driverService.getProfile(),
    enabled: isHydrated,
  });
}

export function useDeliveredOrders(payload: DeliveredOrdersDTO) {
  const isHydrated = useIsHydrated();
  return useQuery({
    queryKey: ["drivers", payload.id, "orders", "delivered", { page: payload.page, limit: payload.limit }],
    queryFn: () =>
      driverService.getDeliveredOrders(payload.id, {
        page: payload.page,
        limit: payload.limit,
      }),
    enabled: isHydrated && Boolean(payload.id),
  });
}

export function usePendingOrders(payload: PendingOrdersDTO) {
  const isHydrated = useIsHydrated();
  return useQuery({
    queryKey: ["drivers", payload.id, "orders", "pending", { page: payload.page, limit: payload.limit }],
    queryFn: () =>
      driverService.getPendingOrders(payload.id, {
        page: payload.page,
        limit: payload.limit,
      }),
    enabled: isHydrated && Boolean(payload.id),
  });
}

export function useDriverAllOrders(id: string, params?: OrderListParams) {
  const isHydrated = useIsHydrated();
  return useQuery({
    queryKey: ["drivers", id, "orders", params],
    queryFn: () => driverService.getAllOrders(id, params),
    enabled: isHydrated && Boolean(id),
  });
}
