// import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {
  ResponseData,
  apiThrowError,
  apiTryCatch,
  encryptText,
  getUserDetailAndValidation,
  hashPassword,
} from "../../../../apiData/utils/apiHelper";
import userService from "@/app/apiData/services/userService";
import { userValidation } from "@/app/apiData/validations";
import { sendEmail, userEmailVerificationMail } from "@/app/apiData/email";
import { userAddressService } from "@/app/apiData/services";

// export const POST = apiTryCatch(async (request) => {
//   await dbConnect();
//   console.log(request.body);
//   return ResponseData({
//     message: "test",
//     data: "hiiii",
//   });
//   //   return "GET";
// });

export const POST = apiTryCatch(async (req: NextRequest) => {
  let { data = {} } = await getUserDetailAndValidation({
    req,
    validationSchema: userValidation.userRegistrationValidation,
  });
  let res;
  let hasPassword = await hashPassword(data.password);
  const isUserExists = await userService.findOne({ email: data.email });

  if (isUserExists && isUserExists.completedStep !== 1) {
    apiThrowError("Email already registered.");
  }
  if (isUserExists?.completedStep === 1) {
    res = await userService.findByIdAndUpdate({
      filter: { _id: isUserExists._id },
      update: { password: hasPassword },
    });
  } else {
    res = await userService.create({
      ...data,
      password: hasPassword,
      oldEmail: data.email,
    });
  }

  return ResponseData({
    message: "Created successfully",
    data: res,
  });
});

export const PUT = apiTryCatch(async (req: NextRequest) => {
  let { data = {} } = await getUserDetailAndValidation({
    req,
    validationSchema: userValidation.userUpdateValidation,
  });
  let { id, placeId, ...rest } = data;
  const isUserExists = await userService.findOne({ _id: id });
  if (!isUserExists) {
    apiThrowError("User not exist");
  }
  let res = await userService.findByIdAndUpdate({
    filter: { _id: id },
    update: rest,
  });
  let addressRes = await userAddressService.createAndUpdateAddress({
    userId: id,
    placeId,
  });
  if (addressRes) {
    await userService.findByIdAndUpdate({
      filter: { _id: id },
      update: { addressId: addressRes._id },
    });
  }
  let message = "Update successfully";
  if (res?.emailVerified == false && res.completedStep === 2) {
    const linkToken = await encryptText({ id: id });
    // Verification mail
    await userEmailVerificationMail(res?.email, linkToken);
    message =
      "An email with a verification link has been sent to your email address";
  }

  return ResponseData({
    message: message,
    data: res,
  });
});
