import { regexValues } from "@/utils/frontHelper";

export const loginFormJson = {
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
};
