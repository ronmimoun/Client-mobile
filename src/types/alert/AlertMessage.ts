import { ApiErrorSourceEnum } from "../../models/base/api-base";
import { TranslationText } from "../translation/Translation";

export type AlertMessage = {
  title?: string;
  content?: string;
  code?: number;
};

export type AlertButtonInfo = {
  isConfirmation?: boolean;
  text: TranslationText;
  callbackKey?: string;
  closeOnClick: boolean;
};

const AlertSourceEnum = {
  ...ApiErrorSourceEnum,
  Manual: "Manual",
  Unknown: "Unknown",
} as const;

export type AlertSourceEnum =
  (typeof AlertSourceEnum)[keyof typeof AlertSourceEnum];

export const enum AlertCodeTypeEnum {
  Client = "QLC",
  Network = "QLN",
  Server = "QLS",
}

export type AlertMessageBuilderArg = Omit<AlertMessage, "priority">;
