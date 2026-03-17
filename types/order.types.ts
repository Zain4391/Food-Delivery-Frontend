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

export interface OrderPaginationDTO {
  page?: number;
  limit?: number;
}

export interface OrderListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: OrderStatus;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}
