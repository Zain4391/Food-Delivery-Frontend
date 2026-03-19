import { apiClient } from "@/lib/axios";
import { Order, OrderStatus, CreateOrderDTO } from "@/types/order.types";
import { PaginatedResponse } from "@/types/api.types";

export interface OrderListParams {
  page?: number;
  limit?: number;
  // fixed: removed 'search' — backend OrderPaginationDTO has no search field
  status?: OrderStatus;
  customer_id?: string;            // fixed: was missing, backend supports this filter
  restaurant_id?: string;          // fixed: was missing, backend supports this filter
  driver_id?: string;              // fixed: was missing, backend supports this filter
  sortBy?: "order_date" | "total_amount" | "status" | "updated_at";  // fixed: constrained to backend valid values
  sortOrder?: "ASC" | "DESC";
}

export const orderService = {
  // ── Read ───────────────────────────────────────────────
  getAllOrders: (params?: OrderListParams) =>
    apiClient.get<PaginatedResponse<Order>>("/order/all", { params }),

  getOrderById: (id: string) =>
    apiClient.get<Order>(`/order/${id}`),

  getOrdersByCustomer: (customerId: string, params?: OrderListParams) =>
    apiClient.get<PaginatedResponse<Order>>(`/order/customer/${customerId}`, { params }),

  getOrdersByRestaurant: (restaurantId: string, params?: OrderListParams) =>
    apiClient.get<PaginatedResponse<Order>>(`/order/restaurant/${restaurantId}`, { params }),

  getOrdersByDriver: (driverId: string, params?: OrderListParams) =>
    apiClient.get<PaginatedResponse<Order>>(`/order/driver/${driverId}`, { params }),

  // ── Write ──────────────────────────────────────────────
  createOrder: (data: CreateOrderDTO) =>
    apiClient.post<Order>("/order/create", data),

  updateOrderStatus: (id: string, status: OrderStatus) =>
    apiClient.patch<Order>(`/order/update-status/${id}`, { status }),

  assignDriver: (orderId: string, driverId: string) =>
    apiClient.patch<Order>(`/order/assign-driver/${orderId}`, { driverId }),

  cancelOrder: (id: string) =>
    apiClient.patch<void>(`/order/cancel/${id}`),

  deleteOrder: (id: string) =>
    apiClient.delete<void>(`/order/delete/${id}`),
};
