import { apiClient } from "@/lib/axios";
import {
  Driver,
  UpdateDriverDTO,
  UpdatePasswordDTO,
  ForgotPasswordDTO,
} from "../types/drivers.type";
import { Order } from "@/types/order.types";
import { PaginatedResponse } from "@/types/api.types";
import { VEHICLE_TYPE } from "@/types/auth.types";

export const driverService = {
  getProfile: () => {
    return apiClient.get<Driver>("/driver/profile");
  },

  updateProfile: (id: string, data: UpdateDriverDTO) => {
    return apiClient.put<Driver>(`/driver/update/${id}`, data);
  },

  updatePassword: (id: string, data: UpdatePasswordDTO) => {
    return apiClient.put<void>(`/driver/update-password/${id}`, data);
  },

  forgotPassword: (data: ForgotPasswordDTO) => {
    return apiClient.post<void>("/driver/forgot-password", data);
  },

  uploadProfileImage: (id: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiClient.post<Driver>(
      `/driver/upload-profile-image/${id}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
  },

  toggleAvailability: (id: string) => {
    return apiClient.patch<Driver>(`/driver/toggle-availability/${id}`);
  },

  changeVehicle: (id: string, vehicle_type: VEHICLE_TYPE) => {
    return apiClient.patch<Driver>(`/driver/change-vehicle/${id}`, {
      vehicle_type,
    });
  },

  getDeliveredOrders: (
    id: string,
    params?: { page?: number; limit?: number },
  ) => {
    return apiClient.get<PaginatedResponse<Order>>(
      `/driver/orders/delivered/${id}`,
      {
        params,
      },
    );
  },

  getPendingOrders: (
    id: string,
    params?: { page?: number; limit?: number },
  ) => {
    return apiClient.get<PaginatedResponse<Order>>(
      `/driver/orders/pending/${id}`,
      {
        params,
      },
    );
  },

  getAllOrders: (id: string, params?: { page?: number; limit?: number }) => {
    return apiClient.get<PaginatedResponse<Order>>(`/driver/orders/all/${id}`, {
      params,
    });
  },
};
