import { z } from "zod";
import { REGEX } from "../../constants/regex.constants";

export const REGISTER_FORM_CONFIG = {
  FORM_NAME: "REGISTER_FORM",
  INPUTS: {
    USERNAME: {
      KEY: "username",
      DEFAULT_VALUE: "",
      PLACEHOLDER: "Enter Username",
      LABEL: "Username",
      REQUIRED: true,
    },
    NAME: {
      KEY: "name",
      DEFAULT_VALUE: "",
      PLACEHOLDER: "Enter First Name",
      LABEL: "Name",
      REQUIRED: true,
    },
    LAST_NAME: {
      KEY: "lastName",
      DEFAULT_VALUE: "",
      PLACEHOLDER: "Enter Last Name",
      LABEL: "Last Name",
      REQUIRED: true,
    },
    EMAIL: {
      KEY: "email",
      DEFAULT_VALUE: "",
      PLACEHOLDER: "Enter Email",
      LABEL: "Email",
      REQUIRED: true,
    },
    PASSWORD: {
      KEY: "password",
      DEFAULT_VALUE: "",
      PLACEHOLDER: "Enter Password",
      LABEL: "Password",
      REQUIRED: true,
      TYPE: "password",
    },
    CONFIRM_PASSWORD: {
      KEY: "confirmPassword",
      DEFAULT_VALUE: "",
      PLACEHOLDER: "Repeat Password",
      LABEL: "Confirm Password",
      REQUIRED: true,
      TYPE: "password",
    },
    PHONE: {
      KEY: "phone",
      DEFAULT_VALUE: "",
      PLACEHOLDER: "Enter Phone Number",
      LABEL: "Phone",
      REQUIRED: true,
    },
  },
};

export const REGISTER_FORM_SCHEMA = z.object({
  [REGISTER_FORM_CONFIG.INPUTS.USERNAME.KEY]: z.string(),
  [REGISTER_FORM_CONFIG.INPUTS.NAME.KEY]: z.string(),
  [REGISTER_FORM_CONFIG.INPUTS.LAST_NAME.KEY]: z.string(),
  [REGISTER_FORM_CONFIG.INPUTS.EMAIL.KEY]: z.string(),
  [REGISTER_FORM_CONFIG.INPUTS.PASSWORD.KEY]: z.string(),
  [REGISTER_FORM_CONFIG.INPUTS.CONFIRM_PASSWORD.KEY]: z.string(),
  [REGISTER_FORM_CONFIG.INPUTS.PHONE.KEY]: z
    .string()
    .regex(REGEX.PHONE.REGEX, REGEX.PHONE.MESSAGE),
});

export type RegisterForm = z.infer<typeof REGISTER_FORM_SCHEMA>;
