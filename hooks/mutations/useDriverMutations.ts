import { adminService } from "@/services/admin.service";
import { driverService } from "@/services/driver.service";
import {
  UpdateProfileImageDTO,
  UpdateProfilePasswordDTO,
} from "@/types/customer.types";
import { ChangeVehicleDTO, UpdateDriverProfileDTO } from "@/types/driver.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateDriverProfileDTO) =>
      driverService.updateProfile(payload.id, payload.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
    },
  });
}

export function useProfileImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfileImageDTO) =>
      driverService.uploadProfileImage(payload.id, payload.file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
    },
  });
}

export function useUpdatePassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePasswordDTO) =>
      driverService.updatePassword(payload.id, payload.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
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
  });
}

export function useDeleteDriver() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.deleteDriver(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
    },
  });
}
