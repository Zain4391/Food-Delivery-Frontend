import { z } from "zod";

export const updateCustomerSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.email("Invalid email address").optional(),
  address: z.string().min(1, "Address is required").optional(),
});

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters"),
    confirmNewPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export const forgotPasswordSchema = z
  .object({
    email: z.email("Invalid email address"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmNewPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export type UpdateCustomerFormValues = z.infer<typeof updateCustomerSchema>;
export type UpdatePasswordFormValues = z.infer<typeof updatePasswordSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
