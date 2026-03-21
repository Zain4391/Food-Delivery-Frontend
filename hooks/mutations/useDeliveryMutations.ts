import { deliveryService } from "@/services/delivery.service";
import { AppException } from "@/types/api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useMarkPickedUp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (deliveryId: string) => deliveryService.markPickedUp(deliveryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["delivery"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
    },
    onError: (error: AppException) => {
      console.error("[useMarkPickedUp]", error.message);
    },
  });
}

export function useMarkDelivered() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (deliveryId: string) => deliveryService.markDelivered(deliveryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["delivery"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
    },
    onError: (error: AppException) => {
      console.error("[useMarkDelivered]", error.message);
    },
  });
}