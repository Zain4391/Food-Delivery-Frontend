"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, ShoppingBag, Users, Bike } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrders } from "@/hooks/queries/useOrders";
import { useCustomers } from "@/hooks/queries/useCustomer";
import { useDrivers } from "@/hooks/queries/useDriver";
import { useIsAdmin } from "@/store/auth.store";
import { formatCurrency, formatDate } from "@/lib/utils";
import { STATUS_VARIANT } from "@/types/map";
import { OrderStatus } from "@/types/order.types";

const ACTIVE_STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "preparing",
  "ready",
  "picked_up",
];

export default function DashboardPage() {
  const isAdmin = useIsAdmin();

  const { data: ordersData, isLoading: ordersLoading } = useOrders({
    limit: 100,
    sortBy: "order_date",
    sortOrder: "DESC",
  });

  const { data: recentOrdersData, isLoading: recentLoading } = useOrders({
    limit: 5,
    sortBy: "order_date",
    sortOrder: "DESC",
  });

  const { data: customersData, isLoading: customersLoading } = useCustomers(
    { limit: 1 },
    { enabled: isAdmin },
  );

  const { data: driversData, isLoading: driversLoading } = useDrivers(
    { limit: 100 },
    { enabled: isAdmin },
  );

  const totalRevenue =
    ordersData?.data
      .filter((o) => o.status === "delivered")
      .reduce((sum, o) => sum + Number(o.total_amount), 0) ?? 0;

  const activeOrdersCount =
    ordersData?.data.filter((o) => ACTIVE_STATUSES.includes(o.status)).length ?? 0;

  const totalCustomers = customersData?.total ?? 0;
  const activeDriversCount = driversData?.data.filter((d) => d.is_available).length ?? 0;
  const onDeliveryCount = driversData?.data.filter((d) => !d.is_available).length ?? 0;
  const recentOrders = recentOrdersData?.data ?? [];

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Overview</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {ordersLoading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            )}
            <p className="text-xs text-muted-foreground">From delivered orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {ordersLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">{activeOrdersCount}</div>
            )}
            <p className="text-xs text-muted-foreground">Pending through picked up</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {customersLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">
                {isAdmin ? totalCustomers : "—"}
              </div>
            )}
            <p className="text-xs text-muted-foreground">Total registered</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Drivers</CardTitle>
            <Bike className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {driversLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">
                {isAdmin ? activeDriversCount : "—"}
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              {isAdmin ? `${onDeliveryCount} currently on delivery` : "Admin only"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-3">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest 5 orders from your store.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                      <TableCell className="hidden sm:table-cell"><Skeleton className="h-4 w-20" /></TableCell>
                      <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : recentOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      No orders found.
                    </TableCell>
                  </TableRow>
                ) : (
                  recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div className="font-medium font-mono text-xs">
                          {order.id.slice(0, 8)}...
                        </div>
                        <div className="hidden text-xs text-muted-foreground md:inline">
                          {order.delivery_address}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge
                          className="text-xs capitalize"
                          variant={STATUS_VARIANT[order.status]}
                        >
                          {order.status.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {formatDate(order.order_date)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(Number(order.total_amount))}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
