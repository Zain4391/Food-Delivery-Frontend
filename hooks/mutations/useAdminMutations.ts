import { adminService } from "@/services/admin.service";
import {
  UpdateProfileDTO,
  UpdateProfileImageDTO,
  UpdateProfilePasswordDTO,
} from "@/types/customer.types";
import { AppException } from "@/types/api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateAdminProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateProfileDTO) =>
      adminService.updateProfile(payload.id, payload.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
    onError: (error: AppException) => {
      console.error("[useUpdateAdminProfile]", error.message);
    },
  });
}

export function useUpdateAdminPassword() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateProfilePasswordDTO) =>
      adminService.updatePassword(payload.id, payload.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
    onError: (error: AppException) => {
      console.error("[useUpdateAdminPassword]", error.message);
    },
  });
}

export function useUploadAdminProfileImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateProfileImageDTO) =>
      adminService.uploadProfileImage(payload.id, payload.file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
    onError: (error: AppException) => {
      console.error("[useUploadAdminProfileImage]", error.message);
    },
  });
}

export function useDeleteCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.deleteCustomer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (error: AppException) => {
      console.error("[useDeleteCustomer]", error.message);
    },
  });
}
