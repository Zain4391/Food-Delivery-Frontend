"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Trash2, ArrowLeft } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
  const router = useRouter();
  const user = useUser();
  const items = useCartItems();
  const total = useCartTotal();
  const restaurantId = useCartRestaurantId();
  const { clearCart } = useCartStore();

  const { mutate: createOrder, isPending } = useCreateOrder();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { delivery_address: "", special_instructions: "" },
  });

  // Guard: redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-muted-foreground">Your cart is empty.</p>
        <Button asChild variant="outline">
          <Link href="/dashboard/customer/restaurants">Browse Restaurants</Link>
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
          toast.success("Order placed successfully!");
          router.push("/dashboard/customer/orders");
        },
        onError: (err: unknown) => {
          toast.error(getErrorMessage(err));
        },
      },
    );
  };

  return (
    <div className="max-w-2xl space-y-5">
      {/* Back */}
      <Link
        href="/dashboard/customer/restaurants"
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Restaurants
      </Link>

      <h1 className="text-lg font-semibold md:text-2xl">Checkout</h1>

      {/* Order summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {items.map((item) => (
            <div
              key={item.menu_item_id}
              className="flex justify-between text-sm"
            >
              <span>
                {item.name}
                <span className="text-muted-foreground ml-1">
                  × {item.quantity}
                </span>
              </span>
              <span>{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
          <Separator />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Delivery form */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Delivery Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="delivery_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123 Main St, City, Country"
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
                    <FormLabel>Special Instructions (optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Allergies, preferences, gate code…"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isPending}
                >
                  {isPending ? "Placing Order…" : "Place Order"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={clearCart}
                  title="Clear cart"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
