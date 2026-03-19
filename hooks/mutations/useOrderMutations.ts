import { orderService } from "@/services/order.service";
import {
  AssignDriverDTO,
  CreateOrderDTO,
  UpdateOrderStatusDTO,
} from "@/types/order.types";
import { AppException } from "@/types/api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateOrderDTO) => orderService.createOrder(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error: AppException) => {
      console.error("[useCreateOrder]", error.message);
    },
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateOrderStatusDTO) =>
      orderService.updateOrderStatus(payload.id, payload.status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error: AppException) => {
      console.error("[useUpdateOrderStatus]", error.message);
    },
  });
}

export function useAssignDriver() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AssignDriverDTO) =>
      orderService.assignDriver(payload.orderId, payload.driverId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error: AppException) => {
      console.error("[useAssignDriver]", error.message);
    },
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => orderService.cancelOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error: AppException) => {
      console.error("[useCancelOrder]", error.message);
    },
  });
}

export function useDeleteOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => orderService.deleteOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error: AppException) => {
      console.error("[useDeleteOrder]", error.message);
    },
  });
}
