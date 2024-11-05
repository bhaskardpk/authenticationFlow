import { NextRequest } from "next/server";
import {
  ResponseData,
  apiThrowError,
  apiTryCatch,
  encryptText,
  getUserDetailAndValidation,
} from "../../../../apiData/utils/apiHelper";
import userService from "@/app/apiData/services/userService";
import { userValidation } from "@/app/apiData/validations";
import { userForgotPasswordMail } from "@/app/apiData/email";

export const POST = apiTryCatch(async (req: NextRequest) => {
  let { data = {} } = await getUserDetailAndValidation({
    req,
    validationSchema: userValidation.userForgotPassVarification,
  });
  const { email = "" } = data;
  const isUserExists = await userService.findOne({ email: email });

  if (!isUserExists) {
    apiThrowError("Email not found");
  }
  let token = "";
  if (!isUserExists?.emailVerified) {
    apiThrowError("Please verify your email first");
  } else {
    const { _id, firstName, lastName, phone, avatar } = isUserExists;
    token = await encryptText(
      {
        id: _id,
        firstName,
        lastName,
        phone,
        avatar,
        email,
      },
      "1h"
    );
    await userForgotPasswordMail(isUserExists?.email, token);
  }
  return ResponseData({
    message: "An email with reset password link sent to your email address",
    data: { email, token },
  });
});
