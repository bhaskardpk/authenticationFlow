import { NextRequest, NextResponse } from "next/server";
import { JoiValidationFun } from "../validations/joiValidation";
import dbConnect from "@/utils/dbConnect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { envValues } from "@/utils/envConfig";
import axios from "axios";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { apiRoutes } from "@/utils/apiRoutes";
import { userService } from "../services";
import { UserModel } from "../models";
import logger from "./logger";
import { JSONConvert } from "@/utils/frontHelper";

type AsyncFunction<T> = (req: NextRequest, ctx?: any) => Promise<T>;

type ErrorDataType = {
  error: any;
};
export const ErrorData = async (response: ErrorDataType) => {
  try {
    const { error } = response || "";
    // logger.error(`Request Error:-${JSON.stringify(error.message)}`);
    return NextResponse.json(
      { statusCode: 400, message: error.message },
      { status: 400 }
    );
  } catch (err: any) {
    apiThrowError(`ErrorData function error Error: ${err.message}`);
  }
};

export const unauthorizedErrorData = async (response: ErrorDataType) => {
  try {
    const { error } = response || "";
    return NextResponse.json(
      { statusCode: 401, message: error.message },
      { status: 401 }
    );
  } catch (err: any) {
    apiThrowError(`ErrorData function error Error: ${err.message}`);
  }
};

export function convertBigIntToString(obj: any) {
  return JSON.parse(
    JSON.stringify(
      obj,
      (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
    )
  );
}

export const ResponseData = async (response: {
  message: string;
  data: any;
}) => {
  try {
    const { message = "", data, ...allData } = response || "";
    return NextResponse.json(
      {
        ...allData,
        statusCode: 200,
        message: message,
        data: convertBigIntToString(data),
      },
      { status: 200 }
    );
  } catch (err) {
    // console.log(err);
    apiThrowError("ResponseData function error");
  }
};
export const apiTryCatch =
  <T>(asyncFunction: AsyncFunction<T>) =>
    async (req: NextRequest, ctx?: any) => {
      try {
        return await asyncFunction(req, ctx);
      } catch (error: any) {
        console.log(error);
        return ErrorData({ error: error });
      }
    };

export const apiThrowError = (message: string, ...inputData: any) => {
  throw { message: message, ...inputData };
};

export function tryCatchFun<T>(asyncFunction: any) {
  return async (request: any) => {
    try {
      return await asyncFunction(request);
    } catch (error: any) {
      // console.log(error);
      throw error;
    }
  };
}

const getHeadersMap = (obj: any = {}) => {
  const symbols = Object.getOwnPropertySymbols(obj);
  const headersListSymbol = symbols?.find(
    (sym) => sym?.toString() === "Symbol(headers list)"
  );
  if (!headersListSymbol) return null;
  const headersList = obj[headersListSymbol];
  const headersMapSymbol = Object.getOwnPropertySymbols(headersList)?.find(
    (sym) => sym.toString() === "Symbol(headers map)"
  );

  return headersMapSymbol ? headersList[headersMapSymbol] : obj;
};

const checkIsApiProtected = async (header: any, req: NextRequest) => {
  try {
    let requestedApi = req?.url;
    let protectedApis = Object.values(apiRoutes?.private || {});
    let findApiUrl = protectedApis?.find((url: string) => {
      return requestedApi?.includes(url);
    });
    await dbConnect();
    if (!findApiUrl) {
      return;
    }
    if (!header?.authorization) {
      apiThrowError("Authorization token missing");
    }
    let token = header?.authorization?.split("Bearer")[1];
    const tokenData: any = await decryptText(token);
    if (!tokenData) {
      apiThrowError("Invalid Token");
    }
    let getUserDetails: any = await userService.findOne({
      _id: tokenData?._id,
    });
    if (!getUserDetails) {
      apiThrowError("Invalid Token");
    }
    if (!getUserDetails?.emailVerified) {
      apiThrowError("Please verify your email first");
    }
    return getUserDetails;
  } catch (err) {
    throw err;
  }
};
const middleware = async (req: any) => {
  try {
    let token = req.headers;

    const authorizationValue =
      token["authorization"] || token.get("authorization");

    let headerObject: any = {};
    if (authorizationValue) {
      headerObject.authorization = authorizationValue;
    } else {
      let obj = { ...token };
      const headersMap = getHeadersMap(obj);
      if (headersMap) {
        headersMap?.forEach((value: { value: string }, key: string) => {
          headerObject[key] = value.value;
        });
      }
    }
    let res = await checkIsApiProtected(headerObject, req);
    return res;
  } catch (err) {
    throw err;
  }
};

export const getUserDetailAndValidation = async ({
  req,
  validationSchema,
  isFormData = false,
}: {
  req: NextRequest | any;
  validationSchema?: any;
  isFormData?: boolean;
}) => {
  try {
    let tokenData = await middleware(req);
    if (tokenData) {
      req["user"] = tokenData;
    }
    let requestData: any = {};
    let requestTypeArray = ["GET", "DELETE"];
    let methodType = req?.method;
    if (!requestTypeArray?.includes(methodType)) {
      try {
        if (isFormData) {
          let data = await req.formData();
          let newArray = [...data];
          if (newArray?.length > 0) {
            let newObject: any = {};
            newArray?.forEach(([key, value]: string[], index: number) => {
              newObject[key] = value;
            });
            requestData = { ...newObject };
          }
        } else {
          requestData = await req?.json();
        }
      } catch (e) {
        requestData = {};
      }
    } else {
      requestData = GetApiQueryPerams({
        request: req,
      });
    }
    // logger.info(`Request Data:-${JSON.stringify(requestData)}`);
    // check validation
    if (validationSchema) {
      await JoiValidationFun({ data: requestData, validationSchema });
    }
    let newData = { req: req, data: requestData };

    return newData;
  } catch (err: any) {
    throw {
      message: err?.message ? err.message : `Something went wrong`,
    };
  }
};

export const decryptText = async (token: string) => {
  try {
    const data: any = await jwt.verify(
      token?.trim(),
      envValues.NEXT_PUBLIC_JWT_KEY || ""
    );
    // @ts-ignore
    if (!data) {
      apiThrowError("Invalid token");
    }
    return data;
  } catch (err) {
    console.log(err, "decryptText function error");
    apiThrowError("Invalid token");
  }
};
// This will encrypt givien data (object) using JWT - return encrypted string
export const encryptText = async (data: object, expiresIn: string = "7d") => {
  const token = jwt.sign(data, envValues.NEXT_PUBLIC_JWT_KEY || "", {
    expiresIn,
  });
  return token;
};

// This will create a hash of password - return hashed string
export const hashPassword = async (password: string) => {
  let hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

// This will compare a hashed and unhashed password - return boolean
export const comparePassword = async (data: {
  passRecieved: string;
  passInDB: string;
}) => {
  const { passRecieved, passInDB } = data || "";
  return await bcrypt.compare(passRecieved, passInDB);
};

export const GetFullAddressFromGoogleApi = tryCatchFun(
  async (placeId: string) => {
    let placeDetails: any = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${envValues.NEXT_PUBLIC_GOOGLE_PLACE_KEY}`
    );
    return placeDetails?.data;
  }
);

export const GetApiQueryPerams = ({ request = {} }: { request: any }) => {
  try {
    let queryPrams = request?.nextUrl;
    const searchParams = new URLSearchParams(queryPrams?.search);
    const result: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
      result[key] = value;
    });

    return result;
  } catch (err) {
    console.log("GetQueryPerams api function errror", err);
  }
};

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));