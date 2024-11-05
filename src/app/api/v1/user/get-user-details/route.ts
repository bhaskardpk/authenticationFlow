// import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {
  ResponseData,
  apiTryCatch,
  getUserDetailAndValidation,
} from "../../../../apiData/utils/apiHelper";
import userService from "@/app/apiData/services/userService";

export const GET = apiTryCatch(async (req: NextRequest) => {
  let { req: request = {}, data = {} } = await getUserDetailAndValidation({
    req,
    validationSchema: null,
  });
  let user = request?.user || "";
  let res;
  const isUserExists = await userService.getUserAllDetails({
    _id: user?._id,
  });

  return ResponseData({
    message: "User data get successfully",
    data: isUserExists,
  });
});
