import FormLayout from "@/components/form/formLayout";
import JsonForm from "@/components/form/jsonForm";
import CustomInput from "@/components/input/input";
import React from "react";
type StepFourType = {
  children?: React.ReactNode;
  onClick?: (e: any) => void;
};
const StepFour = (props: StepFourType) => {
  const { children, onClick } = props;
  return (
    <FormLayout className="w-[440px] h-auto">
      <JsonForm onClick={onClick} formJson={{}}>
        <CustomInput label="Card Holder" icon="frameIcon" />
        <CustomInput label="Card Number" icon="cardIcon" />
        <div className="self-stretch h-[37px] justify-start items-center gap-2.5 flex mt-6 ">
          <div className="flex gap-5 justify-around">
            <CustomInput
              label="Date"
              icon="calendarIcon"
              inputClassName="bg-slate-blue w-[150px] h-[38px] rounded-[2px] px-[8px] pl-[36px] pr-[8px]"
            />
            <CustomInput
              label="cvv"
              icon="lockIcon"
              inputClassName="bg-slate-blue w-[150px] h-[38px] rounded-[2px] px-[8px] pl-[36px] pr-[8px]"
            />
          </div>
        </div>
        {children}
      </JsonForm>
    </FormLayout>
  );
};

export default StepFour;
