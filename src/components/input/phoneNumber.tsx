import React, { Children, useEffect, useState } from "react";
import CustomImage from "../image/customImage";
import { IconJson } from "@/images/imagesFile";
import CountrySelector, { CountryOption } from "./countrySelector";
import { string } from "joi";

type CustomInputProps = {
  label?: string;
  icon?: keyof typeof IconJson; // Ensure icon is a valid key in IconJson
  inputClassName?: string;
  name?: string;
  register?: any;
  children?: React.ReactNode;
  inputRef?: any;
  setValue?: (name: string, value: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>; // Allow all HTML input attributes

const CustomPhoneInput: React.FC<CustomInputProps> = ({
  label,
  icon,
  inputClassName = "bg-slate-blue w-full h-[38px] rounded-[2px] px-[8px] pl-[36px] pr-[8px]",
  name = "",
  register = () => {},
  type = "text",
  children,
  inputRef = null,
  setValue = () => {},
  ...inputProps
}) => {
  const [countryCode, setCountryCode] = useState<CountryOption>({
    label: "+33 FR",
    value: "+33",
  });

  const OnSelectCountry = (value: CountryOption) => {
    setValue("countryCode", value.value);
    setCountryCode(value);
  };

  useEffect(() => {
    setValue("countryCode", countryCode.value);
  }, []);
  console.log(countryCode, "countryCodecountryCodecountryCodecountryCode");

  return (
    <div className="w-full flex flex-col mb-[30px]">
      {label && <div className="text-[16px] mb-[4px] font-bold">{label}</div>}
      <div className="w-full flex flex-col gap-[10px]">
        <div className="flex relative">
          <div className="flex flex-col ">
            {icon && IconJson[icon] && (
              <CustomImage
                src={IconJson[icon]}
                className="absolute top-[10px] left-[10px]"
                height={20}
                width={20}
                alt={label || ""}
              />
            )}

            <div className="flex">
              <CountrySelector
                setCountryCode={OnSelectCountry}
                countryCode={countryCode}
              />
              <input
                ref={inputRef}
                className={inputClassName}
                type={type}
                name={name}
                id={label}
                {...register}
              />
            </div>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};

export default CustomPhoneInput;
