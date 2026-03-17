import {
  ApiErrorResponse,
  ApiSuccessResponse,
  AppException,
} from "@/types/api.types";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// Server-side axios instance — does NOT use next-auth/react (browser-only).
// Used exclusively in lib/auth.ts (NextAuth authorize callbacks) which run on
// the server and have no access to browser session APIs.
const axiosServerInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosServerInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
  (error: AxiosError) => Promise.reject(error),
);

axiosServerInstance.interceptors.response.use(
  (response: AxiosResponse<ApiSuccessResponse<unknown>>) => {
    return response.data.data as AxiosResponse;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response?.data?.error) {
      throw new AppException(error.response.data.error);
    }

    throw new AppException({
      message: error.message ?? "Network error",
      statusCode: error.response?.status ?? 500,
      timestamp: new Date().toISOString(),
    });
  },
);

export const apiClient = {
  get: <T>(url: string, config?: object): Promise<T> =>
    axiosServerInstance.get(url, config),

  post: <T>(url: string, data?: unknown, config?: object): Promise<T> =>
    axiosServerInstance.post(url, data, config),

  put: <T>(url: string, data?: unknown, config?: object): Promise<T> =>
    axiosServerInstance.put(url, data, config),

  patch: <T>(url: string, data?: unknown, config?: object): Promise<T> =>
    axiosServerInstance.patch(url, data, config),

  delete: <T>(url: string, config?: object): Promise<T> =>
    axiosServerInstance.delete(url, config),
};

export default axiosServerInstance;
