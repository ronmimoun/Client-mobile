import { z } from "zod";

export const EDIT_PROFILE_FORM_CONFIG = {
  FORM_NAME: "EDIT_PROFILE_FORM",
  INPUTS: {
    FULLNAME: {
      KEY: "fullname",
      DEFAULT_VALUE: "",
    },
    USERNAME: {
      KEY: "username",
      DEFAULT_VALUE: "",
    },
    PHONE: {
      KEY: "phone",
      DEFAULT_VALUE: "",
    },
    EMAIL: {
      KEY: "email",
      DEFAULT_VALUE: "",
    },
    COUNTRY_PREFERENCES: {
      KEY: "countryPreferences",
      DEFAULT_VALUE: "",
    },
  },
};

export const EDIT_PROFILE_FORM_SCHEMA = z.object({
  [EDIT_PROFILE_FORM_CONFIG.INPUTS.FULLNAME.KEY]: z.string(),
  [EDIT_PROFILE_FORM_CONFIG.INPUTS.USERNAME.KEY]: z.string(),
  [EDIT_PROFILE_FORM_CONFIG.INPUTS.PHONE.KEY]: z.string(),
  [EDIT_PROFILE_FORM_CONFIG.INPUTS.EMAIL.KEY]: z.string(),
  [EDIT_PROFILE_FORM_CONFIG.INPUTS.COUNTRY_PREFERENCES.KEY]: z.string(),
});

export type EditProfileForm = z.infer<typeof EDIT_PROFILE_FORM_SCHEMA>;
