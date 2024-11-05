import React from "react";
type RadioButtonType = {
  activeColor?: string;
  inactiveColor?: string;
  isActive: boolean;
};
const RadioButton = (props: RadioButtonType) => {
  const {
    isActive = false,
    activeColor = "bg-light-gray",
    inactiveColor = "",
  } = props || "";
  return isActive ? (
    <div
      className={`w-3.5 h-3.5 relative ${activeColor} rounded-[7px] border-4 border-muted-purple`}
    />
  ) : (
    <div className="w-3.5 h-3.5 relative  rounded-[7px] border-4 border-muted-purple" />
  );
};

export default RadioButton;
