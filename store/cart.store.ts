import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { cartItem, CartState } from "./interfaces/cart.state.interface";

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      restaurantId: null,

      addItem: (item: cartItem) => {
        const { items, restaurantId } = get();

        if (restaurantId && restaurantId !== item.restaurant_id) {
          set({
            items: [{ ...item, quantity: 1 }],
            restaurantId: item.restaurant_id,
          });
          return;
        }

        const existing = items.find(
          (i) => i.menu_item_id === item.menu_item_id,
        );
        if (existing) {
          set({
            items: items.map((i) =>
              i.menu_item_id === item.menu_item_id
                ? { ...i, quantity: i.quantity + 1 }
                : i,
            ),
          });
          return;
        }

        set({
          items: [...items, { ...item, quantity: 1 }],
          restaurantId: item.restaurant_id,
        });
      },

      removeItem: (menu_item_id: string) => {
        const items = get().items.filter(
          (i) => i.menu_item_id !== menu_item_id,
        );
        set({
          items,
          restaurantId: items.length === 0 ? null : get().restaurantId,
        });
      },

      updateQuantity: (menu_item_id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(menu_item_id);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.menu_item_id === menu_item_id ? { ...i, quantity } : i,
          ),
        });
      },

      clearCart: () => set({ items: [], restaurantId: null }),

      getTotalItems: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),

      getTotalAmount: () =>
        get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    {
      name: "food-delivery-cart",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const useCartItems = () => useCartStore((state) => state.items);
export const useCartRestaurantId = () =>
  useCartStore((state) => state.restaurantId);
export const useCartTotal = () =>
  useCartStore((state) => state.getTotalAmount());
export const useCartItemCount = () =>
  useCartStore((state) => state.getTotalItems());
