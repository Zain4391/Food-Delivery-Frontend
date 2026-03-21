import { apiClient } from "@/lib/axios";
import { Delivery } from "@/types/delivery.types";

export const deliveryService = {
  // Driver: get delivery record by order ID
  getByOrderId: (orderId: string) =>
    apiClient.get<Delivery>(`/delivery/order/${orderId}`),

  // Driver: mark the delivery as picked up
  markPickedUp: (deliveryId: string) =>
    apiClient.patch<Delivery>(`/delivery/mark-picked-up/${deliveryId}`),

  // Driver: mark the delivery as delivered
  markDelivered: (deliveryId: string) =>
    apiClient.patch<Delivery>(`/delivery/mark-delivered/${deliveryId}`),
};
