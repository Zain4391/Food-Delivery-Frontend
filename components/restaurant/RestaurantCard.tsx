"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Restaurant } from "@/types/restaurant.types";

interface Props {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: Props) {
  return (
    <Link href={`/customer/restaurants/${restaurant.id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer h-full">
        {/* Banner */}
        <div className="relative h-36 w-full bg-muted">
          {restaurant.banner_url ? (
            <Image
              src={restaurant.banner_url}
              alt={restaurant.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs">
              No image
            </div>
          )}
          <div className="absolute top-2 right-2">
            <Badge variant={restaurant.is_active ? "default" : "secondary"}>
              {restaurant.is_active ? "Open" : "Closed"}
            </Badge>
          </div>
        </div>

        <CardContent className="p-3 space-y-1">
          {/* Logo + Name */}
          <div className="flex items-center gap-2">
            {restaurant.logo_url && (
              <div className="relative h-8 w-8 shrink-0 rounded-full overflow-hidden border bg-muted">
                <Image
                  src={restaurant.logo_url}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <p className="font-semibold text-sm leading-tight line-clamp-1">
              {restaurant.name}
            </p>
          </div>

          <p className="text-xs text-muted-foreground capitalize">
            {restaurant.cusine_type}
          </p>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
            <span className="flex items-center gap-1 min-w-0">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="line-clamp-1">{restaurant.address}</span>
            </span>
            <span className="flex items-center gap-1 shrink-0 ml-2">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {Number(restaurant.rating).toFixed(1)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
