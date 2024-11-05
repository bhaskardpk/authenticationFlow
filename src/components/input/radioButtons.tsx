import React from "react";
import { IconJson } from "@/images/imagesFile"; // Assuming your icons are stored here
import CustomImage from "../image/customImage";

type CustomRadioArrayProps = {
  label?: string;
  name: string;
  options: Array<{ value: string; icon: keyof typeof IconJson; label: string }>;
  register?: any;
  selectedValue?: string;
  onChange?: (value: string) => void;
  error?: string;
};

const CustomRadioArray: React.FC<CustomRadioArrayProps> = ({
  label,
  name,
  options,
  register,
  selectedValue = "",
  onChange = () => {},
  error,
}) => {
  return (
    <div className="w-full flex flex-col mb-[30px]">
      {label && <div className="text-[16px] mb-[4px] font-bold">{label}</div>}

      {/* px-4 py-1 bg-slate-blue */}
      <div className="flex flex-wrap gap-[10px]">
        {options.map((option, index) => (
          <label
            key={index}
            className={`flex items-center gap-[8px] cursor-pointer px-[10px] py-[2px] border rounded-[4px] ${
              selectedValue === option.value
                ? " opacity-100 text-bright-pink border-bright-pink"
                : " opacity-50 text-white border-white"
            }`}
          >
            {/* Icon */}
            {IconJson[option?.icon] ? (
              <CustomImage
                src={IconJson[option?.icon]}
                alt={option?.label ?? ""}
                className="h-[24px] w-[24px]"
                height={24}
                width={24}
              />
            ) : (
              <></>
            )}

            {/* Radio Button */}
            <input
              type="radio"
              name={name}
              value={option.value}
              className="hidden"
              checked={selectedValue === option.value}
              // onChange={() => onChange?.(option.value)}
              {...register(name, {
                onChange: (e: any) => onChange && onChange(e.target.value),
              })}
            />
            {/* Label */}
            <span className="font-semibold">{option.label}</span>
          </label>
        ))}
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-[8px]">{error}</p>}
    </div>
  );
};

export default CustomRadioArray;
