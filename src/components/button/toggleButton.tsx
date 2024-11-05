import React, { useState } from "react";
import CustomImage from "../image/customImage";
import { IconJson } from "@/images/imagesFile";

interface ToggleButtonProps {
  isOn?: boolean; // Optional initial state
  onToggle?: (isOn: boolean) => void; // Callback when toggled
  className?: string; // Custom class names for additional styling
  onColor?: string; // Hex color when toggled on
  offColor?: string; // Hex color when toggled off
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  isOn = false,
  onToggle,
  className = "",
  onColor = "", // Default color for ON state
  offColor = "", // Default color for OFF state
}) => {
  const [isToggled, setIsToggled] = useState(isOn);

  const handleClick = () => {
    const newState = !isToggled;
    setIsToggled(newState);
    if (onToggle) onToggle(newState);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: isToggled ? onColor : offColor,
      }}
      className={`flex justify-center items-center p-2 rounded-full shadow-md transition-transform duration-300 transform ${""
        } ${className}`}
      aria-label="Toggle button"
    >
      <CustomImage
        className={`transition-transform duration-300 ${isToggled ? "" : "rotate-180"
          }`}
        src={IconJson.stoggleRightIcon}
        alt="Toggle icon"
        height={40}
        width={40}
      />
    </button>
  );
};

export default ToggleButton;
