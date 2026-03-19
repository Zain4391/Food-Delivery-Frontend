import { orderService } from "@/services/order.service";
import { OrderListParams } from "@/types/order.types";
import { useQuery } from "@tanstack/react-query";

export function useOrders(params?: OrderListParams) {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () => orderService.getAllOrders(params),
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => orderService.getOrderById(id),
    enabled: Boolean(id),
  });
}

export function useCustomerOrders(
  customerId: string,
  params?: OrderListParams,
) {
  return useQuery({
    queryKey: ["orders", "customer", customerId, params],
    queryFn: () => orderService.getOrdersByCustomer(customerId, params),
    enabled: Boolean(customerId),
  });
}

export function useDriverOrders(driverId: string, params?: OrderListParams) {
  return useQuery({
    queryKey: ["orders", "driver", driverId, params],
    queryFn: () => orderService.getOrdersByDriver(driverId, params),
    enabled: Boolean(driverId),
  });
}

export function useRestaurantOrders(
  restaurantId: string,
  params?: OrderListParams,
) {
  return useQuery({
    queryKey: ["orders", "restaurant", restaurantId, params],
    queryFn: () => orderService.getOrdersByRestaurant(restaurantId, params),
    enabled: Boolean(restaurantId),
  });
}
