// import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {
  ResponseData,
  apiThrowError,
  apiTryCatch,
  decryptText,
  encryptText,
  getUserDetailAndValidation,
  hashPassword,
} from "../../../../apiData/utils/apiHelper";
import userService from "@/app/apiData/services/userService";
import { userValidation } from "@/app/apiData/validations";
import { sendEmail, userEmailVerificationMail } from "@/app/apiData/email";

export const PUT = apiTryCatch(async (req: NextRequest) => {
  let { data = {} } = await getUserDetailAndValidation({
    req,
    validationSchema: userValidation.userResetForgotPassword,
  });
  const { token = "", password = "" } = data;
  let res = {};
  const tokenData: any = await decryptText(token);
  let hasPassword = await hashPassword(password);
  const isUserExists = await userService.findOne({ _id: tokenData.id });
  if (!isUserExists) {
    apiThrowError("Invalid token");
  }
  if (isUserExists) {
    res = await userService.findByIdAndUpdate({
      filter: { _id: isUserExists._id },
      update: { password: hasPassword },
    });
  }
  return ResponseData({
    message: "Password updated successfully",
    data: res,
  });
});
