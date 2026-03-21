"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  ArrowLeft,
  MapPin,
  ShoppingBag,
  StickyNote,
  Trash2,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import { checkoutSchema, CheckoutFormValues } from "@/schemas/checkout.schema";
import { useCreateOrder } from "@/hooks/mutations/useOrderMutations";
import {
  useCartStore,
  useCartItems,
  useCartTotal,
  useCartRestaurantId,
} from "@/store/cart.store";
import { useUser } from "@/store/auth.store";
import { formatCurrency } from "@/lib/utils";
import { getErrorMessage } from "@/types/api.types";

export default function CheckoutPage() {
  const router      = useRouter();
  const user        = useUser();
  const items       = useCartItems();
  const total       = useCartTotal();
  const restaurantId = useCartRestaurantId();
  const { clearCart } = useCartStore();

  const { mutate: createOrder, isPending } = useCreateOrder();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { delivery_address: "", special_instructions: "" },
  });

  /* ── Empty cart guard ── */
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="rounded-full bg-muted p-5">
          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="text-center">
          <p className="font-semibold">Your cart is empty</p>
          <p className="text-sm text-muted-foreground mt-1">
            Add items from a restaurant before checking out.
          </p>
        </div>
        <Button asChild>
          <Link href="/customer/restaurants">
            <UtensilsCrossed className="h-4 w-4 mr-2" />
            Browse Restaurants
          </Link>
        </Button>
      </div>
    );
  }

  const onSubmit = (values: CheckoutFormValues) => {
    if (!user?.id || !restaurantId) {
      toast.error("Missing user or restaurant information.");
      return;
    }
    createOrder(
      {
        customer_id: user.id,
        restaurant_id: restaurantId,
        delivery_address: values.delivery_address,
        special_instructions: values.special_instructions || undefined,
        items: items.map((i) => ({
          menu_item_id: i.menu_item_id,
          quantity: i.quantity,
        })),
      },
      {
        onSuccess: () => {
          clearCart();
          toast.success("Order placed! Track it in your orders.");
          router.push("/dashboard/customer/orders");
        },
        onError: (err: unknown) => {
          toast.error(getErrorMessage(err));
        },
      },
    );
  };

  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* ── Back link ── */}
      <Link
        href="/customer/restaurants"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Restaurants
      </Link>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Checkout</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Review your order and enter delivery details.
        </p>
      </div>

      {/* ── Two-column on md+ ── */}
      <div className="grid gap-5 md:grid-cols-[1fr_300px] md:items-start">

        {/* LEFT — delivery form */}
        <div className="space-y-4 rounded-xl border bg-card p-5">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="h-4 w-4 text-primary" />
            <h2 className="font-semibold text-sm">Delivery Details</h2>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="delivery_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="House / flat number, street, city…"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="special_instructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1.5">
                      <StickyNote className="h-3.5 w-3.5" />
                      Special Instructions
                      <span className="text-xs font-normal text-muted-foreground">(optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Allergies, no onions, gate code, ring bell twice…"
                        rows={3}
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit row */}
              <div className="flex gap-2 pt-1">
                <Button type="submit" className="flex-1" size="lg" disabled={isPending}>
                  {isPending ? "Placing Order…" : `Place Order · ${formatCurrency(total)}`}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-11 w-11 shrink-0"
                  onClick={clearCart}
                  title="Clear cart"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* RIGHT — order summary */}
        <div className="rounded-xl border bg-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-primary" />
              <h2 className="font-semibold text-sm">Order Summary</h2>
            </div>
            <Badge variant="secondary" className="text-xs">
              {itemCount} item{itemCount !== 1 ? "s" : ""}
            </Badge>
          </div>

          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.menu_item_id}
                className="flex items-start justify-between gap-2 text-sm"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium leading-tight line-clamp-1">
                    {item.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(item.price)} × {item.quantity}
                  </p>
                </div>
                <span className="font-medium tabular-nums shrink-0">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Subtotal</span>
            <span className="font-bold text-base tabular-nums">
              {formatCurrency(total)}
            </span>
          </div>

          <p className="text-xs text-muted-foreground">
            Delivery fee is included. No hidden charges.
          </p>
        </div>
      </div>
    </div>
  );
}
