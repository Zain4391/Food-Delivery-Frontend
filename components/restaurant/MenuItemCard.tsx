"use client";

import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { MenuItem, CATEGORY } from "@/types/restaurant.types";
import { useCartStore, useCartItems } from "@/store/cart.store";

interface Props {
  item: MenuItem;
  restaurantId: string;
}

const CATEGORY_LABEL: Record<CATEGORY, string> = {
  [CATEGORY.APPETIZER]: "Appetizer",
  [CATEGORY.MAIN]: "Main",
  [CATEGORY.DESSERT]: "Dessert",
  [CATEGORY.BEVERAGE]: "Beverage",
};

export function MenuItemCard({ item, restaurantId }: Props) {
  const cartItems = useCartItems();
  const { addItem, updateQuantity } = useCartStore();

  const cartEntry = cartItems.find((i) => i.menu_item_id === item.id);
  const qty = cartEntry?.quantity ?? 0;

  const handleAdd = () => {
    addItem({
      menu_item_id: item.id,
      name: item.name,
      price: Number(item.price),
      quantity: 1,
      restaurant_id: restaurantId,
    });
  };

  return (
    <div className="flex gap-3 py-3 border-b last:border-0">
      {/* Image */}
      <div className="relative h-20 w-20 shrink-0 rounded-md overflow-hidden bg-muted">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs">
            No img
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-medium text-sm leading-tight">{item.name}</p>
            {item.description && (
              <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                {item.description}
              </p>
            )}
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs py-0">
                {CATEGORY_LABEL[item.category]}
              </Badge>
              <span className="text-xs text-muted-foreground">
                ~{item.preparation_time} min
              </span>
            </div>
          </div>
          <p className="font-semibold text-sm shrink-0">
            {formatCurrency(Number(item.price))}
          </p>
        </div>

        {/* Add / Qty stepper */}
        <div className="mt-2 flex justify-end">
          {qty === 0 ? (
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs gap-1"
              onClick={handleAdd}
            >
              <Plus className="h-3 w-3" /> Add
            </Button>
          ) : (
            <div className="flex items-center gap-1">
              <Button
                size="icon"
                variant="outline"
                className="h-7 w-7"
                onClick={() => updateQuantity(item.id, qty - 1)}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="text-sm font-medium w-5 text-center">{qty}</span>
              <Button
                size="icon"
                variant="outline"
                className="h-7 w-7"
                onClick={() => updateQuantity(item.id, qty + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
