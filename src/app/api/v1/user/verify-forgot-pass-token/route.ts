// import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {
  ResponseData,
  apiThrowError,
  apiTryCatch,
  comparePassword,
  decryptText,
  encryptText,
  getUserDetailAndValidation,
} from "../../../../apiData/utils/apiHelper";
import userService from "@/app/apiData/services/userService";
import { userValidation } from "@/app/apiData/validations";

export const POST = apiTryCatch(async (req: NextRequest) => {
  let { data = {} } = await getUserDetailAndValidation({
    req,
    validationSchema: userValidation.userEmailVarification,
  });
  const { token = "" } = data;
  const tokenData: any = await decryptText(token);
  const isUserExists: any = await userService.findOne({ _id: tokenData?.id });
  if (!isUserExists) {
    apiThrowError("Invalid Token");
  }
  const { _id } = isUserExists;

  return ResponseData({
    message: "Success",
    data: {
      _id,
    },
  });
});
