export interface ApiResponse<T> {
  data?: ApiServerResponse<T>;
  isSucceeded: boolean;
  errors?: IApiError[];
  errorSource?: ApiErrorSourceEnum;
}

export type IApiError = {
  code?: string;
  message?: string;
};

export interface ServerError {
  status: string;
  message: string;
}

export type ServerErrorMessage = {
  status: "error";
  message: string;
};

export enum ApiErrorSourceEnum {
  RequestCanceled = "RequestCanceled",
  RequestAPIError = "RequestAPIError",
  RequestNetworkError = "RequestNetworkError",
  RequestUnknownError = "RequestUnknownError",
}

export type ApiServerResponse<T> = {
  status: ServerStatuses;
  content: T;
};

enum ServerStatuses {
  success = "ok",
}
