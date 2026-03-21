import { restaurantService } from "../../services/restaurant.service";
import { RestaurantListParams } from "@/types/restaurant.types";
import { useIsHydrated } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";

export function useRestaurants(params?: RestaurantListParams) {
  const isHydrated = useIsHydrated();
  return useQuery({
    queryKey: ["restaurants", params],
    queryFn: () => restaurantService.getAllRestaurants(params),
    enabled: isHydrated,
  });
}

export function useRestaurant(id: string) {
  const isHydrated = useIsHydrated();
  return useQuery({
    queryKey: ["restaurants", id],
    queryFn: () => restaurantService.getRestaurantById(id),
    enabled: isHydrated && Boolean(id),
  });
}
