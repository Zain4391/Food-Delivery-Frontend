"use client";

import Link from "next/link";
import { SideBarItemProps } from "../shared/props/SideBarItemprops";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function SideBarItem({ href, icon: Icon, label }: SideBarItemProps) {
  const pathname = usePathname(); // to chek for is active state

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
        href === pathname ? "bg-muted text-primary" : "text-muted-foreground",
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}
