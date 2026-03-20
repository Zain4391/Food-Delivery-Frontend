export type ApiError = {
  message: string;
  statusCode: number;
  timestamp: string;
};

export interface ApiSuccessResponse<T = unknown> {
  statusCode: number;
  success: true;
  data: T;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  error: ApiError;
}

export class AppException extends Error {
  public readonly statusCode: number;
  public readonly timestamp: string;

  constructor(error: ApiError) {
    super(error.message);
    this.name = "AppException";
    this.statusCode = error.statusCode;
    this.timestamp = error.timestamp;
  }
}

// Matches nestjs-typeorm-paginate's Pagination<T> shape
export interface PaginationMeta {
  totalItems?: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages?: number;
  currentPage: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: PaginationMeta;
  links?: {
    first?: string;
    previous?: string;
    next?: string;
    last?: string;
  };
}

export function isAppException(error: unknown): error is AppException {
  return error instanceof AppException;
}

export function getErrorMessage(error: unknown): string {
  if (isAppException(error)) return error.message;
  if (error instanceof Error) return error.message;
  return "Something went wrong";
}
