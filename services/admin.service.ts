import { apiClient } from "@/lib/axios";
import { Customer } from "@/types/customer.types";
import { Driver } from "@/types/driver.types";
import { PaginatedResponse } from "@/types/api.types";

// fixed: constrained sortBy to backend valid values only
export interface CustomerListParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: "name" | "email" | "created_at";   // fixed: was 'string', constrained to backend valid values
  sortOrder?: "ASC" | "DESC";
}

// fixed: constrained sortBy to backend valid values only
export interface DriverListParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: "name" | "email" | "created_at";   // fixed: was 'string', constrained to backend valid values
  sortOrder?: "ASC" | "DESC";
}

export const adminService = {
  // ── Customers ──────────────────────────────────────────
  getAllCustomers: (params?: CustomerListParams) =>
    apiClient.get<PaginatedResponse<Customer>>("/customer/all", { params }),

  getCustomerById: (id: string) =>
    apiClient.get<Customer>(`/customer/${id}`),

  deleteCustomer: (id: string) =>
    apiClient.delete<void>(`/customer/delete/${id}`),

  // ── Drivers ────────────────────────────────────────────
  getAllDrivers: (params?: DriverListParams) =>
    apiClient.get<PaginatedResponse<Driver>>("/driver/all", { params }),

  getDriverById: (id: string) =>
    apiClient.get<Driver>(`/driver/${id}`),

  deleteDriver: (id: string) =>
    apiClient.delete<void>(`/driver/delete/${id}`),
};
