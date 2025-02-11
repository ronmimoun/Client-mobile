import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
} from "axios";
import {
  ApiErrorSourceEnum,
  ApiResponse,
  ApiServerResponse,
} from "../../models/base/api-base";
import {
  failureApiResponse,
  successfulApiResponse,
} from "../../utils/api-response-builders.utils";
import { TargetAPIHostEnum } from "../../types/request/RequestOptions";

async function managedRequest<T extends ApiServerResponse<T>>(
  this: AxiosInstance,
  options: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<T> = await this.request<T>({
      ...options,
      withCredentials: true,
    });
    return successfulApiResponse<T>(response.data);
  } catch (error: any) {
    if (axios.isCancel(error)) {
      return failureApiResponse<T>(ApiErrorSourceEnum.RequestCanceled);
    } else if (error.response) {
      return failureApiResponse<T>(
        ApiErrorSourceEnum.RequestAPIError,
        error.response.data
      );
    } else if (error.request) {
      return failureApiResponse<T>(ApiErrorSourceEnum.RequestNetworkError);
    } else {
      return failureApiResponse<T>(ApiErrorSourceEnum.RequestUnknownError);
    }
  }
}

type ManagedAxiosInstance = {
  managedRequest<T>(
    this: AxiosInstance,
    options: AxiosRequestConfig
  ): Promise<ApiResponse<T>>;
} & AxiosInstance;

export const createManagedAxiosInstance = (
  config?: CreateAxiosDefaults<any>,
  useInterceptors: boolean = true
): ManagedAxiosInstance => {
  const axiosInstance: AxiosInstance = axios.create(config);

  if (useInterceptors) {
    import("./interceptors").then(({ addInterceptors }) => {
      addInterceptors(axiosInstance);
    });
  }

  const managedAxiosInstance = axiosInstance as ManagedAxiosInstance;
  managedAxiosInstance.managedRequest = managedRequest as ManagedAxiosInstance;
  return managedAxiosInstance;
};

export const buildGeneralApiInstanceConfig = (baseURL: string) => {
  const timeout = Number(import.meta.env.VITE_API_KEY) * 1000;
  const config: CreateAxiosDefaults<any> = {
    baseURL,
    timeout,
    targetAPIHost: TargetAPIHostEnum.Server,
  };

  return config;
};
