import { regexValues } from "@/utils/frontHelper";

export const forgotPassFormJson = {
  Password: {
    type: "password",
    label: "Password",
    icon: "lockIcon",
    name: "password",
    required: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters",
      },
      pattern: {
        value: regexValues.passwordValidation.validation,
        message: regexValues.passwordValidation.message,
      },
    },
  },
  "Confirm password": {
    type: "password",
    label: "Confirm password",
    icon: "lockIcon",
    name: "confirmPassword",
    required: {
      required: "Confirm password is required",
      minLength: {
        value: 8,
        message: "Confirm password must be at least 8 characters",
      },
      pattern: {
        value: regexValues.passwordValidation.validation,
        message: regexValues.passwordValidation.message,
      },
    },
  },
};
