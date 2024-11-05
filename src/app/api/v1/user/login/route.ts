// import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {
  ResponseData,
  apiThrowError,
  apiTryCatch,
  comparePassword,
  encryptText,
  getUserDetailAndValidation,
} from "../../../../apiData/utils/apiHelper";
import userService from "@/app/apiData/services/userService";
import { userValidation } from "@/app/apiData/validations";

export const POST = apiTryCatch(async (req: NextRequest) => {
  let { data = {} } = await getUserDetailAndValidation({
    req,
    validationSchema: userValidation.userLoginValidation,
  });
  const { email = "", password = "" } = data;
  const isUserExists: any = await userService.findOne({ email: email });

  if (isUserExists) {
    if (!isUserExists?.emailVerified) {
      apiThrowError("Please verify your email first");
    }
  }
  let isEqual = await comparePassword({
    passRecieved: password,
    passInDB: isUserExists?.password || "",
  });
  if (!isEqual) {
    apiThrowError("Incorrect email or password.");
  }
  const { _id, firstName, lastName, phone, avatar } = isUserExists;
  const token = await encryptText({ _id, firstName, lastName, phone, avatar });
  // Login Success
  return ResponseData({
    message: "Logged in successfully.",
    data: {
      token,
      _id,
      email,
      firstName,
      lastName,
      phone,
      avatar,
    },
  });
});
