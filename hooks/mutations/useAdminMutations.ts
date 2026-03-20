import { adminService } from "@/services/admin.service";
import { UpdateProfileDTO, UpdateProfilePasswordDTO } from "@/types/customer.types";
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
