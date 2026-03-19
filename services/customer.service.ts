import { apiClient } from "@/lib/axios";
import {
  Customer,
  UpdateCustomerDTO,
  UpdatePasswordDTO,
  ForgotPasswordDTO,
  CustomerListParams,
} from "@/types/customer.types";
import { PaginatedResponse } from "@/types/api.types";
import { Order, OrderListParams } from "@/types/order.types";

export const customerService = {
  getProfile: () => apiClient.get<Customer>("/customer/profile"),

  updateProfile: (id: string, data: UpdateCustomerDTO) =>
    apiClient.put<Customer>(`/customer/update/${id}`, data),

  updatePassword: (id: string, data: UpdatePasswordDTO) =>
    apiClient.put<void>(`/customer/update-password/${id}`, data),

  uploadProfileImage: (id: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiClient.post<Customer>(
      `/customer/upload-profile-image/${id}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
  },

  forgotPassword: (data: ForgotPasswordDTO) =>
    apiClient.post<void>("/customer/forgot-password", data),

  getOrders: (id: string, params?: OrderListParams) =>
    apiClient.get<PaginatedResponse<Order>>(`/customer/admin/orders/${id}`, {
      params,
    }),
};
