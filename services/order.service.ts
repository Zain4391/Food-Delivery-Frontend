import { apiClient } from "@/lib/axios.server";
import { PaginatedResponse } from "@/types/api.types";
import {
  CreateOrderDTO,
  Order,
  OrderListParams,
  OrderStatus,
} from "@/types/order.types";

export const orderService = {
  getAllOrders: (params?: OrderListParams) => {
    return apiClient.get<PaginatedResponse<Order>>("/order/all", { params });
  },
  getOrderById: (id: string) => {
    return apiClient.get<Order>(`/order/${id}`);
  },

  getOrdersByCustomer: (customerId: string, params?: OrderListParams) => {
    return apiClient.get<PaginatedResponse<Order>>(
      `/order/customer/${customerId}`,
      {
        params,
      },
    );
  },

  getOrdersByRestaurant: (restaurantId: string, params?: OrderListParams) => {
    return apiClient.get<PaginatedResponse<Order>>(
      `/order/restaurant/${restaurantId}`,
      { params },
    );
  },

  getOrdersByDriver: (driverId: string, params?: OrderListParams) => {
    return apiClient.get<PaginatedResponse<Order>>(
      `/order/driver/${driverId}`,
      {
        params,
      },
    );
  },
  createOrder: (data: CreateOrderDTO) => {
    return apiClient.post<Order>("/order/create", data);
  },

  updateOrderStatus: (id: string, status: OrderStatus) => {
    return apiClient.patch<Order>(`/order/update-status/${id}`, { status });
  },

  assignDriver: (orderId: string, driverId: string) => {
    return apiClient.patch<Order>(`/order/assign-driver/${orderId}`, {
      driverId,
    });
  },

  cancelOrder: (id: string) => {
    return apiClient.patch<void>(`/order/cancel/${id}`);
  },

  deleteOrder: (id: string) => {
    return apiClient.delete<void>(`/order/delete/${id}`);
  },
};
