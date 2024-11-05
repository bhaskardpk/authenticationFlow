import { regexValues } from "@/utils/frontHelper";
import * as Joi from "joi";
import { objectIdValidation } from "./joiValidation";

let userRegistrationValidationData = {
  fullName: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
  phoneNumber: Joi.string(),
  userName: Joi.string(),

  firstName: Joi.string(),
  lastName: Joi.string(),
  address: Joi.string(),
  dob: Joi.string(),
  avatar: Joi.string(),
  completedStep: Joi.number().valid(1, 2, 3, 4).required(),
};
const userRegistrationValidation = Joi.object({
  ...userRegistrationValidationData,
});

const userUpdateValidation = Joi.object({
  ...userRegistrationValidationData,
  id: Joi.string().required(),
  placeId: Joi.string(),
  countryCode: Joi.string().allow("").optional(),
  function: Joi.string().allow("").optional(),
  profileDescription: Joi.string().allow("").optional(),
  representedClub: Joi.string().allow("").optional(),
  representedPlayer: Joi.string().allow("").optional(),
  identification: Joi.string().allow("").optional(),
  myCertification: Joi.array().items(objectIdValidation).optional(),
  scoutStatus: Joi.string().allow("").optional(),
});

const userLoginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
const userEmailVarification = Joi.object({
  token: Joi.string().required(),
});
const userForgotPassVarification = Joi.object({
  email: Joi.string().email().required(),
});
const userResetForgotPassword = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords and confirm Password do not match",
  }),
});

const passwordPattern = regexValues.passwordValidation.validation;

const userChangePassword = Joi.object({
  password: Joi.string().min(8).pattern(passwordPattern).required().messages({
    "string.pattern.base":
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
  }),
  newPassword: Joi.string()
    .min(8)
    .pattern(passwordPattern)
    .required()
    .messages({
      "string.pattern.base":
        "New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("newPassword"))
    .required()
    .messages({
      "any.only": "New Passwords and confirm password do not match",
    }),
});

const userAddressDetails = Joi.object({
  placeId: Joi.string().required(),
});

const userChangeEmail = Joi.object({
  email: Joi.string().email().required(),
});

export default {
  userRegistrationValidation,
  userLoginValidation,
  userUpdateValidation,
  userEmailVarification,
  userForgotPassVarification,
  userResetForgotPassword,
  userAddressDetails,
  userChangePassword,
  userChangeEmail,
};
