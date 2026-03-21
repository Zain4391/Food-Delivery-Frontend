"use client";

import { ShoppingCart, Trash2, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  useCartStore,
  useCartItems,
  useCartTotal,
  useCartItemCount,
} from "@/store/cart.store";
import { formatCurrency } from "@/lib/utils";

export function CartDrawer() {
  const router = useRouter();
  const items = useCartItems();
  const total = useCartTotal();
  const count = useCartItemCount();
  const { updateQuantity, removeItem, clearCart } = useCartStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {count > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
              {count}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="flex flex-col w-80 sm:w-96">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" /> Cart
            {count > 0 && (
              <Badge variant="secondary">
                {count} item{count !== 1 ? "s" : ""}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-2">
            <ShoppingCart className="h-10 w-10 opacity-30" />
            <p className="text-sm">Your cart is empty</p>
          </div>
        ) : (
          <>
            {/* Item list */}
            <div className="flex-1 overflow-auto py-2 space-y-3">
              {items.map((item) => (
                <div key={item.menu_item_id} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(item.price)} each
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-6 w-6"
                      onClick={() =>
                        updateQuantity(item.menu_item_id, item.quantity - 1)
                      }
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm w-4 text-center">
                      {item.quantity}
                    </span>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-6 w-6"
                      onClick={() =>
                        updateQuantity(item.menu_item_id, item.quantity + 1)
                      }
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 text-destructive"
                      onClick={() => removeItem(item.menu_item_id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>

                  <p className="text-sm font-semibold shrink-0 w-16 text-right">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <Separator />

            {/* Footer */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <Button
                className="w-full"
                onClick={() => router.push("/dashboard/customer/checkout")}
              >
                Proceed to Checkout
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-1 text-destructive hover:text-destructive"
                onClick={clearCart}
              >
                <Trash2 className="h-3 w-3" /> Clear Cart
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
