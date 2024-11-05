"use client";
import React, { useRef, useState } from "react";
import CustomInput from "@/components/input/input";
import Leftsection from "@/components/publicPages/leftsection";
import RightSection from "@/components/publicPages/rightSection";
import FormLayout from "@/components/form/formLayout";
import Link from "next/link";
import { paths } from "@/utils/routes";
import JsonForm from "@/components/form/jsonForm";
import { forgotPassFormJson } from "./formJson";
import CustomButton from "@/components/button/customButton";
import { ForgotPasswordEmail, LoginUser } from "@/apiActions/userAction";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

const ForgotPasswordPage = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClick = (e: any) => {
    inputRef.current?.click();
  };

  const Submit = async (e: any) => {
    try {
      const { data = {}, reset = () => {} } = e || "";
      setIsLoading(true);
      let res = await ForgotPasswordEmail(data);
      if (res?.data) {
        reset();
      }
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };
  // await apiCall()
  return (
    <div className="bg-leftSectionImage bg-no-repeat bg-left-top md:bg-[left_90%] bg-deep-purple/50">
      <div className="max-w-[1150px] m-auto">
        <div className="w-full flex flex-col md:flex-row">
          <Leftsection className=" mx-auto border-r-0 md:border-r-[1px]"/>
          <RightSection>
            <div className="w-[344px] mt-[103px] flex-col justify-start items-start gap-4 inline-flex ">
              <div className="justify-start items-center gap-[85px] inline-flex">
                <div className="text-light-gray text-[32px] font-bold leading-10">
                  Forgot Password
                </div>
              </div>

              <FormLayout>
                <JsonForm onClick={Submit} formJson={forgotPassFormJson}>
                  <input type="submit" ref={inputRef} className="hidden" />
                </JsonForm>

                <CustomButton
                  name="Send Email"
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

              <div className="w-[328px] h-[54px] flex-col justify-center items-start gap-2 flex">
                <Link href={paths.public.signUp}>
                  <div className="w-[328px] h-[23px] text-[#99affe] text-base font-normal underline leading-[21.12px]">
                    Create a Snopt Connect account{" "}
                  </div>
                </Link>
                <Link href={paths.public.signIn}>
                  <div className="w-[328px] h-[23px] text-[#99affe] text-base font-normal underline leading-[21.12px]">
                    Login
                  </div>
                </Link>
              </div>
            </div>
          </RightSection>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
