import { adminService } from "@/services/admin.service";
import { driverService } from "@/services/driver.service";
import {
  DeliveredOrdersDTO,
  DriverListParams,
  PendingOrdersDTO,
} from "@/types/driver.types";
import { OrderListParams } from "@/types/order.types";
import { useQuery } from "@tanstack/react-query";

export function useDrivers(
  params?: DriverListParams,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: ["drivers", params],
    queryFn: () => adminService.getAllDrivers(params),
    enabled: options?.enabled ?? true,
  });
}

export function useDriver(id: string) {
  return useQuery({
    queryKey: ["drivers", id],
    queryFn: () => adminService.getDriverById(id),
    enabled: Boolean(id),
  });
}

export function useDriverProfile() {
  return useQuery({
    queryKey: ["drivers", "profile"],
    queryFn: () => driverService.getProfile(),
  });
}

export function useDeliveredOrders(payload: DeliveredOrdersDTO) {
  return useQuery({
    queryKey: ["drivers", payload.id, "orders", "delivered", { page: payload.page, limit: payload.limit }],
    queryFn: () =>
      driverService.getDeliveredOrders(payload.id, {
        page: payload.page,
        limit: payload.limit,
      }),
    enabled: Boolean(payload.id),
  });
}

export function usePendingOrders(payload: PendingOrdersDTO) {
  return useQuery({
    queryKey: ["drivers", payload.id, "orders", "pending", { page: payload.page, limit: payload.limit }],
    queryFn: () =>
      driverService.getPendingOrders(payload.id, {
        page: payload.page,
        limit: payload.limit,
      }),
    enabled: Boolean(payload.id),
  });
}

export function useDriverAllOrders(id: string, params?: OrderListParams) {
  return useQuery({
    queryKey: ["drivers", id, "orders", params],
    queryFn: () => driverService.getAllOrders(id, params),
    enabled: Boolean(id),
  });
}
