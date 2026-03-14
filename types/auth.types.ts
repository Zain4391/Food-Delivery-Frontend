export enum ROLES {
  CUSTOMER = "CUSTOMER",
  DRIVER = "DRIVER",
  ADMIN = "ADMIN",
}

export enum VEHICLE_TYPE {
  CAR = "car",
  BIKE = "bike",
}

export type UserType = "customer" | "driver" | "admin";

export interface UserResponseDTO {
  id: string;
  name: string;
  email: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: ROLES;
  userType: UserType;
}

export interface AuthResponseDTO {
  access_token: string;
  user: UserResponseDTO;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterCustomerDTO {
  name: string;
  email: string;
  password: string;
  address: string;
  role?: ROLES;
  profile_image_url?: string;
}

export interface RegisterDriverDTO {
  name: string;
  email: string;
  password: string;
  phone: string;
  vehicle_type: VEHICLE_TYPE;
  profile_image_url?: string;
}

export interface CustomerResponseDTO extends UserResponseDTO {
  address: string;
  profile_img_url?: string;
}

export interface DriverResponseDTO extends UserResponseDTO {
  phone: string;
  vehicle_type: VEHICLE_TYPE;
  is_available: boolean;
  profile_img_url?: string;
}

export interface AdminResponseDTO extends UserResponseDTO {
  address: string;
  profile_image_url?: string;
}
