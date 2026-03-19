export interface Customer {
  id: string;
  name: string;
  email: string;
  address: string;
  profile_img_url?: string;       // fixed: was profile_image_url, backend DTO exposes profile_img_url
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
