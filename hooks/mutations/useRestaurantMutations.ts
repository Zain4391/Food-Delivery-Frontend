import { restaurantService, CreateRestaurantDTO, UpdateRestaurantDTO } from "@/services/restaurant.service";
import { AppException } from "@/types/api.types";
import {
  UploadRestaurantBannerDTO,
  UploadRestaurantLogoDTO,
  MenuItemCreateDTO,
  MenuItemUpdateDTO,
} from "@/types/restaurant.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateRestaurant() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateRestaurantDTO) =>
      restaurantService.createRestaurant(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
    onError: (error: AppException) => {
      console.error("[useCreateRestaurant]", error.message);
    },
  });
}

export function useUpdateRestaurant() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateRestaurantDTO }) =>
      restaurantService.updateRestaurant(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
    onError: (error: AppException) => {
      console.error("[useUpdateRestaurant]", error.message);
    },
  });
}

export function useToggleRestaurantActive() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => restaurantService.toggleActive(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
    onError: (error: AppException) => {
      console.error("[useToggleRestaurantActive]", error.message);
    },
  });
}

export function useDeleteRestaurant() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => restaurantService.deleteRestaurant(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
    onError: (error: AppException) => {
      console.error("[useDeleteRestaurant]", error.message);
    },
  });
}

export function useMarkOrderReady() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (orderId: string) => restaurantService.markOrderReady(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error: AppException) => {
      console.error("[useMarkOrderReady]", error.message);
    },
  });
}

export function useUploadRestaurantLogo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UploadRestaurantLogoDTO) =>
      restaurantService.uploadLogo(payload.id, payload.file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
    onError: (error: AppException) => {
      console.error("[useUploadRestaurantLogo]", error.message);
    },
  });
}

export function useUploadRestaurantBanner() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UploadRestaurantBannerDTO) =>
      restaurantService.uploadBanner(payload.id, payload.file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
    onError: (error: AppException) => {
      console.error("[useUploadRestaurantBanner]", error.message);
    },
  });
}

export function useCreateMenuItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ restaurantId, data }: { restaurantId: string; data: MenuItemCreateDTO }) =>
      restaurantService.createMenuItem(restaurantId, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["menuItems", variables.restaurantId] });
    },
    onError: (error: AppException) => {
      console.error("[useCreateMenuItem]", error.message);
    },
  });
}

export function useUpdateMenuItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data, restaurantId }: { id: string; data: MenuItemUpdateDTO; restaurantId: string }) =>
      restaurantService.updateMenuItem(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["menuItems", variables.restaurantId] });
    },
    onError: (error: AppException) => {
      console.error("[useUpdateMenuItem]", error.message);
    },
  });
}

export function useUploadMenuItemImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, file, restaurantId }: { id: string; file: File; restaurantId: string }) =>
      restaurantService.uploadMenuItemImage(id, file),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["menuItems", variables.restaurantId] });
    },
    onError: (error: AppException) => {
      console.error("[useUploadMenuItemImage]", error.message);
    },
  });
}

export function useToggleMenuItemAvailability() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, restaurantId }: { id: string; restaurantId: string }) =>
      restaurantService.toggleMenuItemAvailability(id),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["menuItems", variables.restaurantId] });
    },
    onError: (error: AppException) => {
      console.error("[useToggleMenuItemAvailability]", error.message);
    },
  });
}

export function useDeleteMenuItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, restaurantId }: { id: string; restaurantId: string }) =>
      restaurantService.deleteMenuItem(id),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["menuItems", variables.restaurantId] });
    },
    onError: (error: AppException) => {
      console.error("[useDeleteMenuItem]", error.message);
    },
  });
}
