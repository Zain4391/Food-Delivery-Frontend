import { apiClient } from "@/lib/axios";
import {
  Restaurant,
  MenuItem,
  RestaurantListParams,
  MenuItemCreateDTO,
  MenuItemUpdateDTO,
} from "@/types/restaurant.types";
import { PaginatedResponse } from "@/types/api.types";

export interface CreateRestaurantDTO {
  name: string;
  description?: string;
  cusine_type: string;
  address: string;
  phone: string;
  email: string;
}

export interface UpdateRestaurantDTO extends Partial<CreateRestaurantDTO> {}

export const restaurantService = {
  getAllRestaurants: (params?: RestaurantListParams) =>
    apiClient.get<PaginatedResponse<Restaurant>>("/restaurant/all", { params }),

  getRestaurantById: (id: string) =>
    apiClient.get<Restaurant>(`/restaurant/${id}`),

  createRestaurant: (data: CreateRestaurantDTO) =>
    apiClient.post<Restaurant>("/restaurant/create", data),

  updateRestaurant: (id: string, data: UpdateRestaurantDTO) =>
    apiClient.put<Restaurant>(`/restaurant/update/${id}`, data),

  toggleActive: (id: string) =>
    apiClient.patch<Restaurant>(`/restaurant/toggle-active/${id}`),

  deleteRestaurant: (id: string) =>
    apiClient.delete<void>(`/restaurant/delete/${id}`),

  // Triggers order.ready event → RabbitMQ → DeliveryService auto-assigns a driver
  markOrderReady: (orderId: string) =>
    apiClient.patch<void>(`/restaurant/mark-ready/${orderId}`),

  uploadLogo: (id: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiClient.post<Restaurant>(
      `/restaurant/upload-logo/${id}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
  },

  uploadBanner: (id: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiClient.post<Restaurant>(
      `/restaurant/upload-banner/${id}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
  },

  // ── Menu Items ───────────────────────────────────────────────────────
  getMenuItems: (restaurantId: string) =>
    apiClient.get<MenuItem[]>(`/restaurant/${restaurantId}/menu/all`),

  getAvailableMenuItems: (restaurantId: string) =>
    apiClient.get<MenuItem[]>(`/restaurant/${restaurantId}/menu/available`),

  getMenuItemById: (id: string) =>
    apiClient.get<MenuItem>(`/restaurant/menu/item/${id}`),

  createMenuItem: (restaurantId: string, data: MenuItemCreateDTO) =>
    apiClient.post<MenuItem>(`/restaurant/${restaurantId}/menu/create`, data),

  updateMenuItem: (id: string, data: MenuItemUpdateDTO) =>
    apiClient.put<MenuItem>(`/restaurant/menu/update/${id}`, data),

  uploadMenuItemImage: (id: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiClient.post<MenuItem>(
      `/restaurant/menu/upload-image/${id}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
  },

  toggleMenuItemAvailability: (id: string) =>
    apiClient.patch<MenuItem>(`/restaurant/menu/toggle-availability/${id}`),

  deleteMenuItem: (id: string) =>
    apiClient.delete<void>(`/restaurant/menu/delete/${id}`),
};
