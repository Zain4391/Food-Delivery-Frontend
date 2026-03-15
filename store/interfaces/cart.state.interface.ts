export interface cartItem {
  menu_item_id: string;
  name: string;
  quantity: number;
  price: number;
  restaurant_id: string | null;
}

export interface CartState {
  items: cartItem[];
  restaurantId: string | null; // can order from one restaurant

  addItem: (item: cartItem) => void;
  removeItem: (menu_item_id: string) => void;
  updateQuantity: (menu_item_id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalAmount: () => number;
}
