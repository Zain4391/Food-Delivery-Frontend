import { restaurantService } from "@/services/restaurant.service";
import { AppException } from "@/types/api.types";
import {
  UploadRestaurantBannerDTO,
  UploadRestaurantLogoDTO,
} from "@/types/restaurant.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

export function useToggleMenuItemAvailability() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => restaurantService.toggleMenuItemAvailability(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
    onError: (error: AppException) => {
      console.error("[useToggleMenuItemAvailability]", error.message);
    },
  });
}

export function useDeleteMenuItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => restaurantService.deleteMenuItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
    onError: (error: AppException) => {
      console.error("[useDeleteMenuItem]", error.message);
    },
  });
}
