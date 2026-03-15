export interface Customer {
  id: string;
  name: string;
  email: string;
  address: string;
  profile_image_url?: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface RegisterCustomerPayload {
  name: string;
  email: string;
  password: string;
  address: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: Customer;
}

export interface UpdateCustomerPayload {
  name?: string;
  email?: string;
  address?: string;
}

export interface UpdatePasswordPayload {
  old_password: string;
  new_password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}
