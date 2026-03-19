export interface Customer {
  id: string;
  name: string;
  email: string;
  address: string;
  profile_img_url?: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateCustomerDTO {
  name?: string;
  email?: string;
  address?: string;
}

export interface UpdatePasswordDTO {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ForgotPasswordDTO {
  email: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface CustomerListParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: "name" | "email" | "created_at";
  sortOrder?: "ASC" | "DESC";
}

export interface UpdateProfileDTO {
  id: string;
  data: UpdateCustomerDTO;
}

export interface UpdateProfileImageDTO {
  id: string;
  file: File;
}

export interface UpdateProfilePasswordDTO {
  id: string;
  data: UpdatePasswordDTO;
}
