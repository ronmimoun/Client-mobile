import { z } from "zod";

export const LOGIN_FORM_CONFIG = {
  FORM_NAME: "LOGIN_FORM",
  INPUTS: {
    USERNAME: {
      KEY: "username",
      DEFAULT_VALUE: "",
      PLACEHOLDER: "Enter Username",
      LABEL: "Username",
      REQUIRED: true,
    },
    PASSWORD: {
      KEY: "password",
      DEFAULT_VALUE: "",
      PLACEHOLDER: "Enter Password",
      LABEL: "Password",
      REQUIRED: true,
    },
  },
};

export const LOGIN_SCHEMA = z.object({
  password: z.string(),
  username: z.string().min(3).max(20),
});

export type LoginForm = z.infer<typeof LOGIN_SCHEMA>;
