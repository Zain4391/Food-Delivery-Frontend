import { apiClient } from "@/lib/axios";
import {
  Order,
  OrderStatus,
  CreateOrderDTO,
  OrderListParams,
} from "@/types/order.types";
import { PaginatedResponse } from "@/types/api.types";

export const orderService = {
  getAllOrders: (params?: OrderListParams) =>
    apiClient.get<PaginatedResponse<Order>>("/order/all", { params }),

  getOrderById: (id: string) =>
    apiClient.get<Order>(`/order/admin/${id}`),

  getOrdersByCustomer: (customerId: string, params?: OrderListParams) =>
    apiClient.get<PaginatedResponse<Order>>(`/order/admin/customer/${customerId}`, { params }),

  getOrdersByRestaurant: (restaurantId: string, params?: OrderListParams) =>
    apiClient.get<PaginatedResponse<Order>>(`/order/restaurant/${restaurantId}`, { params }),

  getOrdersByDriver: (driverId: string, params?: OrderListParams) =>
    apiClient.get<PaginatedResponse<Order>>(`/order/admin/driver/${driverId}`, { params }),

  createOrder: (data: CreateOrderDTO) =>
    apiClient.post<Order>("/order/create", data),

  updateOrderStatus: (id: string, status: OrderStatus) =>
    apiClient.patch<Order>(`/order/update-status/${id}`, { status }),

  assignDriver: (orderId: string, driverId: string) =>
    apiClient.patch<Order>(`/order/assign-driver/${orderId}`, { driver_id: driverId }),

  cancelOrder: (id: string) =>
    apiClient.patch<void>(`/order/cancel/${id}`),

  deleteOrder: (id: string) =>
    apiClient.delete<void>(`/order/delete/${id}`),
};
