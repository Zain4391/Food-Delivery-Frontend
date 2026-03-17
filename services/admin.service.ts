import { apiClient } from "@/lib/axios";
import { PaginatedResponse } from "@/types/api.types";
import { Customer, CustomerListParams } from "@/types/customer.types";
import { Driver, DriverListParams } from "@/types/drivers.type";

export const adminService = {
  getAllCustomers: (params?: CustomerListParams) => {
    return apiClient.get<PaginatedResponse<Customer>>("/customer/all", {
      params,
    });
  },

  getCustomerById: (id: string) => {
    return apiClient.get<PaginatedResponse<Customer>>(`/customer/${id}`);
  },

  deleteCustomer: (id: string) => {
    return apiClient.delete<void>(`/customer/delete/${id}`);
  },

  getAllDrivers: (params?: DriverListParams) => {
    return apiClient.get<PaginatedResponse<Driver>>("/driver/all", {
      params,
    });
  },

  getDriverById: (id: string) => {
    return apiClient.get<PaginatedResponse<Driver>>(`/driver/${id}`);
  },

  deleteDriver: (id: string) => {
    return apiClient.delete<void>(`/driver/delete/${id}`);
  },
};
