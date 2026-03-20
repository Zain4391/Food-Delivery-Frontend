"use client";
import { SessionProvider, useSession } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect } from "react";
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

/**
 * AsyncBridge syncs the NextAuth session into Zustand on every status change.
 *
 * Why this matters:
 * - React Query hooks use useAuthStore.getState().accessToken in the Axios interceptor.
 * - If the token isn't in Zustand yet when a query fires, the request goes out
 *   with no Authorization header → 403 from the backend.
 * - We set isHydrated=true only after the session status is no longer "loading",
 *   and all query hooks use `enabled: isHydrated` to block until the token is ready.
 */
function AsyncBridge() {
  const { data: session, status } = useSession();

  useEffect(() => {
    // Don't act until NextAuth has resolved the session
    if (status === "loading") return;

    const { setAuth, clearAuth, setHydrated } = useAuthStore.getState();

    if (status === "authenticated" && session?.accessToken) {
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
      clearAuth();
    }

    // Mark hydration complete — queries are now safe to fire
    setHydrated();
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
