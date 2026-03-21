"use client";

import { useState, useCallback } from "react";
import { useRestaurants } from "@/hooks/queries/useRestaurant";
import { RestaurantCard } from "@/components/restaurant/RestaurantCard";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

const CUISINE_FILTERS = [
  "All",
  "pizza",
  "burger",
  "sushi",
  "chinese",
  "desi",
  "bbq",
  "other",
];

export default function RestaurantsPage() {
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading } = useRestaurants({
    page,
    limit: 12,
    search: debouncedSearch || undefined,
    cusine_type: cuisine,
    sortBy: "rating",
    sortOrder: "DESC",
  });

  const restaurants = data?.items ?? [];
  const totalPages = data?.meta?.totalPages ?? 1;

  const handleCuisine = useCallback((c: string) => {
    setCuisine(c === "All" ? undefined : c);
    setPage(1);
  }, []);

  return (
    <div className="space-y-5">
      {/* Header row */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-lg font-semibold md:text-2xl">Restaurants</h1>
        <CartDrawer />
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search restaurants…"
          className="pl-8"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* Cuisine filter pills */}
      <div className="flex gap-2 flex-wrap">
        {CUISINE_FILTERS.map((c) => (
          <Button
            key={c}
            size="sm"
            variant={
              cuisine === c || (c === "All" && !cuisine) ? "default" : "outline"
            }
            className="capitalize text-xs h-7"
            onClick={() => handleCuisine(c)}
          >
            {c}
          </Button>
        ))}
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-52 rounded-lg" />
          ))}
        </div>
      ) : restaurants.length === 0 ? (
        <p className="text-muted-foreground text-sm py-12 text-center">
          No restaurants found.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {restaurants.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
