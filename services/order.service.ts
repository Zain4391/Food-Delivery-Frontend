import { apiClient } from "@/lib/axios";
import {
  Order,
  OrderStatus,
  CreateOrderDTO,
  OrderListParams,
} from "@/types/order.types";
import { PaginatedResponse } from "@/types/api.types";

export const orderService = {
  // Admin: get all orders
  getAllOrders: (params?: OrderListParams) =>
    apiClient.get<PaginatedResponse<Order>>("/order/all", { params }),

  // Customer or Admin: get single order by ID
  getOrderById: (id: string) =>
    apiClient.get<Order>(`/order/${id}`),

  // Customer or Admin: get orders for a specific customer
  getOrdersByCustomer: (customerId: string, params?: OrderListParams) =>
    apiClient.get<PaginatedResponse<Order>>(`/order/customer/${customerId}`, { params }),

  // Admin: get orders for a specific restaurant
  getOrdersByRestaurant: (restaurantId: string, params?: OrderListParams) =>
    apiClient.get<PaginatedResponse<Order>>(`/order/restaurant/${restaurantId}`, { params }),

  // Driver or Admin: get orders assigned to a specific driver
  getOrdersByDriver: (driverId: string, params?: OrderListParams) =>
    apiClient.get<PaginatedResponse<Order>>(`/order/driver/${driverId}`, { params }),

  // Customer: create a new order
  createOrder: (data: CreateOrderDTO) =>
    apiClient.post<Order>("/order/create", data),

  // Admin: update order status
  updateOrderStatus: (id: string, status: OrderStatus) =>
    apiClient.patch<Order>(`/order/update-status/${id}`, { status }),

  // Admin: assign a driver to an order
  assignDriver: (orderId: string, driverId: string) =>
    apiClient.patch<Order>(`/order/assign-driver/${orderId}`, { driver_id: driverId }),

  // Customer: cancel an order
  cancelOrder: (id: string) =>
    apiClient.patch<void>(`/order/cancel/${id}`),

  // Admin: delete an order
  deleteOrder: (id: string) =>
    apiClient.delete<void>(`/order/delete/${id}`),
};
