"use client";

import { LogOut, Menu, Settings } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser, useUserRole, useUserType } from "@/store/auth.store";
import { signOut } from "next-auth/react";
import { getInitials, getRoleBadgeVariant } from "@/lib/utils";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { MobileSidebar } from "./MobileSidebar";
import { useUIStore } from "@/store/ui.store";
import { useProfileImage } from "@/hooks/queries/useProfileImage";

export function Header() {
  const user = useUser();
  const role = useUserRole();
  const userType = useUserType();
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  // Profile image fetched live from the DB — updates immediately after upload
  const profileImage = useProfileImage();
  const initials = getInitials(user?.name);
  const displayName = user?.name ?? "My Account";
  const displayEmail = user?.email ?? "";

  // Route the Settings link to the correct role-specific settings page
  const settingsHref =
    userType === "admin"
      ? "/dashboard/admin/settings"
      : userType === "driver"
        ? "/dashboard/driver/settings"
        : "/dashboard/customer/settings";

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      <MobileSidebar />
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-15 lg:px-6">
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 md:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>

        <div className="flex-1" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative flex items-center gap-2 rounded-full px-2 focus-visible:ring-0"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={profileImage} alt={displayName} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium md:inline-block">
                {displayName}
              </span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">{displayName}</p>
                  {role && (
                    <Badge
                      variant={getRoleBadgeVariant(role)}
                      className="text-xs capitalize"
                    >
                      {role.toLowerCase()}
                    </Badge>
                  )}
                </div>
                <p className="text-xs leading-none text-muted-foreground">
                  {displayEmail}
                </p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link
                href={settingsHref}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="flex items-center gap-2 text-destructive focus:text-white cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </>
  );
}
