import { userService } from "@/app/apiData/services";
import {
  apiThrowError,
  apiTryCatch,
  decryptText,
  getUserDetailAndValidation,
  ResponseData,
} from "@/app/apiData/utils/apiHelper";
import { userValidation } from "@/app/apiData/validations";
import { NextRequest } from "next/server";

export const POST = apiTryCatch(async (req: NextRequest) => {
  let { data = {} } = await getUserDetailAndValidation({
    req,
    validationSchema: userValidation.userEmailVarification,
  });
  const { token } = data;
  const tokenData: any = await decryptText(token);

  const { id, newEmail, currentEmail } = tokenData || "";

  let isUserExists = null;
  if (tokenData?.newEmail) {
    isUserExists = await userService.findByIdAndUpdate({
      filter: { _id: id },
      update: {
        oldEmail: currentEmail,
        email: newEmail,
        emailChangeAt: new Date(),
      },
    });
  } else {
    isUserExists = await userService.findByIdAndUpdate({
      filter: tokenData?.id,
      update: { emailVerified: true },
    });
  }

  if (!isUserExists) {
    apiThrowError("User not found");
  }
  return ResponseData({
    message: "Email verify successfully",
    data: tokenData,
  });
});
