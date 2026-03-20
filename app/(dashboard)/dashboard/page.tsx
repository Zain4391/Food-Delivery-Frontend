"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserType } from "@/store/auth.store";
import { ROLES } from "@/types/auth.types";

const ROLE_DASHBOARD: Record<string, string> = {
  [ROLES.ADMIN]: "/dashboard/admin",
  [ROLES.CUSTOMER]: "/dashboard/customer",
  [ROLES.DRIVER]: "/dashboard/driver",
};

export default function DashboardRootPage() {
  const router = useRouter();
  const userType = useUserType();
  const role = userType?.toUpperCase() as string;

  useEffect(() => {
    const target = ROLE_DASHBOARD[role] ?? "/login";
    router.replace(target);
  }, [role, router]);

  return null;
}
