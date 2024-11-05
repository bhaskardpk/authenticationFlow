// import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {
  GetFullAddressFromGoogleApi,
  ResponseData,
  apiTryCatch,
  getUserDetailAndValidation,
} from "../../../../apiData/utils/apiHelper";
import { userValidation } from "@/app/apiData/validations";

export const GET = apiTryCatch(async (req: NextRequest) => {
  let { data = {} } = await getUserDetailAndValidation({
    req,
    validationSchema: userValidation.userAddressDetails,
  });
  let res = await GetFullAddressFromGoogleApi(data.placeId);
  return ResponseData({
    message: "Get address details successfully.",
    data: res,
  });
});
