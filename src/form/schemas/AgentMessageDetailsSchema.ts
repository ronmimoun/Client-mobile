import { z } from "zod";

export const AGENT_MESSAGE_DETAILS_FORM_CONFIG = {
  FORM_NAME: "AGENT_MESSAGE_DETAILS_FORM",
  INPUTS: {
    USER_COMPANY: {
      KEY: "userCompany",
      DEFAULT_VALUE: "",
    },
    USER_JOB_TITLE: {
      KEY: "userJobTitle",
      DEFAULT_VALUE: "",
    },
    USER_CATEGORY: {
      KEY: "userCategory",
      DEFAULT_VALUE: "",
    },
    MESSAGE: {
      KEY: "message",
      DEFAULT_VALUE: "",
    },
  },
};

export const AGENT_MESSAGE_DETAILS_FORM_SCHEMA = z.object({
  userCompany: z.string(),
  userJobTitle: z.string(),
  userCategory: z.string(),
  message: z.string(),
});

export type AgentMessageDetailsForm = z.infer<
  typeof AGENT_MESSAGE_DETAILS_FORM_SCHEMA
>;
