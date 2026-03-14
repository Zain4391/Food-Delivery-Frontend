import { DefaultSession } from "next-auth";
import { ROLES, UserType } from "./auth.types";

// Module Augmentation
declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: {
      id: string;
      role: ROLES;
      userType: UserType;
    } & DefaultSession["user"];
  }
}

interface User {
  id: string;
  name: string;
  email: string;
  role: ROLES;
  userType: UserType;
  accessToken: string;
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: ROLES;
    userType: UserType;
    accessToken: string;
  }
}
