import { ROLES, VEHICLE_TYPE } from "@/types/auth.types";
import { z } from "zod";

/* LOGIN SCHEMAS */
export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

/* REGISTRATION SCHEMAS */
export const registerCustomerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email type"),
    password: z.string().min(8, "Password must be of min length 8"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    address: z.string().min(1, "Address is required"),
    role: z.enum(ROLES).optional(),
    profile_image_url: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const registerDriverSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    phone: z
      .string()
      .min(11, "Phone number must be 11 digits")
      .max(11, "Phone number must be 11 digits"),
    vehicle_type: z.enum(VEHICLE_TYPE, {
      message: "Invalid vehicle type",
    }),
    profile_image_url: z.string().url().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/* Export Types for FORMS */
export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterCustomerFormValues = z.infer<typeof registerCustomerSchema>;
export type registerDriverSchema = z.infer<typeof registerDriverSchema>;
