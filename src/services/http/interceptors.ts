import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { addJwtHeader, handleError, handleLoader } from "./handlers";

export function addInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use(onRequestFulfilled, onRequestRejected);
  const onResponseRejectedRetry = async (error: AxiosError) => {
    return await onResponseRejected(error, instance);
  };
  instance.interceptors.response.use(
    onResponseFulfilled,
    onResponseRejectedRetry
  );
}

function onRequestFulfilled(config: InternalAxiosRequestConfig<any>) {
  handleLoader(config.loaderOptions);
  addJwtHeader(config);

  if (config.headers.Authorization) return config;

  return config;
}

function onRequestRejected(error: any) {
  return Promise.reject(error);
}

function onResponseFulfilled(response: AxiosResponse<any, any>) {
  handleLoader(response.config.loaderOptions, false);
  return response;
}

function onResponseRejected(error: AxiosError, instance: AxiosInstance) {
  const config = error.config;

  if (!!axios.isCancel(error) === true) {
    console.log("Request canceled", error);
    handleLoader(config?.loaderOptions, false);
    return Promise.reject(error);
  }

  if ((error as AxiosError<unknown, any>).response) {
    console.log(
      "API error",
      (error as AxiosError<unknown, any>).response?.data
    );
  } else if ((error as AxiosError<unknown, any>).request) {
    console.log("Network error", (error as AxiosError<unknown, any>).request);
  } else {
    console.log(
      "Unknown request error",
      (error as AxiosError<unknown, any>).message
    );
  }

  handleLoader(config?.loaderOptions, false);
  handleError(error);
  return Promise.reject(error);
}
