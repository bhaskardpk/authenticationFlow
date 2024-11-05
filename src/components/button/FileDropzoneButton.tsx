import { IconJson } from "@/images/imagesFile";
import React, { useRef, useState } from "react";
import CustomImage from "../image/customImage";
import { UploadFile } from "@/apiActions/uploadFile";
import { getFullImagePath, hideLoader, showLoader } from "@/utils/frontHelper";
import CustomInput from "../input/input";

type CustomInputProps = {
  label?: string;
  icon?: keyof typeof IconJson; // Ensure icon is a valid key in IconJson
  inputClassName?: string;
  name?: string;
  register?: any;
  children?: React.ReactNode;
  control?: any;
  setValue?: (value: string, value2: any) => void;
  value?: any;
  handleSubmit?: null;
  isSmallArea?: boolean;
  accept?: string;
  saveInFormOnly?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>; // Allow all HTML input attributes

const FileDropzone: React.FC<CustomInputProps> = ({
  label,
  icon,
  inputClassName = "bg-slate-blue w-full h-[38px] rounded-[2px] px-[8px] pl-[36px] pr-[8px] hidden",
  name = "",
  register = () => { },
  type = "file",
  control = null,
  children,
  setValue = () => { },
  handleSubmit = null,
  value = "",
  isSmallArea = false,
  className = "",
  accept,
  saveInFormOnly,
  ...inputProps
}) => {

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploadRes, setUploadRes] = useState<any>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const setFile = () => {
    if (inputRef?.current) {
      inputRef?.current?.click();
    }
  };

  const onChange = async (e: any) => {
    try {
      showLoader();
      let file = e?.target?.files[0];

      if (!file) {
        return;
      }

      if (saveInFormOnly) {
        // Set the file in the form
        setValue(name, file);

        // Create a preview URL
        const fileUrl = URL.createObjectURL(file);
        setPreviewUrl(fileUrl);
      } else {
        const formData = new FormData();
        formData.append("files", file);
        let res = await UploadFile(formData);
        if (res?.data) {
          setUploadRes(res?.data);
          setValue(name, res?.data?.filePath);
        }
      }

    } catch (e) {
    } finally {
      hideLoader();
      e.target.value = "";
    }
  };

  return (
    <>
      {label && <div className="text-[16px] mb-[4px] font-bold">{label}</div>}
      <div
        className={`cursor-pointer w-full h-auto px-4 py-6 bg-slate-blue rounded-sm border border-muted-purple flex flex-col items-center gap-4 ${className}`}
        onClick={() => setFile()}
      >
        {(value || previewUrl) ? (
          <CustomImage
            src={previewUrl || getFullImagePath(value ?? '')}
            className={`top-[10px] left-[10px] max-w-[200px] ${isSmallArea ? "max-h-[40px]" : ""
              } `}
            height={isSmallArea ? 40 : 80}
            width={isSmallArea ? 40 : 80}
            alt={label || ""}
          />
        ) : <></>}
        {icon && IconJson[icon] && !value && (
          <CustomImage
            src={IconJson[icon] ?? ''}
            className="top-[10px] left-[10px]"
            height={20}
            width={20}
            alt={label || ""}
          />
        )}
        <input
          {...inputProps}
          ref={(e) => {
            inputRef.current = e;
          }}
          onChange={onChange}
          className={inputClassName}
          type={type}
          name={name}
          id={label}
          accept={accept}
        // value={value}
        />
        {!value && !previewUrl &&
          (!isSmallArea ? (
            <>
              <div className="text-center text-light-gray text-base font-normal">
                {`Drop your ${accept?.includes('image/') ? 'Image' : 'File'} here.`}
              </div>
              <div className="text-center text-[#aaaace] text-sm font-normal">
                Or click to select it from your device.
              </div>
            </>
          ) : (
            <>
              <div className="w-full flex"></div>
            </>
          ))}
        {children}
      </div>
    </>
  );
};

export default FileDropzone;
