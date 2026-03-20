"use client";

import { Home, Settings, ShoppingBag, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useUIStore, useIsSidebarOpen } from "@/store/ui.store";
import { SideBarItemProps } from "../shared/props/SideBarItemprops";

const NAV_ITEMS: SideBarItemProps[] = [
  { href: "/dashboard", icon: Home, label: "Overview" },
  { href: "/dashboard/orders", icon: ShoppingBag, label: "Orders" },
  { href: "/dashboard/customers", icon: Users, label: "Customers" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export function MobileSidebar() {
  const isOpen = useIsSidebarOpen();
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const pathname = usePathname();

  return (
    <Sheet open={isOpen} onOpenChange={toggleSidebar}>
      <SheetContent side="left" className="w-64 p-0">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        {/* Logo */}
        <div className="flex h-14 items-center border-b px-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold"
            onClick={toggleSidebar}
          >
            <span>Food Delivery Admin</span>
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="grid items-start px-2 py-2 text-sm font-medium">
          {NAV_ITEMS.map((item) => (
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
