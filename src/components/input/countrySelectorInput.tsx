import React, { useMemo } from "react";
import Select, { SingleValue, StylesConfig } from "react-select";
import { useController, Control, FieldValues } from "react-hook-form";
import { countryPhoneCodes } from "./countrySelector";

// Define the CountryOption type
export interface CountryOption {
  label: string;
  value: string;
}

const countryNamesAndCodes = countryPhoneCodes.map((val) => {
  return { label: val.label, value: val?.code };
});

// Define the custom styles for react-select
const customStyles: StylesConfig<CountryOption, false> = {
  control: (provided) => ({
    ...provided,
    width: "100%",
    backgroundColor: "#303054",
    color: "white",
    border: "none",
    boxShadow: "none",
    "&:hover": {
      border: "none",
    },
    "& input": {
      color: "white",
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#303054",
    color: "white",
  }),
  menuList: (provided) => ({
    ...provided,
    backgroundColor: "#303054",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#333" : "#303054",
    color: "white",
    "&:hover": {
      backgroundColor: "#333",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "white",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
  }),
  input: (provided) => ({
    ...provided,
    color: "#b8b7b6",
  }),
};

// Define the props type for the CountrySelectorInput component
type CountrySelectorProps = {
  name: string;
  control: Control<FieldValues>; // React Hook Form control
  placeHolderName?: string;
  label?: string;
};

// Define the CountrySelectorInput component
const CountrySelectorInput: React.FC<CountrySelectorProps> = ({
  name,
  control,
  placeHolderName = "Select Country",
  label = "Country",
}) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: "", // Set default value
  });

  // Memoize options
  const memoizedOptions = useMemo(() => {
    return countryNamesAndCodes;
  }, [countryNamesAndCodes]);

  const handleChange = (selectedOption: SingleValue<CountryOption>) => {
    onChange(selectedOption?.value); // Pass the selected option to react-hook-form
  };

  return (
    <div className="relative w-full">
      {label && <label className="text-white font-semibold">{label}</label>}
      <Select
        options={memoizedOptions}
        value={memoizedOptions.find((opt) => opt.value === value)}
        onChange={handleChange}
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
        isSearchable
        placeholder={placeHolderName}
        styles={customStyles}
      />
      {error && <span className="text-red">{error.message}</span>}
    </div>
  );
};

export default CountrySelectorInput;
