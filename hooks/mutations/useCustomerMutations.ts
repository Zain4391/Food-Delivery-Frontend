import { customerService } from "@/services/customer.service";
import {
  ForgotPasswordDTO,
  UpdateProfileDTO,
  UpdateProfileImageDTO,
  UpdateProfilePasswordDTO,
} from "@/types/customer.types";
import { AppException } from "@/types/api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfileDTO) =>
      customerService.updateProfile(payload.id, payload.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (error: AppException) => {
      console.error("[useUpdateProfile]", error.message);
    },
  });
}

export function useUpdateProfileImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfileImageDTO) =>
      customerService.uploadProfileImage(payload.id, payload.file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (error: AppException) => {
      console.error("[useUpdateProfileImage]", error.message);
    },
  });
}

export function useUpdatePassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePasswordDTO) =>
      customerService.updatePassword(payload.id, payload.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (error: AppException) => {
      console.error("[useUpdatePassword]", error.message);
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (payload: ForgotPasswordDTO) =>
      customerService.forgotPassword(payload),
    onError: (error: AppException) => {
      console.error("[useForgotPassword]", error.message);
    },
  });
}
