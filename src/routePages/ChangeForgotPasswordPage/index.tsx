"use client";
import React, { useEffect, useRef, useState } from "react";
import CustomInput from "@/components/input/input";
import Leftsection from "@/components/publicPages/leftsection";
import RightSection from "@/components/publicPages/rightSection";
import FormLayout from "@/components/form/formLayout";
import Link from "next/link";
import { paths } from "@/utils/routes";
import JsonForm from "@/components/form/jsonForm";
import { forgotPassFormJson } from "./formJson";
import CustomButton from "@/components/button/customButton";
import {
  LoginUser,
  ResetForgotPassword,
  VrifyForgotPassToken,
} from "@/apiActions/userAction";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useRouter as topLoaderRouter } from 'nextjs-toploader/app';
import {
  getQueryParamsAndURL,
  hideLoader,
  showLoader,
} from "@/utils/frontHelper";

const ChangeForgotPasswordPage = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { push } = topLoaderRouter();
  const [apiRes, setapiRes] = useState<any>(null);
  const [currentToken, setCurrentToken] = useState<null | string>(null);
  const onClick = (e: any) => {
    inputRef.current?.click();
  };

  const checkToken = async (code: string) => {
    try {
      showLoader();
      let verifyResponse: any = await VrifyForgotPassToken({ token: code });
      if (verifyResponse.statusCode === 200) {
        setapiRes(verifyResponse);
      }
    } catch (e) {
      push(paths.public.forgotPassword);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    let code = getQueryParamsAndURL()?.queryParams?.code || "";
    if (code) {
      setCurrentToken(code);
      checkToken(code);
    }
  }, []);

  const Submit = async (e: any) => {
    try {
      const { data = {} } = e || "";
      setIsLoading(true);
      let res = await ResetForgotPassword({ ...data, token: currentToken });
      if (res?.data) {
        push(paths.public.signIn);
      }
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };
  // await apiCall()
  return (
    <div className="bg-leftSectionImage bg-no-repeat bg-left-top md:bg-[left_90%]">
      <div className="max-w-[1150px] m-auto">
        <div className="w-full flex flex-col md:flex-row">
          <Leftsection className=" mx-auto border-r-0 md:border-r-[1px]" />
          <RightSection>
            <div className="w-[344px] mt-[103px] flex-col justify-start items-start gap-4 inline-flex ">
              <div className="justify-start items-center gap-[85px] inline-flex">
                <div className="text-light-gray text-[32px] font-bold leading-10">
                  Change Password
                </div>
              </div>

              <FormLayout>
                <JsonForm onClick={Submit} formJson={forgotPassFormJson}>
                  <input type="submit" ref={inputRef} className="hidden" />
                </JsonForm>

                <CustomButton
                  name="Update"
                  className="pl-4 pr-3 py-2 bg-gradient-to-r from-[#e30e7a] via-[#f971ba] to-[#f740a2] rounded-sm flex items-center gap-1.5 "
                  parentClassName="flex justify-center w-full"
                  onClick={onClick}
                  loading={isLoading}
                >
                  {/* <CustomImage
                    src={IconJson["saveIcon"]}
                    height={20}
                    width={20}
                  /> */}
                </CustomButton>
              </FormLayout>
            </div>
          </RightSection>
        </div>
      </div>
    </div>
  );
};

export default ChangeForgotPasswordPage;
