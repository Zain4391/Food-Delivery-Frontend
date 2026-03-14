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

import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const session = await getSession();

    if (session?.accessToken) {
      config.headers.set("Authorization", `Bearer ${session.accessToken}`);
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
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

// To remove typecasting and use explicit types:
export const apiClient = {
  get: <T>(url: string, config?: object): Promise<T> =>
    axiosInstance.get(url, config),

  post: <T>(url: string, data?: unknown, config?: object): Promise<T> =>
    axiosInstance.post(url, data, config),

  put: <T>(url: string, data?: unknown, config?: object): Promise<T> =>
    axiosInstance.put(url, data, config),

  patch: <T>(url: string, data?: unknown, config?: object): Promise<T> =>
    axiosInstance.patch(url, data, config),

  delete: <T>(url: string, config?: object): Promise<T> =>
    axiosInstance.delete(url, config),
};

export default axiosInstance;
