"use client";
import React, { Children, ReactNode } from "react";
import SpinnerLoader from "../loader/SpinnerLoader";

export type IButtonType = "button" | "submit" | "reset" | undefined;

type CustomButtonType = {
  name: string;
  className?: string;
  parentClassName?: string;
  children?: ReactNode;
  onClick?: (e: any) => void;
  loading?: boolean;
  disabled?: boolean;
  buttonType?: IButtonType
};
const CustomButton = (props: CustomButtonType) => {
  const {
    name = "",
    className = "",
    children = "",
    parentClassName = "",
    onClick = () => { },
    loading = false,
    disabled = false,
    buttonType = 'button'
  } = props;
  return (
    <div className={` ${parentClassName}`}>
      <button
        disabled={loading || disabled}
        onClick={onClick}
        className={`flex  justify-center items-center h-[37px] gap-2 py-[8px] px-[16px] rounded disabled:cursor-not-allowed disabled:opacity-50 ${className} ${loading ? "min-w-[120px]" : ""
          }`}
        type={buttonType}
      >
        {loading === true ? (
          <p className="flex justify-center text-light-gray">
            <SpinnerLoader isPageLoader={false} />
          </p>
        ) : (
          <span className="truncate">{name}</span>
        )}
        {!loading ? children : ""}
      </button>
    </div>
  );
};

export default CustomButton;
