import FormLayout from "@/components/form/formLayout";
import JsonForm from "@/components/form/jsonForm";
import CustomInput from "@/components/input/input";
import React from "react";
import { step2FormJson } from "./formJson";

type StepTwoType = {
  children?: React.ReactNode;
  onClick?: (e: any) => void;
};
const StepTwo = (props: StepTwoType) => {
  const { children, onClick } = props;

  return (
    <div>
      <FormLayout className="w-full md:w-[440px] max-w-[440px] px-4">
        <JsonForm onClick={onClick} formJson={step2FormJson}>
          {children}
        </JsonForm>
        <div className="self-stretch h-[37px] flex-col justify-start items-center gap-2.5 flex"></div>
      </FormLayout>
    </div>
  );
};

export default StepTwo;
