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

export interface RestaurantListParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface MenuItemCreateDTO {
  name: string;
  description?: string;
  price: number;
  category: CATEGORY;
  preparation_time: number;
  is_available?: boolean;
}

export type MenuItemUpdateDTO = Partial<MenuItemCreateDTO>;
