"use client";

import {
  Home,
  Settings,
  ShoppingBag,
  Users,
  Bike,
  ClipboardList,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useUIStore, useIsSidebarOpen } from "@/store/ui.store";
import { useUserType } from "@/store/auth.store";
import { SideBarItemProps } from "../shared/props/SideBarItemprops";
import { ROLES } from "@/types/auth.types";

const ADMIN_NAV: SideBarItemProps[] = [
  { href: "/dashboard/admin", icon: Home, label: "Overview" },
  { href: "/dashboard/admin/orders", icon: ShoppingBag, label: "Orders" },
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

export function MobileSidebar() {
  const isOpen = useIsSidebarOpen();
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const pathname = usePathname();
  const userType = useUserType();
  const role = userType?.toUpperCase() as string;
  const navItems = NAV_BY_ROLE[role] ?? ADMIN_NAV;
  const label = LABEL_BY_ROLE[role] ?? "Food Delivery";

  return (
    <Sheet open={isOpen} onOpenChange={toggleSidebar}>
      <SheetContent side="left" className="w-64 p-0">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <div className="flex h-14 items-center border-b px-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold"
            onClick={toggleSidebar}
          >
            <span>{label}</span>
          </Link>
        </div>
        <nav className="grid items-start px-2 py-2 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={toggleSidebar}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                item.href === pathname
                  ? "bg-muted text-primary"
                  : "text-muted-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
