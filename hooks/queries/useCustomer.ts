import { adminService } from "@/services/admin.service";
import { customerService } from "@/services/customer.service";
import { CustomerListParams } from "@/types/customer.types";
import { useQuery } from "@tanstack/react-query";

export function useCustomers(params?: CustomerListParams) {
  return useQuery({
    queryKey: ["customers", params],
    queryFn: () => adminService.getAllCustomers(params),
  });
}

export function useCustomerById(id: string) {
  return useQuery({
    queryKey: ["customers", id],
    queryFn: () => adminService.getCustomerById(id),
  });
}

export function useCustomerProfile() {
  return useQuery({
    queryKey: ["customers"],
    queryFn: () => customerService.getProfile(),
  });
}

// Use when customer wants to fetch his/her order
export function useCustomerOrders(id: string, params?: CustomerListParams) {
  return useQuery({
    queryKey: ["customers", "orders", id, params],
    queryFn: () => customerService.getOrders(id, params),
  });
}
