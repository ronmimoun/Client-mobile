import {
  ApiErrorSourceEnum,
  ApiResponse,
  ApiServerResponse,
  IApiError,
  ServerError,
} from "../models/base/api-base";

export function successfulApiResponse<T extends ApiServerResponse<T>>(
  response: T
): ApiResponse<T> {
  const apiResponse: ApiResponse<T> = {
    data: response,
    isSucceeded: true,
    errors: [],
  };
  return apiResponse;
}

export function failureApiResponse<T>(
  errorType: ApiErrorSourceEnum,
  error: ServerError | null = null
): ApiResponse<T> {
  if (!error) {
    const apiResponse: ApiResponse<T> = {
      isSucceeded: false,
      errorSource: errorType,
    };
    return apiResponse;
  }

  const apiError: IApiError = { code: error.status, message: error.message };
  const apiResponse: ApiResponse<T> = {
    isSucceeded: false,
    errors: [apiError],
    errorSource: errorType,
  };
  return apiResponse;
}

export function isServerErrorType(error: any): error is ServerError {
  return !!(error as ServerError).message;
}
