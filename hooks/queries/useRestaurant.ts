import { restaurantService } from "@/services/restaurant.service";
import { RestaurantListParams } from "@/types/restaurant.types";
import { useQuery } from "@tanstack/react-query";

export function useRestaurants(params?: RestaurantListParams) {
  return useQuery({
    queryKey: ["restaurants", params],
    queryFn: () => restaurantService.getAllRestaurants(params),
  });
}

export function useRestaurant(id: string) {
  return useQuery({
    queryKey: ["restaurants", id],
    queryFn: () => restaurantService.getRestaurantById(id),
    enabled: Boolean(id),
  });
}

export function useMenuItems(restaurantId: string) {
  return useQuery({
    queryKey: ["restaurants", restaurantId, "menu"],
    queryFn: () => restaurantService.getMenuItems(restaurantId),
    enabled: Boolean(restaurantId),
  });
}

export function useAvailableMenuItems(restaurantId: string) {
  return useQuery({
    queryKey: ["restaurants", restaurantId, "menu", "available"],
    queryFn: () => restaurantService.getAvailableMenuItems(restaurantId),
    enabled: Boolean(restaurantId),
  });
}

export function useMenuItem(id: string) {
  return useQuery({
    queryKey: ["menu-items", id],
    queryFn: () => restaurantService.getMenuItemById(id),
    enabled: Boolean(id),
  });
}
