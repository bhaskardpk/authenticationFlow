import React, { useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import Calendar, { CalendarProps } from "react-calendar";
import { Transition } from "@headlessui/react";

interface CalendarInputProps extends UseControllerProps {
  label: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  mode?: "year" | "date";
}

const CalendarInput: React.FC<CalendarInputProps> = ({
  label,
  className,
  placeholder = "Select Date",
  disabled,
  mode = "date",
  ...controllerProps
}) => {
  const { field, fieldState } = useController(controllerProps);
  const [showCalendar, setShowCalendar] = useState(false);

  // Handle selection and closing the calendar popover
  const handleDateChange: CalendarProps["onChange"] = (value) => {
    // Handle null or array of dates; in our case, we're only dealing with a single date
    if (value instanceof Date) {
      field.onChange(value);
    }
    setShowCalendar(false); // Close calendar after selection
  };

  // Convert field.value to a Date if it’s a string, otherwise keep it as Date
  const getFormattedDate = (
    value: Date | string | null,
    mode: "year" | "date"
  ): string => {
    if (!value) return "";

    // If it's a string, try to convert it to a Date object
    const dateValue = typeof value === "string" ? new Date(value) : value;
  
    // Check if the dateValue is a valid Date object
    if (dateValue instanceof Date && !isNaN(dateValue.getTime())) {
      // Return the year if the mode is "year", otherwise return the formatted date
      return mode === "year"
        ? dateValue.getFullYear().toString()
        : dateValue.toLocaleDateString();
    }
  
    // Return an empty string if the value is not a valid Date
    return "";
  };
  console.log("field", field);

  return (
    <div className={`relative w-full mb-[30px] ${className}`}>
      <label className="text-lg font-semibold mb-2 text-gray-800">
        {label}
      </label>

      {/* Input field to trigger the calendar */}
      <input
        type="text"
        value={getFormattedDate(field.value, mode)}
        onClick={() => setShowCalendar(!showCalendar)}
        readOnly
        placeholder={placeholder}
        className="w-full bg-slate-blue p-2 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-neon-pink bg-dark-navy text-white"
        disabled={disabled}
      />

      {/* Calendar dropdown with transitions */}
      <Transition
        show={showCalendar}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-2"
      >
        <div className="absolute z-10 mt-2 w-full max-w-xs bg-deep-purple border border-slate-blue shadow-lg rounded-md text-white">
          <Calendar
            onChange={handleDateChange}
            value={field.value}
            view={mode === "year" ? "decade" : "month"} // Show year selector or full calendar
            maxDetail={mode === "year" ? "decade" : "month"} // Limit view based on mode
            minDetail={mode === "year" ? "decade" : "month"}
            className="p-4 rounded-md bg-dark-navy text-white"
            tileClassName="text-white"
            showNeighboringMonth={false}
            showNeighboringDecade={false}
          />
        </div>
      </Transition>

      {/* Error message */}
      {fieldState.error && (
        <span className="text-coral-red text-xs mt-1">
          {fieldState?.error?.message}
        </span>
      )}
    </div>
  );
};

export default CalendarInput;
