"use client";

import { Home, Settings, ShoppingBag, Users } from "lucide-react";
import Link from "next/link";
import { SideBarItemProps } from "../shared/props/SideBarItemprops";
import { SideBarItem } from "./SideBarItem";

const NAV_ITEMS: SideBarItemProps[] = [
  { href: "/dashboard", icon: Home, label: "Overview" },
  { href: "/dashboard/orders", icon: ShoppingBag, label: "Orders" },
  { href: "/dashboard/customers", icon: Users, label: "Customers" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r bg-background md:flex">
      <div className="flex h-14 items-center border-b px-4 lg:h-15 lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span>Food Delivery Admin</span>
        </Link>
      </div>

      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {NAV_ITEMS.map((item) => (
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
