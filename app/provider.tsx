"use client";
import { SessionProvider, useSession } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/auth.store";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: 1,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  }
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

function AsyncBridge() {
  const { data: session, status } = useSession();
  const syncedRef = useRef(false);

  useEffect(() => {
    if (status === "loading") return;

    const { setAuth, clearAuth } = useAuthStore.getState();

    if (status === "authenticated" && session && !syncedRef.current) {
      syncedRef.current = true;
      setAuth(
        {
          id: session.user.id,
          name: session.user.name ?? "",
          email: session.user.email ?? "",
          role: session.user.role,
          userType: session.user.userType,
        },
        session.accessToken,
      );
    }

    if (status === "unauthenticated") {
      syncedRef.current = false;
      clearAuth();
    }
  }, [session, status]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <AsyncBridge />
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
}
