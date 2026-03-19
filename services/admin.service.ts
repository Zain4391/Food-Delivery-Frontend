import { apiClient } from "@/lib/axios";
import { Customer, CustomerListParams } from "@/types/customer.types";
import { Driver, DriverListParams } from "@/types/driver.types";
import { PaginatedResponse } from "@/types/api.types";

export const adminService = {
  getAllCustomers: (params?: CustomerListParams) =>
    apiClient.get<PaginatedResponse<Customer>>("/customer/all", { params }),

  getCustomerById: (id: string) => apiClient.get<Customer>(`/customer/${id}`),

  deleteCustomer: (id: string) =>
    apiClient.delete<void>(`/customer/delete/${id}`),

  getAllDrivers: (params?: DriverListParams) =>
    apiClient.get<PaginatedResponse<Driver>>("/driver/all", { params }),

  getDriverById: (id: string) => apiClient.get<Driver>(`/driver/${id}`),

  deleteDriver: (id: string) => apiClient.delete<void>(`/driver/delete/${id}`),
};
