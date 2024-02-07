import { z } from "zod";
import { countryUtilService } from "../../utils/country.utils";
import { REGEX } from "../../constants/regex.constants";
import { MESSAGES } from "../../constants/messages.constants";

export const WE_ARE_LOOKING_FOR_FORM_CONFIG = {
  FORM_NAME: "WE_ARE_LOOKING_FOR",
  INPUTS: {
    CATEGORIES: {
      KEY: "category",
      DEFAULT_VALUE: "",
      LABEL: "Categories",
      IS_REQUIRED: true,
      ACCESSOR: "title",
    },
    COMPANY: {
      KEY: "company",
      DEFAULT_VALUE: "",
      LABEL: "Companies",
      IS_REQUIRED: true,
      ACCESSOR: "company",
    },
    NAME: {
      KEY: "name",
      DEFAULT_VALUE: "",
      LABEL: "Name",
      IS_REQUIRED: true,
    },
    FAMILY_NAME: {
      KEY: "familyName",
      DEFAULT_VALUE: "",
      LABEL: "Family Name",
      IS_REQUIRED: true,
    },
    JOB_TITLE: {
      KEY: "jobTitle",
      DEFAULT_VALUE: "",
      LABEL: "Job Titles",
      IS_REQUIRED: true,
      ACCESSOR: "title",
    },
    COUNTRY: {
      KEY: "country",
      DEFAULT_VALUE: "",
      LABEL: "Country",
      IS_REQUIRED: true,
      ACCESSOR: "name",
    },
    DESC: {
      KEY: "desc",
      DEFAULT_VALUE: "",
      LABEL: "Description",
      IS_REQUIRED: false,
    },
    PHONE: {
      KEY: "phone",
      DEFAULT_VALUE: "",
      LABEL: "Phone",
      IS_REQUIRED: false,
    },
    LINKED_IN_LINK: {
      KEY: "linkedinLink",
      DEFAULT_VALUE: "",
      LABEL: "LinkedIn Link",
      IS_REQUIRED: true,
    },
  },
};

export const WE_ARE_LOOKING_FOR_FORM_SCHEMA = z.object({
  category: z.string(),
  company: z.string(),
  name: z.string().min(3).max(20),
  familyName: z.string().min(3).max(20),
  jobTitle: z.string(),
  country: z.enum(countryUtilService.getCountryTypes(), {
    errorMap: () => {
      return { message: "Please select a valid option" };
    },
  }),
  desc: z.string(),
  phone: z.string().regex(REGEX.PHONE, MESSAGES.VALIDATION_ERROR.PHONE),
  linkedinLink: z
    .string()
    .regex(REGEX.LINKED_IN, MESSAGES.VALIDATION_ERROR.LINKED_IN_LINK),
});

export type WeAreLookingForFormType = z.infer<
  typeof WE_ARE_LOOKING_FOR_FORM_SCHEMA
>;
