import { AuthUser } from "@/types/auth.types";

export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;

  // Actions
  clearAuth: () => void;
  setAuth: (user: AuthUser, accessToken: string) => void;
  setHydrated: () => void;
  updateUser: (partial: Partial<AuthUser>) => void;
}
