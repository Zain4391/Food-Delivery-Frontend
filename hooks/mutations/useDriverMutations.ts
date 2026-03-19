import { adminService } from "@/services/admin.service";
import { driverService } from "@/services/driver.service";
import {
  ChangeVehicleDTO,
  UpdateDriverProfileDTO,
  UpdateDriverProfileImgDTO,
  UpdateDriverProfilePasswordDTO,
} from "@/types/driver.types";
import { AppException } from "@/types/api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateDriverProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateDriverProfileDTO) =>
      driverService.updateProfile(payload.id, payload.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
    },
    onError: (error: AppException) => {
      console.error("[useUpdateDriverProfile]", error.message);
    },
  });
}

export function useUpdateDriverProfileImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateDriverProfileImgDTO) =>
      driverService.uploadProfileImage(payload.id, payload.file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
    },
    onError: (error: AppException) => {
      console.error("[useUpdateDriverProfileImage]", error.message);
    },
  });
}

export function useUpdateDriverPassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateDriverProfilePasswordDTO) =>
      driverService.updatePassword(payload.id, payload.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
    },
    onError: (error: AppException) => {
      console.error("[useUpdateDriverPassword]", error.message);
    },
  });
}

export function useToggleAvailability() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => driverService.toggleAvailability(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
    },
    onError: (error: AppException) => {
      console.error("[useToggleAvailability]", error.message);
    },
  });
}

export function useChangeVehicle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ChangeVehicleDTO) =>
      driverService.changeVehicle(payload.id, payload.vehicle_type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
    },
    onError: (error: AppException) => {
      console.error("[useChangeVehicle]", error.message);
    },
  });
}

export function useDeleteDriver() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => adminService.deleteDriver(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
    },
    onError: (error: AppException) => {
      console.error("[useDeleteDriver]", error.message);
    },
  });
}
