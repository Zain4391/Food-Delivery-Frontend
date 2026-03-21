"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Star, ArrowLeft } from "lucide-react";
import { useRestaurant, useAvailableMenuItems } from "@/hooks/queries/useRestaurant";
import { MenuCategorySection } from "@/components/restaurant/MenuCategorySection";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CATEGORY, MenuItem } from "@/types/restaurant.types";

const CATEGORY_ORDER: CATEGORY[] = [
  CATEGORY.MAIN,
  CATEGORY.APPETIZER,
  CATEGORY.DESSERT,
  CATEGORY.BEVERAGE,
];

export default function RestaurantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data: restaurant, isLoading: restLoading } = useRestaurant(id);
  const { data: menuItems, isLoading: menuLoading } = useAvailableMenuItems(id);

  const items: MenuItem[] = (menuItems as MenuItem[]) ?? [];

  const groupedByCategory = CATEGORY_ORDER.reduce(
    (acc, cat) => {
      acc[cat] = items.filter((i) => i.category === cat);
      return acc;
    },
    {} as Record<CATEGORY, MenuItem[]>,
  );

  return (
    <div className="space-y-5">
      {/* Back + Cart row */}
      <div className="flex items-center justify-between">
        <Link
          href="/customer/restaurants"
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Restaurants
        </Link>
        <CartDrawer />
      </div>

      {/* Restaurant Header */}
      {restLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      ) : restaurant ? (
        <div className="space-y-3">
          {/* Banner */}
          <div className="relative h-48 w-full rounded-lg overflow-hidden bg-muted">
            {restaurant.banner_url ? (
              <Image
                src={restaurant.banner_url}
                alt={restaurant.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
                No banner
              </div>
            )}
            <Badge
              className="absolute top-3 right-3"
              variant={restaurant.is_active ? "default" : "secondary"}
            >
              {restaurant.is_active ? "Open" : "Closed"}
            </Badge>
          </div>

          {/* Info row */}
          <div className="flex items-start gap-3">
            {restaurant.logo_url && (
              <div className="relative h-14 w-14 shrink-0 rounded-full overflow-hidden border bg-muted">
                <Image
                  src={restaurant.logo_url}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold">{restaurant.name}</h1>
              <p className="text-sm text-muted-foreground capitalize">
                {restaurant.cusine_type}
              </p>
              {restaurant.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {restaurant.description}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {Number(restaurant.rating).toFixed(1)}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {restaurant.address}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3" /> {restaurant.phone}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Menu */}
      <div>
        <h2 className="text-base font-semibold mb-3">Menu</h2>
        {menuLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-lg" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center">
            No available items at this time.
          </p>
        ) : (
          <div className="space-y-6">
            {CATEGORY_ORDER.map((cat) => (
              <MenuCategorySection
                key={cat}
                category={cat}
                items={groupedByCategory[cat]}
                restaurantId={id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
