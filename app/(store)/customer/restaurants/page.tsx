"use client";

import { useState, useCallback } from "react";
import { useRestaurants } from "@/hooks/queries/useRestaurant";
import { RestaurantCard } from "@/components/restaurant/RestaurantCard";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, UtensilsCrossed, ChevronLeft, ChevronRight } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";

const CUISINE_FILTERS = [
  { label: "All",     value: "all"     },
  { label: "🍕 Pizza",  value: "pizza"   },
  { label: "🍔 Burger", value: "burger"  },
  { label: "🍣 Sushi",  value: "sushi"   },
  { label: "🥡 Chinese",value: "chinese" },
  { label: "🍛 Desi",   value: "desi"    },
  { label: "🔥 BBQ",    value: "bbq"     },
  { label: "🍽️ Other",  value: "other"   },
];

export default function RestaurantsPage() {
  const [search, setSearch]   = useState("");
  const [cuisine, setCuisine] = useState<string | undefined>(undefined);
  const [page, setPage]       = useState(1);

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
  const totalPages  = data?.meta?.totalPages ?? 1;
  const totalItems  = data?.meta?.totalItems ?? 0;

  const handleCuisine = useCallback((v: string) => {
    setCuisine(v === "all" ? undefined : v);
    setPage(1);
  }, []);

  const activeCuisineValue = cuisine ?? "all";

  return (
    <div className="space-y-6">
      {/* ── Page header ── */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Restaurants</h1>
          {!isLoading && (
            <p className="text-sm text-muted-foreground mt-0.5">
              {totalItems > 0
                ? `${totalItems} restaurant${totalItems !== 1 ? "s" : ""} available`
                : "No restaurants found"}
            </p>
          )}
        </div>
        <CartDrawer />
      </div>

      {/* ── Search + filters ── */}
      <div className="space-y-3">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, cuisine or address…"
            className="pl-9 h-10"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>

        {/* Cuisine pills */}
        <div className="flex gap-2 flex-wrap">
          {CUISINE_FILTERS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => handleCuisine(value)}
              className={cn(
                "h-8 px-3 rounded-full text-xs font-medium border transition-colors",
                activeCuisineValue === value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border hover:border-primary hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Restaurant grid ── */}
      {isLoading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden border">
              <Skeleton className="h-36 w-full" />
              <div className="p-3 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : restaurants.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground">
          <UtensilsCrossed className="h-10 w-10 opacity-30" />
          <p className="text-sm font-medium">No restaurants found</p>
          {(search || cuisine) && (
            <button
              className="text-xs underline underline-offset-2"
              onClick={() => { setSearch(""); setCuisine(undefined); setPage(1); }}
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {restaurants.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
