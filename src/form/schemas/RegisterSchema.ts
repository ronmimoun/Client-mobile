import { z } from "zod";

export const REGISTER_FORM_CONFIG = {
  FORM_NAME: "REGISTER_FORM",
  INPUTS: {
    USERNAME: {
      KEY: "username",
      DEFAULT_VALUE: "",
      PLACEHOLDER: "Enter Username",
    },
    NAME: {
      KEY: "name",
      DEFAULT_VALUE: "",
      PLACEHOLDER: "Enter First Name",
    },
    LAST_NAME: {
      KEY: "lastName",
      DEFAULT_VALUE: "",
      PLACEHOLDER: "Enter Last Name",
    },
    EMAIL: {
      KEY: "email",
      DEFAULT_VALUE: "",
      PLACEHOLDER: "Enter Email",
    },
    PASSWORD: {
      KEY: "password",
      DEFAULT_VALUE: "",
      PLACEHOLDER: "Enter Password",
    },
    CONFIRM_PASSWORD: {
      KEY: "confirmPassword",
      DEFAULT_VALUE: "",
      PLACEHOLDER: "Repeat Password",
    },
    PHONE: {
      KEY: "phone",
      DEFAULT_VALUE: "",
      PLACEHOLDER: "Enter Phone Number",
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
  [REGISTER_FORM_CONFIG.INPUTS.PHONE.KEY]: z.string(),
});

export type RegisterForm = z.infer<typeof REGISTER_FORM_SCHEMA>;
