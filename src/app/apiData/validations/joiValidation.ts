import * as Joi from "joi";
import { ObjectId } from "mongodb";

export const validateData = <T>(
  data: T,
  schema: Joi.ObjectSchema<T>
): Joi.ValidationResult<T> => {
  return schema.validate(data, { abortEarly: false });
};

type JoiValidationFunType = {
  data: any;
  validationSchema: any;
};
export const JoiValidationFun = async (
  validationData: JoiValidationFunType
) => {
  try {
    const { data = {}, validationSchema } = validationData || "";
    let validationRes = validateData(data, validationSchema);
    if (validationRes.error) {
      let errorArray = validationRes?.error?.details || [];

      let allErrorsArray = errorArray.map((item) => {
        return item.message;
      });
      let finalErrors = allErrorsArray?.join(", ");
      throw {
        message: `Validation failed: ${finalErrors}`,
      };
    }
    return true;
  } catch (err: any) {
    console.error(err, "JoiValidationFun function error");
    throw { message: err.message };
  }
};

export const objectIdValidation = Joi.string().custom((value, helpers: any) => {
  if (!ObjectId.isValid(value)) {
    return helpers.message("Invalid MongoDB ObjectId");
  }
  return value;
}, "MongoDB ObjectId");
export const objectIdValidator = (value: string, helpers: any) => {
  if (!ObjectId.isValid(value)) {
    return helpers.message("Invalid MongoDB ObjectId");
  }
  return value;
};
