// import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {
  GetFullAddressFromGoogleApi,
  ResponseData,
  apiThrowError,
  apiTryCatch,
  getUserDetailAndValidation,
} from "../../../../apiData/utils/apiHelper";
import subscriptionsService from "@/app/apiData/services/subscriptionsService";
import reportService from "@/app/apiData/services/reportService";
import {
  reportQuestionValidation,
  reportValidation,
} from "@/app/apiData/validations";
import { reportQuestionService } from "@/app/apiData/services";

export const PUT = apiTryCatch(
  async (req: NextRequest, { params }: { params: { _id: string } }) => {
    let { data = {}, req: request } = await getUserDetailAndValidation({
      req,
      validationSchema:
        reportQuestionValidation.updateReportQuestionDataValidation,
    });
    const { _id } = params;
    let res = await reportQuestionService.findByIdAndUpdate({
      filter: { _id: _id },
      update: data,
    });

    return ResponseData({
      message: "Question saved successfully.",
      data: res,
    });
  }
);
