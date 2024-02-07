import { AxiosError } from "axios";
import { ApiErrorSourceEnum, ServerError } from "../models/base/api-base";
import {
  RequestErrorOptions,
  TargetAPIHostEnum,
} from "../types/request/RequestOptions";
import {
  AlertMessage,
  AlertMessageBuilderArg,
} from "../types/alert/AlertMessage";
import { isServerErrorType } from "./api-response-builders.utils";

export function buildApiFailureResponseAlertMessage(
  error: AxiosError,
  errorSource: ApiErrorSourceEnum,
  _targetAPIHost?: TargetAPIHostEnum
): AlertMessage {
  const requestErrorOptions = error.config?.errorOptions;
  if (
    requestErrorOptions &&
    isCustomErrorAlert(requestErrorOptions, error, errorSource)
  ) {
    return buildAlertMessageByRequestErrorOptions(requestErrorOptions);
  }

  return buildAlertMessage({}, error);
  // const isLockout: boolean | undefined = requestErrorOptions?.isLockout;
  // const alertMessageBuilderFunc = getAlertMessageBuilderFunc(isLockout);

  // switch (errorSource) {
  //   case ApiErrorSourceEnum.RequestAPIError:
  //     return buildRequestAPIAlertMessage(
  //       error,
  //       isLockout,
  //       requestErrorOptions?.title || GENERAL_ERROR_TITLE_TEXT
  //     );
  //   case ApiErrorSourceEnum.RequestNetworkError:
  //     return alertMessageBuilderFunc({
  //       title: GENERAL_ERROR_TITLE_TEXT,
  //       content: {
  //         text: "אירעה בעיה בעת ניסון התחברות לשרת",
  //         isTranslationKey: true,
  //       },
  //     });
  //   default:
  //     return alertMessageBuilderFunc({
  //       title: GENERAL_ERROR_TITLE_TEXT,
  //     });
  // }
}

function isCustomErrorAlert(
  requestErrorOptions: RequestErrorOptions,
  error: AxiosError,
  errorSource: ApiErrorSourceEnum
) {
  if (requestErrorOptions.ErrorAlertMode === "Custom") return true;

  const errorData = error.response?.data;
  if (
    requestErrorOptions.ErrorAlertMode === "CustomOrAutomaticApiErrors" &&
    errorSource != ApiErrorSourceEnum.RequestAPIError
  )
    return true;
  else if (
    requestErrorOptions.ErrorAlertMode === "CustomOrAutomaticApiErrors" &&
    (!errorData || !isServerErrorType(errorData))
  )
    return true;

  return false;
}

// function buildRequestAPIAlertMessage(
//   error: AxiosError,
//   alertCodeType: AlertCodeTypeEnum,
//   isLockout?: boolean,
//   title?: TranslationText
// ): AlertMessage {
//   const alertMessageBuilderFunc = getAlertMessageBuilderFunc(isLockout);
//   const targetTitle: TranslationText = title || {
//     text: ApiErrorSourceEnum.RequestAPIError,
//   };

//   const errorData = error.response?.data;
//   if (!errorData || !isServerErrorType(errorData)) {
//     return alertMessageBuilderFunc({ title: targetTitle, alertCodeType });
//   }

//   return alertMessageBuilderFunc({
//     title: targetTitle,
//     content: { text: errorData.message },
//     code: errorData.status,
//     alertCodeType,
//     alertSource: ApiErrorSourceEnum.RequestAPIError,
//   });
// }

function buildAlertMessageByRequestErrorOptions(
  requestErrorOptions: RequestErrorOptions
): AlertMessage {
  const alertMessageBuilderArg: AlertMessageBuilderArg = {
    title: requestErrorOptions.title,
    content: requestErrorOptions.content,
  };

  const alertMessageBuilderFunc = getAlertMessageBuilderFunc(
    requestErrorOptions.isLockout
  );
  return alertMessageBuilderFunc(alertMessageBuilderArg);
}

function buildLockoutAlertMessage({
  title,
  content,
  code,
}: AlertMessageBuilderArg): AlertMessage {
  return buildAlertMessage({
    title,
    content,
    code,
  });
}

function buildAlertMessage(
  { title, content, code }: AlertMessageBuilderArg,
  error?: AxiosError
): AlertMessage {
  if (error) {
    return {
      title: (error.response?.data as ServerError).status,
      content: (error.response?.data as ServerError).message,
      code: error?.response?.status,
    };
  }

  return {
    title: title,
    content: content || "Some Problem Occurred",
    code,
  };
}

function getAlertMessageBuilderFunc(isLockout?: boolean) {
  if (isLockout) return buildLockoutAlertMessage;
  else return buildAlertMessage;
}
