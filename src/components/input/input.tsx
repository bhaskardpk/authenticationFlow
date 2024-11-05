// import React, { Children } from "react";
// import CustomImage from "../image/customImage";
// import { IconJson } from "@/images/imagesFile";

// type CustomInputProps = {
//   label?: string;
//   icon?: keyof typeof IconJson; // Ensure icon is a valid key in IconJson
//   inputClassName?: string;
//   name?: string;
//   register?: any;
//   children?: React.ReactNode;
//   inputRef?: any;
//   readonly?: boolean;
//   isOptional?: boolean;
//   placeholder?: string;
// } & React.InputHTMLAttributes<HTMLInputElement>; // Allow all HTML input attributes

// const CustomInput: React.FC<CustomInputProps> = ({
//   label,
//   icon,
//   inputClassName = "bg-slate-blue w-full h-[38px] rounded-[2px] px-[8px] pl-[36px] pr-[8px]",
//   name = "",
//   register = () => {},
//   type = "text",
//   children,
//   inputRef = null,
//   readonly = false,
//   isOptional = false,
//   placeholder = "",
//   value = "",
//   ...inputProps
// }) => {
//   return (
//     <div className="w-full flex flex-col mb-[30px]">
//       <div className="flex justify-between">
//         {label && <div className="text-[16px] mb-[4px] font-bold">{label}</div>}
//         {isOptional && <div className="text-[12px] font-bold">Optional</div>}
//       </div>

//       <div className="w-full flex flex-col gap-[10px] relative">
//         {icon && IconJson[icon] && (
//           <CustomImage
//             src={IconJson[icon]}
//             className="absolute top-[10px] left-[10px]"
//             height={20}
//             width={20}
//             alt={label || ""}
//           />
//         )}

//         <input
//           ref={inputRef}
//           className={inputClassName}
//           type={type}
//           name={name}
//           id={label}
//           placeholder={placeholder}
//           readOnly={readonly}
//           {...register}
//         />

//         {children}
//       </div>
//     </div>
//   );
// };

// export default CustomInput;

import React, { useState } from "react";
import CustomImage from "../image/customImage";
import { IconJson } from "@/images/imagesFile";

type CustomInputProps = {
  label?: string;
  icon?: keyof typeof IconJson;
  inputClassName?: string;
  name?: string;
  register?: any;
  children?: React.ReactNode;
  inputRef?: any;
  readonly?: boolean;
  isOptional?: boolean;
  placeholder?: string;
  isPassword?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  icon,
  inputClassName = "bg-slate-blue w-full h-[38px] rounded-[2px] px-[8px] pl-[36px] pr-[8px]",
  name = "",
  register = () => { },
  type = "text",
  children,
  inputRef = null,
  readonly = false,
  isOptional = false,
  placeholder = "",
  value = "",
  isPassword = false, // New prop for password field
  disabled,
  ...inputProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full flex flex-col mb-[30px]">
      <div className="flex justify-between">
        {label && <div className="text-[16px] mb-[4px] font-bold">{label}</div>}
        {isOptional && <div className="text-[12px] font-bold">Optional</div>}
      </div>

      <div className={`w-full flex flex-col gap-[10px] relative ${disabled ? ' cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
        {icon && IconJson[icon] && (
          <CustomImage
            src={IconJson[icon]}
            className="absolute top-[10px] left-[10px]"
            height={20}
            width={20}
            alt={label || ""}
          />
        )}

        <input
          ref={inputRef}
          className={inputClassName}
          type={isPassword && showPassword ? "text" : type} // Toggle between "text" and "password"
          name={name}
          id={label}
          placeholder={placeholder}
          readOnly={readonly}
          {...register}
          {...inputProps}
        />

        {isPassword && (
          <div
            className="absolute top-[10px] right-[10px] cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            <CustomImage
              src={showPassword ? IconJson.eyeShowIcon : IconJson.eyeHideIcon}
              height={20}
              width={20}
              alt="Show hide password"
            />
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export default CustomInput;
