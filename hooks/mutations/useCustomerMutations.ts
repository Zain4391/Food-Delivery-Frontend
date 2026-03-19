import { customerService } from "@/services/customer.service";
import {
  ForgotPasswordDTO,
  UpdateProfileDTO,
  UpdateProfileImageDTO,
  UpdateProfilePasswordDTO,
} from "@/types/customer.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfileDTO) =>
      customerService.updateProfile(payload.id, payload.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
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
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (payload: ForgotPasswordDTO) =>
      customerService.forgotPassword(payload),
    onSuccess: () => {},
  });
}
