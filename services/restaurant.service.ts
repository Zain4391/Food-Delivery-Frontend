import { apiClient } from "@/lib/axios";
import {
  Restaurant,
  MenuItem,
  RestaurantListParams,
} from "@/types/restaurant.types";
import { PaginatedResponse } from "@/types/api.types";

export const restaurantService = {
  getAllRestaurants: (params?: RestaurantListParams) => {
    return apiClient.get<PaginatedResponse<Restaurant>>("/restaurant/all", {
      params,
    });
  },

  getRestaurantById: (id: string) => {
    return apiClient.get<Restaurant>(`/restaurant/${id}`);
  },

  toggleActive: (id: string) => {
    return apiClient.patch<Restaurant>(`/restaurant/toggle-active/${id}`);
  },

  deleteRestaurant: (id: string) => {
    return apiClient.delete<void>(`/restaurant/delete/${id}`);
  },

  uploadLogo: (id: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiClient.post<Restaurant>(
      `/restaurant/upload-logo/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
  },

  uploadBanner: (id: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiClient.post<Restaurant>(
      `/restaurant/upload-banner/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
  },

  getMenuItems: (restaurantId: string) => {
    return apiClient.get<MenuItem[]>(`/restaurant/${restaurantId}/menu/all`);
  },

  getAvailableMenuItems: (restaurantId: string) => {
    return apiClient.get<MenuItem[]>(
      `/restaurant/${restaurantId}/menu/available`,
    );
  },

  getMenuItemById: (id: string) => {
    return apiClient.get<MenuItem>(`/restaurant/menu/item/${id}`);
  },

  toggleMenuItemAvailability: (id: string) => {
    return apiClient.patch<MenuItem>(
      `/restaurant/menu/toggle-availability/${id}`,
    );
  },

  deleteMenuItem: (id: string) => {
    return apiClient.delete<void>(`/restaurant/menu/delete/${id}`);
  },
};
