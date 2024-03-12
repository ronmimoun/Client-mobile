import { z } from "zod";

export const AI_CHAT_FORM_CONFIG = {
  FORM_NAME: "AI_CHAT_FORM",
  INPUTS: {
    MESSAGE: {
      REQUIRED: true,
      PLACEHOLDER: "",
      DEFAULT_VALUE: "",
      KEY: "message",
    },
  },
};

export const AiChatFormSchema = z.object({
  message: z.string().max(50),
});

export type AiChatFormType = z.infer<typeof AiChatFormSchema>;
