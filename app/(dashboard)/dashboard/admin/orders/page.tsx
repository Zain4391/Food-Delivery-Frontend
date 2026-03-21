"use client";

import { useState, useCallback } from "react";
import { useOrders } from "@/hooks/queries/useOrders";
import {
  useUpdateOrderStatus,
  useCancelOrder,
  useDeleteOrder,
} from "@/hooks/mutations/useOrderMutations";
import { useMarkOrderReady } from "@/hooks/mutations/useRestaurantMutations";
import { OrderStatus } from "@/types/order.types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { STATUS_VARIANT } from "@/types/map";
import { formatCurrency, formatDate } from "@/lib/utils";

const ALL_STATUSES: OrderStatus[] = [
  "pending", "confirmed", "preparing", "ready",
  "picked_up", "delivered", "cancelled",
];

export default function AdminOrdersPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<OrderStatus | undefined>();
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC");

  const { data, isLoading, isError } = useOrders({
    page, limit: 10, status, sortBy: "order_date", sortOrder,
  });

  const { mutate: updateStatus,  isPending: isUpdating   } = useUpdateOrderStatus();
  const { mutate: cancelOrder,   isPending: isCancelling } = useCancelOrder();
  const { mutate: deleteOrder,   isPending: isDeleting   } = useDeleteOrder();
  const { mutate: markReady,     isPending: isMarking    } = useMarkOrderReady();

  const orders     = data?.items ?? [];
  const total      = data?.meta.totalItems ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / 10));

  const handleStatusFilter = useCallback((value: string) => {
    setStatus(value === "all" ? undefined : (value as OrderStatus));
    setPage(1);
  }, []);

  const handleSortOrder = useCallback((value: string) => {
    setSortOrder(value as "ASC" | "DESC");
    setPage(1);
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Orders</h1>
        <p className="text-sm text-muted-foreground">{total} total orders</p>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>All Orders</CardTitle>
              <CardDescription>
                Manage and track all customer orders.
              </CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Select onValueChange={handleStatusFilter} defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {ALL_STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      <span className="capitalize">{s.replace("_", " ")}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={handleSortOrder} defaultValue="DESC">
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Sort order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DESC">Newest first</SelectItem>
                  <SelectItem value="ASC">Oldest first</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Driver</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell className="hidden sm:table-cell"><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                    <TableCell />
                  </TableRow>
                ))
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-destructive">
                    Failed to load orders. Please try again.
                  </TableCell>
                </TableRow>
              ) : orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No orders found.
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div className="font-mono text-xs font-medium">
                        {order.id.slice(0, 8)}...
                      </div>
                      <div className="text-xs text-muted-foreground truncate max-w-32">
                        {order.delivery_address}
                      </div>
                    </TableCell>

                    <TableCell className="hidden sm:table-cell">
                      <Badge
                        variant={STATUS_VARIANT[order.status]}
                        className="capitalize text-xs"
                      >
                        {order.status.replace("_", " ")}
                      </Badge>
                    </TableCell>

                    <TableCell className="hidden md:table-cell text-xs text-muted-foreground">
                      {order.driver_id
                        ? `${order.driver_id.slice(0, 8)}...`
                        : <span className="italic">Unassigned</span>
                      }
                    </TableCell>

                    <TableCell className="hidden md:table-cell text-sm">
                      {formatDate(order.order_date)}
                    </TableCell>

                    <TableCell className="text-right font-medium">
                      {formatCurrency(Number(order.total_amount))}
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />

                          {/*
                            Status flow:
                            pending    → confirmed  : automatic via RabbitMQ (order.placed → order.confirmed)
                            confirmed  → preparing  : admin manually advances
                            preparing  → ready      : admin clicks Mark Ready → fires order.ready event
                                                       → RabbitMQ → DeliveryService auto-assigns driver
                            ready      → picked_up  : driver action
                            picked_up  → delivered  : driver action
                          */}

                          {order.status === "confirmed" && (
                            <DropdownMenuItem
                              disabled={isUpdating}
                              onClick={() =>
                                updateStatus({ id: order.id, status: "preparing" })
                              }
                            >
                              Move to Preparing
                            </DropdownMenuItem>
                          )}

                          {order.status === "preparing" && (
                            <DropdownMenuItem
                              disabled={isMarking}
                              onClick={() => markReady(order.id)}
                            >
                              Mark Ready
                            </DropdownMenuItem>
                          )}

                          {order.status !== "cancelled" &&
                            order.status !== "delivered" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  disabled={isCancelling}
                                  className="text-destructive focus:text-white"
                                  onClick={() => cancelOrder(order.id)}
                                >
                                  Cancel Order
                                </DropdownMenuItem>
                              </>
                            )}

                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            disabled={isDeleting}
                            className="text-destructive focus:text-white"
                            onClick={() => deleteOrder(order.id)}
                          >
                            Delete Order
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
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
