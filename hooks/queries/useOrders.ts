import { orderService } from "@/services/order.service";
import { OrderListParams, OrderStatus } from "@/types/order.types";
import { useIsHydrated } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";

const ACTIVE_STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "preparing",
  "ready",
  "picked_up",
];

export function useOrders(params?: OrderListParams) {
  const isHydrated = useIsHydrated();
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () => orderService.getAllOrders(params),
    enabled: isHydrated,
  });
}

export function useOrder(id: string) {
  const isHydrated = useIsHydrated();
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => orderService.getOrderById(id),
    enabled: isHydrated && Boolean(id),
  });
}

export function useCustomerOrders(
  customerId: string,
  params?: OrderListParams,
) {
  const isHydrated = useIsHydrated();
  return useQuery({
    queryKey: ["orders", "customer", customerId, params],
    queryFn: () => orderService.getOrdersByCustomer(customerId, params),
    enabled: isHydrated && Boolean(customerId),
    // Poll every 8 seconds when there may be active orders in flight.
    // The select function checks the result and stops polling once all
    // orders are in a terminal state (delivered / cancelled).
    refetchInterval: (query) => {
      const items = (query.state.data as any)?.items ?? [];
      const hasActive = items.some((o: { status: OrderStatus }) =>
        ACTIVE_STATUSES.includes(o.status),
      );
      return hasActive ? 8000 : false;
    },
  });
}

export function useDriverOrders(driverId: string, params?: OrderListParams) {
  const isHydrated = useIsHydrated();
  return useQuery({
    queryKey: ["orders", "driver", driverId, params],
    queryFn: () => orderService.getOrdersByDriver(driverId, params),
    enabled: isHydrated && Boolean(driverId),
  });
}

export function useRestaurantOrders(
  restaurantId: string,
  params?: OrderListParams,
) {
  const isHydrated = useIsHydrated();
  return useQuery({
    queryKey: ["orders", "restaurant", restaurantId, params],
    queryFn: () => orderService.getOrdersByRestaurant(restaurantId, params),
    enabled: isHydrated && Boolean(restaurantId),
  });
}
