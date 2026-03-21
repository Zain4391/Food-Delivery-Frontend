"use client";

import { ShoppingCart, Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
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

      <SheetContent side="right" className="flex flex-col w-80 sm:w-96 p-0">
        {/* Header */}
        <SheetHeader className="px-4 py-4 border-b">
          <SheetTitle className="flex items-center gap-2 text-base">
            <ShoppingCart className="h-4 w-4" />
            Cart
            {count > 0 && (
              <Badge variant="secondary" className="ml-1">
                {count} item{count !== 1 ? "s" : ""}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-3 px-4">
            <ShoppingBag className="h-12 w-12 opacity-20" />
            <div className="text-center">
              <p className="text-sm font-medium">Your cart is empty</p>
              <p className="text-xs mt-1 opacity-70">Add items from a restaurant to get started</p>
            </div>
          </div>
        ) : (
          <>
            {/* Item list */}
            <div className="flex-1 overflow-auto px-4 py-3 space-y-1">
              {items.map((item, index) => (
                <div key={item.menu_item_id}>
                  <div className="flex items-center gap-3 py-3">
                    {/* Name + price-each */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-tight line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {formatCurrency(item.price)} each
                      </p>
                    </div>

                    {/* Qty stepper */}
                    <div className="flex items-center gap-1 shrink-0">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7 rounded-full"
                        onClick={() =>
                          updateQuantity(item.menu_item_id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium w-5 text-center tabular-nums">
                        {item.quantity}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7 rounded-full"
                        onClick={() =>
                          updateQuantity(item.menu_item_id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    {/* Subtotal + delete */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-sm font-semibold w-14 text-right tabular-nums">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.menu_item_id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  {/* Divider between items, not after last */}
                  {index < items.length - 1 && (
                    <Separator className="opacity-50" />
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t px-4 py-4 space-y-3 bg-muted/30">
              {/* Order total */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-base font-bold tabular-nums">
                  {formatCurrency(total)}
                </span>
              </div>

              <Button
                className="w-full h-10"
                onClick={() => router.push("/customer/checkout")}
              >
                Proceed to Checkout
              </Button>

              <button
                onClick={clearCart}
                className="w-full text-xs text-muted-foreground hover:text-destructive flex items-center justify-center gap-1.5 py-1 transition-colors"
              >
                <Trash2 className="h-3 w-3" />
                Clear cart
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
