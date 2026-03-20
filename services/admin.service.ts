import { apiClient } from "@/lib/axios";
import { Customer, CustomerListParams } from "@/types/customer.types";
import { Driver, DriverListParams } from "@/types/driver.types";
import { PaginatedResponse } from "@/types/api.types";
import { UpdateCustomerDTO, UpdatePasswordDTO } from "@/types/customer.types";

export const adminService = {
  // ── Customer management ────────────────────────────────────────────────

  getAllCustomers: (params?: CustomerListParams) =>
    apiClient.get<PaginatedResponse<Customer>>("/customer/all", { params }),

  getCustomerById: (id: string) =>
    apiClient.get<Customer>(`/customer/${id}`),

  deleteCustomer: (id: string) =>
    apiClient.delete<void>(`/customer/delete/${id}`),

  // ── Admin self-profile ─────────────────────────────────────────────────

  // GET /customer/admin/profile — returns the JWT payload for the current admin
  getProfile: () =>
    apiClient.get<Customer>("/customer/admin/profile"),

  // PUT /customer/admin/update/:id — update admin's own profile
  updateProfile: (id: string, data: UpdateCustomerDTO) =>
    apiClient.put<Customer>(`/customer/admin/update/${id}`, data),

  // PUT /customer/admin/update-password/:id — update admin's own password
  updatePassword: (id: string, data: UpdatePasswordDTO) =>
    apiClient.put<void>(`/customer/admin/update-password/${id}`, data),

  // ── Driver management ──────────────────────────────────────────────────

  getAllDrivers: (params?: DriverListParams) =>
    apiClient.get<PaginatedResponse<Driver>>("/driver/all", { params }),

  getDriverById: (id: string) =>
    apiClient.get<Driver>(`/driver/${id}`),

  deleteDriver: (id: string) =>
    apiClient.delete<void>(`/driver/delete/${id}`),
};
