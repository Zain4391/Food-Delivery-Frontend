export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "picked_up"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  id: string;
  menu_item_id: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  created_at: string;
}

export interface Order {
  id: string;
  status: OrderStatus;
  total_amount: number;
  delivery_address: string;
  special_instructions?: string;
  estimated_delivery_time?: string;
  customer_id: string;
  restaurant_id: string;
  driver_id?: string;
  orderItems: OrderItem[];
  order_date: string;
  updated_at: string;
}

export interface CreateOrderDTO {
  customer_id: string;
  restaurant_id: string;
  delivery_address: string;
  special_instructions?: string;
  items: { menu_item_id: string; quantity: number }[];
}

export interface OrderListParams {
  page?: number;
  limit?: number;
  status?: OrderStatus;
  customer_id?: string;
  restaurant_id?: string;
  driver_id?: string;
  sortBy?: "order_date" | "total_amount" | "status" | "updated_at";
  sortOrder?: "ASC" | "DESC";
}

export interface UpdateOrderStatusDTO {
  id: string;
  status: OrderStatus;
}

export interface AssignDriverDTO {
  orderId: string;
  driverId: string;
}
