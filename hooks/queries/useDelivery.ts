import { deliveryService } from "@/services/delivery.service";
import { useIsHydrated } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";

export function useDeliveryByOrderId(orderId: string) {
  const isHydrated = useIsHydrated();
  return useQuery({
    queryKey: ["delivery", "order", orderId],
    queryFn: () => deliveryService.getByOrderId(orderId),
    enabled: isHydrated && Boolean(orderId),
    // Retry once — delivery record may not exist yet if RabbitMQ
    // hasn't finished creating it by the time the driver page loads
    retry: 2,
    retryDelay: 2000,
  });
}
