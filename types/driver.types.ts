import { VEHICLE_TYPE } from "./auth.types";

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicle_type: VEHICLE_TYPE;
  is_available: boolean;
  profile_img_url?: string; // matches DriverResponseDTO (exposes profile_img_url)
  role: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateDriverDTO {
  name?: string;
  email?: string; // fixed: was missing, backend UpdateDriverDTO has email
  phone?: string;
  vehicle_type?: VEHICLE_TYPE; // fixed: was missing, backend UpdateDriverDTO has vehicle_type
}

export interface UpdateDriverPasswordDTO {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ForgotDriverPasswordDTO {
  email: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface DriverListParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: "name" | "email" | "created_at";
  sortOrder?: "ASC" | "DESC";
}
