import { z } from "zod";

export const FEEDBACK_FORM_CONFIG = {
  FORM_NAME: "FEEDBACK_FORM",
  INPUTS: {
    RATING: {
      KEY: "rating",
      DEFAULT_VALUE: "",
    },
    COMMENT: {
      KEY: "comment",
      DEFAULT_VALUE: "",
    },
  },
};

export const FEEDBACK_FORM_SCHEMA = z.object({
  [FEEDBACK_FORM_CONFIG.INPUTS.RATING.KEY]: z.string(),
  [FEEDBACK_FORM_CONFIG.INPUTS.COMMENT.KEY]: z.string(),
});

export type FeedbackForm = z.infer<typeof FEEDBACK_FORM_SCHEMA>;
