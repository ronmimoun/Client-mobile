import { AxiosError, InternalAxiosRequestConfig } from "axios";
import {
  decrementLoaderCount,
  incrementLoaderCount,
} from "../../store/global/global.reducer";
import {
  RequestErrorOptions,
  RequestLoaderOptions,
} from "../../types/request/RequestOptions";
import { store } from "../../utils/non-circular-injections.utils";
import { isServerErrorType } from "../../utils/api-response-builders.utils";
import { concatBearerToken } from "../../utils/header.utils";
import { ServerErrorMessage } from "../../models/base/api-base";
import { toast } from "react-toastify";

export const handleLoader = (
  loaderOptions?: RequestLoaderOptions,
  isIncrement: boolean = true
) => {
  if (loaderOptions?.ignore) return;

  if (isIncrement) {
    store.dispatch(incrementLoaderCount());
  } else {
    store.dispatch(decrementLoaderCount());
  }
};

export const handleError = (error: AxiosError) => {
  const config = error.config;
  if (!isValidErrorAlert(config?.errorOptions, error.response?.data)) return;
  const errorMessageToDisplay = makeErrorMessage(error);

  toast.error(errorMessageToDisplay);
};

export const addJwtHeader = (config: InternalAxiosRequestConfig<any>) => {
  if (config.headers.Authorization) return;

  const jwt = store.getState().user.jwtToken;
  if (!jwt) return;

  config.headers.Authorization = concatBearerToken(jwt);
};

const isValidErrorAlert = (
  errorOptions?: RequestErrorOptions,
  errorData?: any
) => {
  if (!errorOptions) return true;
  if (errorOptions.ErrorAlertMode === "Disabled") return false;

  return !isIgnoredErrorCode(errorOptions, errorData);
};

const isIgnoredErrorCode = (
  errorOptions: RequestErrorOptions,
  errorData?: any
) => {
  if (!errorOptions.ignoredErrorCodes || !errorData) return false;
  if (!isServerErrorType(errorData)) return false;

  return errorOptions.ignoredErrorCodes.has(errorData.message.toString());
};

const makeErrorMessage = (error: AxiosError): string => {
  const errorCode: number | undefined = error.response?.status;
  const errorMessage = error.response?.data as ServerErrorMessage;
  if (!errorCode || !errorMessage) return "Unknown error message";
  return `${errorCode || ""} ${errorMessage.status} - ${errorMessage.message}`;
};
