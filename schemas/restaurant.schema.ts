import { z } from "zod";

export const createRestaurantSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(150, "Name cannot exceed 150 characters"),
  description: z.string().optional(),
  cusine_type: z
    .string()
    .min(1, "Cuisine type is required")
    .max(50, "Cuisine type cannot exceed 50 characters"),
  address: z.string().min(1, "Address is required"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .max(20, "Phone cannot exceed 20 characters"),
  email: z.email("Invalid email address"),
});

export type CreateRestaurantFormValues = z.infer<typeof createRestaurantSchema>;
