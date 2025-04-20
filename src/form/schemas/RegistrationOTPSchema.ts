import { z } from "zod";

export const REGISTRATION_OTP_FORM_CONFIG = {
  INPUTS: {
    OTP: {
      KEY: "otp",
      LABEL: "OTP",
      PLACEHOLDER: "Enter OTP",
      REQUIRED: true,
    },
  },
};

export const REGISTRATION_OTP_FORM_SCHEMA = z.object({
  [REGISTRATION_OTP_FORM_CONFIG.INPUTS.OTP.KEY]: z
    .string()
    .min(6)
    .max(6)
    .trim(),
});

export type RegistrationOTPForm = z.infer<typeof REGISTRATION_OTP_FORM_SCHEMA>;
