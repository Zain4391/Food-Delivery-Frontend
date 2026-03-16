"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const TABS = [
  {
    label: "Customer",
    href: "/register/customer",
  },
  {
    label: "Driver",
    href: "/register/driver",
  },
  {
    label: "Admin",
    href: "/register/admin",
  },
] as const;

export function AuthRoleTab() {
  const pathname = usePathname();
  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-[#221310] w-full px-6 sm-px-12 pt-8 pb-4">
      <div className="w-full max-w-md mx-auto">
        <div className="flex w-full border-b border-[#e6dddb] dar:border-white/10">
          {TABS.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "flex-1 flex items-center justify-center pb-3 pt-4 text-sm font-bold leading-normal tracking-wide transition-colors duration-200",
                  "border-b-[3px] -mb-px",
                  isActive
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-primary hover:border-muted",
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
