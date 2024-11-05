"use client";
import CustomButton from "@/components/button/customButton";
import FormLayout from "@/components/form/formLayout";
import CustomImage from "@/components/image/customImage";
import CustomInput from "@/components/input/input";
import Leftsection from "@/components/publicPages/leftsection";
import RightSection from "@/components/publicPages/rightSection";
import { IconJson, PersonImage } from "@/images/imagesFile";
import React, { useRef, useState } from "react";
import StepOne from "./step1";
import StepTwo from "./step2";
import StepThree from "./step3";
import StepFour from "./step4";
import Link from "next/link";
import { paths } from "@/utils/routes";
import { Registration, UpdateUserDetails } from "@/apiActions/userAction";
import { useRouter as topLoaderRouter } from 'nextjs-toploader/app';

type formDataType = {
  email: string;
  password: string;
  phoneNumber: string;
  userName: string;
  firstName: string;
  lastName: string;
  address: string;
  DOB: string;
  _id?: string;
};

interface RegistrationStep {
  component: React.ComponentType<any>;
  heading: string;
  SubHeading?: string;
}

interface RegistrationStepsType {
  [key: string]: RegistrationStep;
}

const RegistrationPage = () => {
  const [selectedStep, setSelectedStep] = useState<string>("1");
  let formDataValues = {
    email: "",
    password: "",
    phoneNumber: "",
    userName: "",
    firstName: "",
    lastName: "",
    address: "",
    DOB: "",
    _id: "",
  };
  const [formData, setFormData] = useState<formDataType>({
    ...formDataValues,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { push } = topLoaderRouter();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const RegistrationSteps: RegistrationStepsType = {
    "1": {
      component: StepOne,
      heading: "Sign up - Step 1/4",
    },
    "2": {
      component: StepTwo,
      heading: "Sign up - Step 2/4",
    },
    "3": {
      component: StepThree,
      heading: "Choose at least one subscription - Step 3/4",
    },
    "4": {
      component: StepFour,
      heading: "Sign up - Step 4/4",
      SubHeading: "Add a payment method - Step 4/4",
    },
  };

  const SetNextStep = () => {
    if (inputRef?.current) {
      inputRef?.current?.click();
    }
  };

  const SetPreStep = () => {
    if (selectedStep === "1") return;
    setSelectedStep((prev) => (parseInt(prev) - 1).toString());
  };

  const OnSubmit = async (e: any) => {
    try {
      setIsLoading(true);
      const { data: inputformData, isError } = e || "";
      if (e?.isError) {
        return;
      }
      let data = { ...inputformData };
      // setFormData((prev) => data);
      // e.setValue(formData);
      if (selectedStep === "4") return;
      let res = null;
      if (selectedStep === "1") {
        res = await Registration({
          ...(data || {}),
          completedStep: Number(selectedStep),
        });
      } else {
        let formSendData = {
          ...(data || {}),
          completedStep: Number(selectedStep),
          id: formData?._id,
        };
        res = await UpdateUserDetails(formSendData);
        if (res) {
          setFormData({ ...formDataValues });
          push(paths.public.signIn);
        }
      }
      if (res) {
        setFormData({ ...formData, _id: res?.data?._id });
        setSelectedStep((prev) => (parseInt(prev) + 1).toString());
      }
      // e.reset();
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  let SelectedStep = RegistrationSteps[selectedStep]?.component;
  let Heading = RegistrationSteps[selectedStep]?.heading;
  let SubHeading = RegistrationSteps[selectedStep]?.SubHeading || "";

  return (
    <div className="bg-rightSectionImage bg-no-repeat bg-right-top md:bg-[right_90%]">
      <div className="max-w-[1150px] m-auto">
        <div className="w-full flex flex-col md:flex-row">
          <RightSection>
            <div className="mt-12 md:mt-[103px] flex-col justify-start items-start gap-4 inline-flex ">
              <div className="justify-start items-center gap-[85px] inline-flex">
                <div className="text-light-gray text-[32px] font-bold leading-10">
                  {Heading}
                  {/* {SubHeading} */}
                  <div className="w-[251px] h-[75px] pt-2 text-white font-normal text-base text-[16px] leading-normal">
                    * All fields are required.
                  </div>
                </div>
              </div>
              <SelectedStep onClick={OnSubmit}>
                <input type="submit" ref={inputRef} className="hidden" />
              </SelectedStep>
              <div className="w-full flex justify-end max-w-[440px]">
                <div className="flex w-[90%]">
                  {selectedStep !== "1" && (
                    <CustomButton
                      name="Previous step"
                      className="text-[16px] hiden font-semibold border-1 border-solid border-gradient border-[2px] border-[solid] border-gradient "
                      parentClassName="flex justify-center w-full"
                      onClick={SetPreStep}
                    ></CustomButton>
                  )}

                  <CustomButton
                    name="Save and continue"
                    className="pl-4 pr-3 py-2  bg-gradient-to-r from-[#e30e7a] via-[#f971ba] to-[#f740a2] rounded-sm flex items-center gap-1.5 "
                    parentClassName="flex justify-end w-full"
                    onClick={SetNextStep}
                    loading={isLoading}
                  >
                    <CustomImage
                      src={IconJson.saveIcon}
                      height={20}
                      width={20}
                    />
                  </CustomButton>
                </div>
              </div>

              <div className="w-[328px] h-[54px] flex-col justify-center items-start gap-2 flex">
                {selectedStep == "1" ? (
                  <Link href={paths.public.signIn}>
                    <div className="w-[328px] h-[23px] text-[#99affe] text-base font-normal underline leading-[21.12px]">
                      I already have an account, sign in
                    </div>
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </div>
          </RightSection>
          <Leftsection className="mx-auto border-l-0 md:border-l-[1px] -order-1 md:order-last" />
        </div>
      </div>
    </div>
  );
};
export default RegistrationPage;
