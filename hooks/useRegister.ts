import {
  RegisterAdminFormValues,
  RegisterCustomerFormValues,
  RegisterDriverFormValues,
} from "@/schemas/auth.schema";
import { authService } from "@/services/auth.service";
import { ROLES } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useRegisterCustomer() {
  const router = useRouter();

  return useMutation({
    mutationFn: (values: RegisterCustomerFormValues) => {
      const { confirmPassword, ...payload } = values;
      return authService.registerCustomer(payload);
    },
    onSuccess: () => {
      router.push("/login?registered=customer");
    },
  });
}

export function useRegisterAdmin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (values: RegisterAdminFormValues) => {
      const { confirmPassword, ...payload } = values;
      payload.role = ROLES.ADMIN;
      return authService.registerAdmin(payload);
    },
    onSuccess: () => {
      router.push("/login?registered=admin");
    },
  });
}

export function useRegisterDriver() {
  const router = useRouter();

  return useMutation({
    mutationFn: (values: RegisterDriverFormValues) => {
      const { confirmPassword, ...payload } = values;
      return authService.registerDriver(payload);
    },
    onSuccess: () => {
      router.push("/login?registered=driver");
    },
  });
}
