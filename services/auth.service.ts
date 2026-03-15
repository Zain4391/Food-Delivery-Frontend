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
    apiClient.post<AuthResponseDTO>("/auth/login/customer", data),

  loginDriver: (data: LoginDTO): Promise<AuthResponseDTO> =>
    apiClient.post<AuthResponseDTO>("/auth/login/driver", data),

  loginAdmin: (data: LoginDTO): Promise<AuthResponseDTO> =>
    apiClient.post<AuthResponseDTO>("/auth/login/admin", data),

  registerCustomer: (data: RegisterCustomerDTO): Promise<AuthResponseDTO> =>
    apiClient.post<AuthResponseDTO>("/auth/register/customer", data),

  registerDriver: (data: RegisterDriverDTO): Promise<AuthResponseDTO> =>
    apiClient.post<AuthResponseDTO>("/auth/register/driver", data),

  registerAdmin: (data: RegisterAdminDTO): Promise<AuthResponseDTO> =>
    apiClient.post<AuthResponseDTO>("/auth/register/admin", data),
};
