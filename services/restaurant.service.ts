import { apiClient } from "@/lib/axios";
import { Restaurant, MenuItem, RestaurantListParams, CATEGORY } from "@/types/restaurant.types";
import { PaginatedResponse } from "@/types/api.types";

export interface MenuItemCreateDTO {
  name: string;
  description?: string;
  price: number;
  category: CATEGORY;
  preparation_time?: number;       // optional — backend has @IsOptional()
  is_available?: boolean;
}

export interface MenuItemUpdateDTO {
  name?: string;
  description?: string;
  price?: number;
  category?: CATEGORY;
  preparation_time?: number;
}

export const restaurantService = {
  // ── Restaurants ────────────────────────────────────────
  getAllRestaurants: (params?: RestaurantListParams) =>
    apiClient.get<PaginatedResponse<Restaurant>>("/restaurant/all", { params }),

  getRestaurantById: (id: string) =>
    apiClient.get<Restaurant>(`/restaurant/${id}`),

  toggleActive: (id: string) =>
    apiClient.patch<Restaurant>(`/restaurant/toggle-active/${id}`),

  deleteRestaurant: (id: string) =>
    apiClient.delete<void>(`/restaurant/delete/${id}`),

  uploadLogo: (id: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiClient.post<Restaurant>(`/restaurant/upload-logo/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  uploadBanner: (id: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiClient.post<Restaurant>(`/restaurant/upload-banner/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // ── Menu Items ─────────────────────────────────────────
  getMenuItems: (restaurantId: string) =>
    apiClient.get<MenuItem[]>(`/restaurant/${restaurantId}/menu/all`),

  getAvailableMenuItems: (restaurantId: string) =>
    apiClient.get<MenuItem[]>(`/restaurant/${restaurantId}/menu/available`),

  getMenuItemById: (id: string) =>
    apiClient.get<MenuItem>(`/restaurant/menu/item/${id}`),

  toggleMenuItemAvailability: (id: string) =>
    apiClient.patch<MenuItem>(`/restaurant/menu/toggle-availability/${id}`),

  deleteMenuItem: (id: string) =>
    apiClient.delete<void>(`/restaurant/menu/delete/${id}`),
};
