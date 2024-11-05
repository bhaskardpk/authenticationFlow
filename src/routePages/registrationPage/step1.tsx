import FormLayout from "@/components/form/formLayout";
import JsonForm from "@/components/form/jsonForm";
import React from "react";
import { step1FormJson } from "./formJson";
import { PlacesInput } from "@/components/input/googleAutoComplete";

type StepOneType = {
  children?: React.ReactNode;
  onClick?: (e: any) => void;
};
const StepOne = (props: StepOneType) => {
  const { children, onClick } = props;
  return (
    <FormLayout className="w-full md:w-[440px] max-w-[440px]">
      {/* <PlacesInput /> */}
      <JsonForm onClick={onClick} formJson={step1FormJson}>
        {children}
      </JsonForm>
    </FormLayout>
  );
};

export default StepOne;
