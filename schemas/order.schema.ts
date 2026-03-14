import { z } from "zod";

export const orderItemSchema = z.object({
  menu_item_id: z.uuid("Invalid menu item ID"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
});

export const createOrderSchema = z.object({
  customer_id: z.uuid("Invalid customer ID"),
  restaurant_id: z.uuid("Invalid restaurant ID"),
  delivery_address: z.string().min(1, "Delivery address is required"),
  special_instructions: z.string().optional(),
  items: z.array(orderItemSchema).min(1, "Order must have at least one item"),
});

export type OrderItemFormValues = z.infer<typeof orderItemSchema>;
export type CreateOrderFormValues = z.infer<typeof createOrderSchema>;
