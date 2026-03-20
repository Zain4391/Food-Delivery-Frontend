"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bike, CheckCircle, Clock, ToggleLeft } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { useDriverProfile, useDriverAllOrders } from "@/hooks/queries/useDriver";
import { useUser } from "@/store/auth.store";
import { useToggleAvailability } from "@/hooks/mutations/useDriverMutations";
import { formatCurrency, formatDate } from "@/lib/utils";
import { STATUS_VARIANT } from "@/types/map";

export default function DriverDashboardPage() {
  const user = useUser();

  const { data: profile, isLoading: profileLoading } = useDriverProfile();
  const { data: ordersData, isLoading: ordersLoading } = useDriverAllOrders(
    user?.id ?? "",
    { limit: 100, sortBy: "order_date", sortOrder: "DESC" },
  );
  const { data: recentData, isLoading: recentLoading } = useDriverAllOrders(
    user?.id ?? "",
    { limit: 5, sortBy: "order_date", sortOrder: "DESC" },
  );

  const { mutate: toggleAvailability, isPending: isToggling } =
    useToggleAvailability();

  const orders = ordersData?.data ?? [];
  const recentOrders = recentData?.data ?? [];
  const deliveredCount = orders.filter(
    (o) => o.status === "delivered",
  ).length;
  const activeCount = orders.filter(
    (o) => o.status === "picked_up" || o.status === "ready",
  ).length;
  const isAvailable = profile?.is_available ?? false;

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">
          Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}!
        </h1>
        {/* Availability toggle */}
        <Button
          variant={isAvailable ? "default" : "outline"}
          size="sm"
          disabled={isToggling || profileLoading}
          onClick={() =>
            profile && toggleAvailability({ id: profile.id, is_available: !isAvailable })
          }
          className="gap-2"
        >
          <ToggleLeft className="h-4 w-4" />
          {isAvailable ? "Available" : "Unavailable"}
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deliveries</CardTitle>
            <Bike className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {ordersLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">{deliveredCount}</div>
            )}
            <p className="text-xs text-muted-foreground">Completed deliveries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {ordersLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">{activeCount}</div>
            )}
            <p className="text-xs text-muted-foreground">Picked up or ready</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {profileLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <div className="flex items-center gap-2">
                <div
                  className={`h-2.5 w-2.5 rounded-full ${
                    isAvailable ? "bg-green-500" : "bg-muted-foreground"
                  }`}
                />
                <span className="text-2xl font-bold">
                  {isAvailable ? "Online" : "Offline"}
                </span>
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              {profile?.vehicle_type ?? "Vehicle not set"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Deliveries */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Deliveries</CardTitle>
          <p className="text-sm text-muted-foreground">Your last 5 assigned orders.</p>
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
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell className="hidden sm:table-cell"><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : recentOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                    No deliveries assigned yet.
                  </TableCell>
                </TableRow>
              ) : (
                recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div className="font-mono text-xs font-medium">
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
    </>
  );
}
