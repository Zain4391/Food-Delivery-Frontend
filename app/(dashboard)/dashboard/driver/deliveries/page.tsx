"use client";

import { useState } from "react";
import { useUser } from "@/store/auth.store";
import { useDriverAllOrders } from "@/hooks/queries/useDriver";
import { useDeliveryByOrderId } from "@/hooks/queries/useDelivery";
import { useMarkPickedUp, useMarkDelivered } from "@/hooks/mutations/useDeliveryMutations";
import { Order, OrderStatus } from "@/types/order.types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bike,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  PackageCheck,
  PackageOpen,
} from "lucide-react";
import { STATUS_VARIANT } from "@/types/map";
import { formatCurrency, formatDate } from "@/lib/utils";

const ACTIVE_STATUSES: OrderStatus[] = ["ready", "picked_up"];
const ALL_FILTER_STATUSES: OrderStatus[] = ["ready", "picked_up", "delivered"];

// ── Per-order row — fetches its own delivery record ─────────────────────────
function DeliveryOrderRow({ order }: { order: Order }) {
  const { data: delivery, isLoading: deliveryLoading } = useDeliveryByOrderId(order.id);
  const { mutate: markPickedUp, isPending: isPickingUp } = useMarkPickedUp();
  const { mutate: markDelivered, isPending: isDelivering } = useMarkDelivered();

  const isActive = ACTIVE_STATUSES.includes(order.status);

  return (
    <div className="rounded-xl border bg-card p-4 space-y-3">
      {/* Top row: order id + status badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-xs font-semibold text-muted-foreground">
            #{order.id.slice(0, 8).toUpperCase()}
          </p>
          <p className="text-sm font-medium mt-0.5">
            {formatCurrency(Number(order.total_amount))}
          </p>
        </div>
        <Badge
          variant={STATUS_VARIANT[order.status]}
          className="capitalize text-xs shrink-0"
        >
          {order.status.replace("_", " ")}
        </Badge>
      </div>

      {/* Delivery address */}
      <div className="flex items-start gap-2 text-sm text-muted-foreground">
        <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
        <span className="leading-snug">{order.delivery_address}</span>
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Clock className="h-3.5 w-3.5" />
        <span>Ordered {formatDate(order.order_date)}</span>
      </div>

      {/* Actions — only for active orders */}
      {isActive && (
        <>
          <Separator />
          <div className="flex gap-2">
            {deliveryLoading ? (
              <Skeleton className="h-9 flex-1" />
            ) : !delivery ? (
              <p className="text-xs text-muted-foreground italic">
                Delivery record not available yet.
              </p>
            ) : (
              <>
                {/* Show Mark Picked Up only when not yet picked up */}
                {order.status === "ready" && (
                  <Button
                    size="sm"
                    className="flex-1 gap-1.5"
                    disabled={isPickingUp}
                    onClick={() => markPickedUp(delivery.id)}
                  >
                    <PackageOpen className="h-4 w-4" />
                    {isPickingUp ? "Updating…" : "Mark Picked Up"}
                  </Button>
                )}

                {/* Show Mark Delivered only after picked up */}
                {order.status === "picked_up" && (
                  <Button
                    size="sm"
                    variant="default"
                    className="flex-1 gap-1.5"
                    disabled={isDelivering}
                    onClick={() => markDelivered(delivery.id)}
                  >
                    <PackageCheck className="h-4 w-4" />
                    {isDelivering ? "Updating…" : "Mark Delivered"}
                  </Button>
                )}
              </>
            )}
          </div>
        </>
      )}

      {/* Delivered confirmation */}
      {order.status === "delivered" && (
        <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Delivered
        </div>
      )}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function DriverDeliveriesPage() {
  const user = useUser();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | undefined>(undefined);

  const { data, isLoading, isError } = useDriverAllOrders(
    user?.id ?? "",
    {
      page,
      limit: 10,
      status: statusFilter,
      sortBy: "order_date",
      sortOrder: "DESC",
    },
  );

  const orders       = data?.items ?? [];
  const total        = data?.meta?.totalItems ?? 0;
  const totalPages   = Math.max(1, Math.ceil(total / 10));
  const activeOrders = orders.filter((o) => ACTIVE_STATUSES.includes(o.status));

  return (
    <>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-lg font-semibold md:text-2xl">My Deliveries</h1>
          {!isLoading && (
            <p className="text-sm text-muted-foreground mt-0.5">
              {activeOrders.length > 0
                ? `${activeOrders.length} active assignment${activeOrders.length !== 1 ? "s" : ""}`
                : "No active assignments"}
            </p>
          )}
        </div>

        <Select
          defaultValue="all"
          onValueChange={(v) => {
            setStatusFilter(v === "all" ? undefined : (v as OrderStatus));
            setPage(1);
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {ALL_FILTER_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                <span className="capitalize">{s.replace("_", " ")}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active assignments highlight */}
      {!isLoading && !statusFilter && activeOrders.length > 0 && (
        <Card className="border-primary/40 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Bike className="h-4 w-4 text-primary" />
              Active Assignments
            </CardTitle>
            <CardDescription>
              These orders need your action right now.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeOrders.map((order) => (
              <DeliveryOrderRow key={order.id} order={order} />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Full list */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">All Assigned Orders</CardTitle>
          <CardDescription>{total} total</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-28 w-full rounded-xl" />
            ))
          ) : isError ? (
            <p className="text-sm text-destructive text-center py-6">
              Failed to load deliveries.
            </p>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-10 text-muted-foreground">
              <Bike className="h-8 w-8 opacity-30" />
              <p className="text-sm">No deliveries assigned yet.</p>
            </div>
          ) : (
            orders.map((order) => (
              <DeliveryOrderRow key={order.id} order={order} />
            ))
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-muted-foreground">
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
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
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
