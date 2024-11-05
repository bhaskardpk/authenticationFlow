// components/Checkbox.tsx

import React from "react";

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked,
  onChange,
  label,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="form-checkbox h-5 w-5 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500"
      />
      <label htmlFor={id} className="text-white">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
