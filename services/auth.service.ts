import { apiClient } from "@/lib/axios";
import {
  AuthResponseDTO,
  LoginDTO,
  RegisterAdminDTO,
  RegisterCustomerDTO,
  RegisterDriverDTO,
} from "@/types/auth.types";

export const authService = {
  loginCustomer: (data: LoginDTO): Promise<AuthResponseDTO> =>
    apiClient.post<AuthResponseDTO>("/api/auth/customer/login", data),

  loginDriver: (data: LoginDTO): Promise<AuthResponseDTO> =>
    apiClient.post<AuthResponseDTO>("/api/auth/driver/login", data),

  loginAdmin: (data: LoginDTO): Promise<AuthResponseDTO> =>
    apiClient.post<AuthResponseDTO>("/api/auth/admin/login", data),

  registerCustomer: (data: RegisterCustomerDTO): Promise<AuthResponseDTO> =>
    apiClient.post<AuthResponseDTO>("/api/auth/customer/register", data),

  registerDriver: (data: RegisterDriverDTO): Promise<AuthResponseDTO> =>
    apiClient.post<AuthResponseDTO>("/api/auth/driver/register", data),

  registerAdmin: (data: RegisterAdminDTO): Promise<AuthResponseDTO> =>
    apiClient.post<AuthResponseDTO>("/api/auth/admin/register", data),
};
