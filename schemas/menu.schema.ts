import { z } from "zod";
import { CATEGORY } from "@/types/restaurant.types";

export const createMenuItemSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name cannot exceed 50 characters"),
  description: z.string().optional(),
  price: z
    .number({ error: "Price must be a number" })
    .positive("Price must be greater than 0")
    .multipleOf(0.01, "Price can have at most 2 decimal places"),
  category: z.enum(CATEGORY, { message: "Invalid category" }),
  preparation_time: z
    .number()
    .int()
    .min(1, "Preparation time must be at least 1 minute")
    .optional(),
});

export type CreateMenuItemFormValues = z.infer<typeof createMenuItemSchema>;
