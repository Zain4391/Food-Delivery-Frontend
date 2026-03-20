import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AuthState } from "./interfaces/auth.state.interface";
import { AuthUser, ROLES } from "@/types/auth.types";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isHydrated: false,

      setAuth: (user: AuthUser, accessToken: string) =>
        set({
          user,
          accessToken,
          isAuthenticated: true,
        }),

      clearAuth: () =>
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        }),

      setHydrated: () => set({ isHydrated: true }),

      updateUser: (partial: Partial<AuthUser>) => {
        const current = get().user;
        if (!current) return;
        set({ user: { ...current, ...partial } });
      },
    }),
    {
      name: "food-delivery-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
        // isHydrated is intentionally NOT persisted — it must be
        // set fresh each session by AsyncBridge after NextAuth resolves
      }),
    },
  ),
);

// Selectors
export const useUser = () => useAuthStore((state) => state.user);
export const useAccessToken = () => useAuthStore((state) => state.accessToken);
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
export const useUserRole = () => useAuthStore((state) => state.user?.role);
export const useUserType = () => useAuthStore((state) => state.user?.userType);
export const useIsHydrated = () => useAuthStore((state) => state.isHydrated);

export const useIsCustomer = () =>
  useAuthStore((state) => state.user?.role === ROLES.CUSTOMER);
export const useIsDriver = () =>
  useAuthStore((state) => state.user?.role === ROLES.DRIVER);
export const useIsAdmin = () =>
  useAuthStore((state) => state.user?.role === ROLES.ADMIN);
