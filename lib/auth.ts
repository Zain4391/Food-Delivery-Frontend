import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { apiClient } from "./axios";
import { AuthResponseDTO, LoginDTO, ROLES } from "@/types/auth.types";
import { User } from "@/types/next-auth";
import { AppException } from "@/types/api.types";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      id: "customer-login",
      name: "Customer",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        try {
          const payload: LoginDTO = {
            email: credentials?.email as string,
            password: credentials?.password as string,
          };
          const response = await apiClient.post<AuthResponseDTO>(
            `/api/auth/customer/login`,
            payload,
          );

          const { access_token, user } = response;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            accessToken: access_token,
            role: ROLES.CUSTOMER,
            userType: "customer" as const,
          };
        } catch (error) {
          if (error instanceof AppException) {
            console.error(
              `[Auth Error] ${error.statusCode}: ${error.message} at ${error.timestamp}`,
            );
            throw new Error(error.message);
          }
          throw new Error("Something went wrong");
        }
      },
    }),
    Credentials({
      id: "driver-login",
      name: "Driver",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        try {
          const payload: LoginDTO = {
            email: credentials?.email as string,
            password: credentials?.password as string,
          };
          const response = await apiClient.post<AuthResponseDTO>(
            `/api/auth/driver/login`,
            payload,
          );

          const { access_token, user } = response;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            accessToken: access_token,
            role: ROLES.DRIVER,
            userType: "driver" as const,
          };
        } catch (error) {
          if (error instanceof AppException) {
            console.error(
              `[Auth Error] ${error.statusCode}: ${error.message} at ${error.timestamp}`,
            );
            throw new Error(error.message);
          }
          throw new Error("Invalid Email or Password");
        }
      },
    }),
    Credentials({
      id: "admin-login",
      name: "Admin",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        try {
          const payload: LoginDTO = {
            email: credentials?.email as string,
            password: credentials?.password as string,
          };
          const response = await apiClient.post<AuthResponseDTO>(
            `/api/auth/admin/login`,
            payload,
          );

          const { access_token, user } = response;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            accessToken: access_token,
            role: ROLES.DRIVER,
            userType: "driver" as const,
          };
        } catch (error) {
          if (error instanceof AppException) {
            console.error(
              `[Auth Error] ${error.statusCode}: ${error.message} at ${error.timestamp}`,
            );
            throw new Error(error.message);
          }
          throw new Error("Invalid Email or Password");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const typedUser = user as User;
        token.id = typedUser.id as string;
        token.accessToken = typedUser.accessToken;
        token.role = typedUser.role;
        token.userType = typedUser.userType;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as ROLES;
      session.user.userType = token.userType as "customer" | "driver" | "admin";
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
});
