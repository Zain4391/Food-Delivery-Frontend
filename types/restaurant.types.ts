export enum CATEGORY {
  APPETIZER = "appetizer",
  MAIN = "main",
  DESSERT = "dessert",
  BEVERAGE = "beverage",
}

export interface Restaurant {
  id: string;
  name: string;
  description?: string;
  cusine_type: string;
  address: string;
  phone: string;
  email: string;
  logo_url?: string;
  banner_url?: string;
  rating: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: CATEGORY;
  image_url?: string;
  is_available: boolean;
  preparation_time: number;
  restaurant_id: string;
  created_at: string;
  updated_at: string;
}

// fixed: extended with all fields backend RestaurantPaginationDTO supports
export interface RestaurantListParams {
  page?: number;
  limit?: number;
  search?: string;
  cusine_type?: string;            // fixed: was missing
  minRating?: number;             // fixed: was missing
  is_active?: boolean;            // fixed: was missing
  sortBy?: "name" | "rating" | "cusine_type" | "created_at";  // fixed: was missing
  sortOrder?: "ASC" | "DESC";     // fixed: was missing
}
