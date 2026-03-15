import { z } from "zod";
import { VEHICLE_TYPE } from "@/types/auth.types";

export const updateDriverSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.email("Invalid email address").optional(),
  phone: z
    .string()
    .min(11, "Phone must be 11 digits")
    .max(11, "Phone must be 11 digits")
    .optional(),
  vehicle_type: z
    .enum(VEHICLE_TYPE, { message: "Invalid vehicle type" })
    .optional(),
});

export const updateDriverPasswordSchema = z
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

export const driverForgotPasswordSchema = z
  .object({
    email: z.email("Invalid email address"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmNewPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export type UpdateDriverFormValues = z.infer<typeof updateDriverSchema>;
export type UpdateDriverPasswordFormValues = z.infer<
  typeof updateDriverPasswordSchema
>;
export type DriverForgotPasswordFormValues = z.infer<
  typeof driverForgotPasswordSchema
>;
