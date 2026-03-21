import { z } from "zod";

export const checkoutSchema = z.object({
  delivery_address: z
    .string()
    .min(10, "Please enter a full delivery address (min 10 chars)"),
  special_instructions: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
