"use client";

import {
  Home,
  Settings,
  ShoppingBag,
  Users,
  Bike,
  ClipboardList,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";
import { SideBarItemProps } from "../shared/props/SideBarItemprops";
import { SideBarItem } from "./SideBarItem";
import { useUserType } from "@/store/auth.store";
import { ROLES } from "@/types/auth.types";

const ADMIN_NAV: SideBarItemProps[] = [
  { href: "/dashboard/admin", icon: Home, label: "Overview" },
  { href: "/dashboard/admin/orders", icon: ShoppingBag, label: "Orders" },
  { href: "/dashboard/admin/restaurants", icon: UtensilsCrossed, label: "Restaurants" },
  { href: "/dashboard/admin/customers", icon: Users, label: "Customers" },
  { href: "/dashboard/admin/drivers", icon: Bike, label: "Drivers" },
  { href: "/dashboard/admin/settings", icon: Settings, label: "Settings" },
];

const CUSTOMER_NAV: SideBarItemProps[] = [
  { href: "/dashboard/customer", icon: Home, label: "Overview" },
  { href: "/dashboard/customer/orders", icon: ClipboardList, label: "My Orders" },
  { href: "/dashboard/customer/settings", icon: Settings, label: "Settings" },
];

const DRIVER_NAV: SideBarItemProps[] = [
  { href: "/dashboard/driver", icon: Home, label: "Overview" },
  { href: "/dashboard/driver/deliveries", icon: Bike, label: "Deliveries" },
  { href: "/dashboard/driver/settings", icon: Settings, label: "Settings" },
];

const NAV_BY_ROLE: Record<string, SideBarItemProps[]> = {
  [ROLES.ADMIN]: ADMIN_NAV,
  [ROLES.CUSTOMER]: CUSTOMER_NAV,
  [ROLES.DRIVER]: DRIVER_NAV,
};

const LABEL_BY_ROLE: Record<string, string> = {
  [ROLES.ADMIN]: "Admin Panel",
  [ROLES.CUSTOMER]: "My Dashboard",
  [ROLES.DRIVER]: "Driver Portal",
};

export function Sidebar() {
  const userType = useUserType();
  const role = userType?.toUpperCase() as string;
  const navItems = NAV_BY_ROLE[role] ?? ADMIN_NAV;
  const label = LABEL_BY_ROLE[role] ?? "Food Delivery";

  return (
    <aside className="hidden w-64 flex-col border-r bg-background md:flex">
      <div className="flex h-14 items-center border-b px-4 lg:h-15 lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span>{label}</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {navItems.map((item) => (
            <SideBarItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
}
