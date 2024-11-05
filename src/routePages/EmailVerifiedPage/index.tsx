"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { VerifyEmail } from "@/apiActions/userAction";
import { paths } from "@/utils/routes";
import CustomButton from "@/components/button/customButton";
import Link from "next/link";
import Image from "next/image";
import { IconJson, successImage } from "@/images/imagesFile";
import CustomImage from "@/components/image/customImage";
import { getQueryParamsAndURL } from "@/utils/frontHelper";
import throttle from "lodash.throttle";

const EmailVerifiedPage = () => {
  const [isloading, setIsloading] = useState<boolean>(false);
  const [apiRes, setapiRes] = useState<any>(null);

  const checkToken = async (code: string) => {
    try {
      setIsloading(true);
      let verifyResponse: any = await VerifyEmail({ token: code });
      if (verifyResponse.statusCode === 200) {
        setapiRes(verifyResponse);
        // toast.success(verifyResponse?.message);
      }
    } catch (e) {
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    console.log(isloading, "isloadingisloadingisloadingisloadingisloading");
    const verifyEmail = async () => {
      const code = getQueryParamsAndURL()?.queryParams?.code || "";
      if (code) {
        await checkToken(code);
      }
    };

    verifyEmail();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="max-w-md bg-white shadow-md rounded-lg p-6 align-center">
          {apiRes && (
            <CustomImage
              src={IconJson.successImage}
              alt="success image"
              height={200}
              width={200}
            />
          )}

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Email Verification
          </h1>
          <p className="text-gray-700 mb-4">
            {isloading
              ? "Verifying your email..."
              : apiRes
              ? "Email Verification success"
              : "Someting Went wrong"}
          </p>
          {!isloading && (
            <Link href={paths.public.signIn} className="">
              <CustomButton
                name="Login"
                className="bg-gradient-to-r from-[#E30E7A] via-[#F971BA] to-[#F740A2] text-[16px] font-semibold"
                // parentClassName="justify-center"
              />
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export { EmailVerifiedPage };
