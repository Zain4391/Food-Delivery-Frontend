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
  name?: string;
  email?: string;
  phone?: string;
  vehicle_type?: VEHICLE_TYPE;
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

export interface UpdateDriverProfileImgDTO {
  id: string;
  file: File;
}

export interface UpdateDriverProfileDTO {
  id: string;
  data: UpdateDriverDTO;
}

export interface UpdateDriverProfilePasswordDTO {
  id: string;
  data: UpdateDriverPasswordDTO;
}

export interface ChangeVehicleDTO {
  id: string;
  vehicle_type: VEHICLE_TYPE;
}

export interface DeliveredOrdersDTO {
  id: string;
  page?: number;
  limit?: number;
}

export interface PendingOrdersDTO {
  id: string;
  page?: number;
  limit?: number;
}
