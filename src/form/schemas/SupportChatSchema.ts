import { z } from "zod";

export const SUPPORT_CHAT_FORM_CONFIG = {
  FORM_NAME: "SUPPORT_CHAT_FORM",
  INPUTS: {
    MESSAGE: {
      KEY: "message",
      DEFAULT_VALUE: "",
      PLACEHOLDER: "Type something",
    },
  },
};

export const SUPPORT_CHAT_FORM_SCHEMA = z.object({
  [SUPPORT_CHAT_FORM_CONFIG.INPUTS.MESSAGE.KEY]: z.string(),
});

export type SupportChatForm = z.infer<typeof SUPPORT_CHAT_FORM_SCHEMA>;
