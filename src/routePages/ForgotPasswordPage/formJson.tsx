import { regexValues } from "@/utils/frontHelper";

export const forgotPassFormJson = {
  Email: {
    type: "input",
    label: "Email",
    icon: "frameIcon",
    name: "email",
    required: {
      required: "Email is required",
      pattern: {
        value: regexValues.emailValidation.validation,
        message: regexValues.emailValidation.message,
      },
    },
    // errorMessage: "required",
  },
};
