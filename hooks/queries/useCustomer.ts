import { adminService } from "@/services/admin.service";
import { customerService } from "@/services/customer.service";
import { CustomerListParams } from "@/types/customer.types";
import { OrderListParams } from "@/types/order.types";
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
    enabled: Boolean(id),
  });
}

export function useCustomerProfile() {
  return useQuery({
    queryKey: ["customers", "profile"],
    queryFn: () => customerService.getProfile(),
  });
}

// Use when customer wants to fetch his/her order
export function useCustomerOrders(id: string, params?: OrderListParams) {
  return useQuery({
    queryKey: ["customers", "orders", id, params],
    queryFn: () => customerService.getOrders(id, params),
    enabled: Boolean(id),
  });
}
