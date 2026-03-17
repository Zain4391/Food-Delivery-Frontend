import { VEHICLE_TYPE } from "./auth.types";

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicle_type: VEHICLE_TYPE;
  is_available: boolean;
  profile_img_url?: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateDriverDTO {
  name: string;
  email: string;
  phone: string;
  vehicle_type: VEHICLE_TYPE;
}

export interface ForgotPasswordDTO {
  email: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface UpdatePasswordDTO {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface DriverListParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}
