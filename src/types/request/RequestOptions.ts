import { AxiosRequestConfig } from "axios";
import { AlertButtonInfo } from "../alert/AlertMessage";

export type RequestOptions = CustomRequestConfig &
  Pick<AxiosRequestConfig, "headers">;

export type CustomRequestConfig = {
  retryOptions?: RequestRetryOptions;
  errorOptions?: RequestErrorOptions;
  loaderOptions?: RequestLoaderOptions;
  targetAPIHost?: TargetAPIHostEnum;
};

export type RequestRetryOptions = {
  retry: number;
  __retryCount?: number;
  retryDelay: number;
};

export type RequestErrorOptions = {
  ErrorAlertMode: ErrorAlertMode;
  title?: string;
  content?: string;
  alertButton?: AlertButtonInfo[];
  isLockout?: boolean;
  ignoredErrorCodes?: Set<string>;
};

export type RequestLoaderOptions = {
  ignore?: boolean;
};

export type ErrorAlertMode =
  | "Automatic"
  | "CustomOrAutomaticApiErrors"
  | "Custom"
  | "Disabled";

export const enum TargetAPIHostEnum {
  Server,
}
