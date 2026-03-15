import { AuthUser } from "@/types/auth.types";

export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  // Actions
  clearAuth: () => void;
  setAuth: (user: AuthUser, accessToke: string) => void;
  updateUser: (partial: Partial<AuthUser>) => void;
}
