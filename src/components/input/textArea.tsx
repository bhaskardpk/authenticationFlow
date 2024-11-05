import React, { Children } from "react";
import CustomImage from "../image/customImage";
import { IconJson } from "@/images/imagesFile";

type CustomInputProps = {
  label?: string;
  icon?: keyof typeof IconJson; // Ensure icon is a valid key in IconJson
  inputClassName?: string;
  name?: string;
  register?: any;
  children?: React.ReactNode;
  inputRef?: any;
} & React.InputHTMLAttributes<HTMLInputElement>; // Allow all HTML input attributes

const CustomTextArea: React.FC<CustomInputProps> = ({
  label,
  icon,
  inputClassName = "bg-slate-blue w-full h-[70px] rounded-[2px] px-[8px] pl-[36px] pr-[8px]",
  name = "",
  register = () => {},
  type = "text",
  children,
  inputRef = null,
  ...inputProps
}) => {
  return (
    <div className="w-full flex flex-col mb-[30px]">
      {label && <div className="text-[16px] mb-[4px] font-bold">{label}</div>}
      <div className="w-full flex flex-col gap-[10px] relative">
        {icon && IconJson[icon] && (
          <CustomImage
            src={IconJson[icon]}
            className="absolute top-[10px] left-[10px]"
            height={20}
            width={20}
            alt={label || ""}
          />
        )}
        <textarea
          ref={inputRef}
          className={inputClassName}
          type={type}
          name={name}
          id={label}
          {...register}
        />
        {children}
      </div>
    </div>
  );
};

export default CustomTextArea;
