import { IReportJson } from "@/routePages/createReportPage/prepration/preparationQuestionJson";
import { envValues } from "./envConfig";

export const getQueryParamsAndURL = ():
  | {
    currentUrl: string;
    queryParams: Record<string, string>;
  }
  | undefined => {
  if (typeof window === "undefined") {
    return undefined;
  }
  const queryString = window?.location?.search;
  const pathname = window?.location?.pathname;

  const params = new URLSearchParams(queryString);
  const queryParams: Record<string, string> = {};

  params.forEach((value, key) => {
    queryParams[key] = value;
  });

  let newObject = {
    currentUrl: pathname,
    queryParams,
  };

  return newObject;
};

const validateDate = (dateString: string): true | string => {
  // Regular expression to check the format
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

  if (!regex.test(dateString)) {
    return "Invalid date format. Use DD/MM/YYYY.";
  }

  // Parse the date
  const [day, month, year] = dateString.split("/").map(Number);
  const date = new Date(year, month - 1, day);

  // Check if the parsed date is valid
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return "Invalid date.";
  }

  // Check if the date is in the future
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (date > today) {
    return "Date cannot be in the future.";
  }

  return true; // Date is valid and not in the future
};
interface ValidationEntry {
  validation: RegExp;
  message: string;
}
interface RegexValues {
  emailValidation: ValidationEntry;
  passwordValidation: ValidationEntry;
  dobValidation: ValidationEntry;
  phoneNumberValidation: ValidationEntry;
  userNameValidation: ValidationEntry;
  nameValidation: ValidationEntry;
  numberValidation: ValidationEntry;
}
export const regexValues: RegexValues = {
  emailValidation: {
    validation: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Invalid email address",
  },
  passwordValidation: {
    validation:
      /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&.#^&*!)(\[\]{};:`~_,<>|+=]{8,}$/,
    message:
      "Password must contain at least one uppercase letter, one number, and one special character",
  },
  dobValidation: {
    // validation: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
    validation: /^\d{4}-\d{2}-\d{2}$/,
    message: "Date is Not Today or in the Future",
  },
  phoneNumberValidation: {
    validation: /^[0-9]{10}$/,
    message: "Invalid phone number",
  },
  userNameValidation: {
    validation: /^[A-Za-z0-9]+$/,
    //  /^[\p{L}\p{N}]+$/u,   This support all lang letters and numbers if works on es6
    message: "Username can contain letters and numbers.",
  },
  nameValidation: {
    validation: /^[a-zA-ZÀ-ÿ'\s]+$/,
    message: "Name can contain only letters.",
  },
  numberValidation: {
    validation: /^[0-9]{1,}$/,
    message: "number invalid ",
  },
};

// loader.ts
function getLoaderElement(): HTMLElement | null {
  return document.getElementById("fullscreen-loader");
}

export function showLoader(): void {
  const loader = getLoaderElement();
  if (loader) {
    loader.style.display = "flex";
  } else {
    console.error("Loader element not found");
  }
}

export function hideLoader(): void {
  const loader = getLoaderElement();
  if (loader) {
    loader.style.display = "none";
  } else {
    console.error("Loader element not found");
  }
}
export const CreateUpdateData = (jsonData: any = {}, currentData: any = {}) => {
  let updateObject: any = {};
  Object.entries(jsonData || [])?.forEach(
    ([key, value]: [key: string, value: any], index) => {
      const { name } = value || "";
      if (currentData[name]) {
        updateObject[name] = currentData[name];
      }
    }
  );
  return updateObject;
};

export const getFullImagePath = (imagePath: string) => {
  const finalImgPath = `${envValues.NEXT_PUBLIC_URL}${imagePath}`;
  if (!imagePath) return "";
  return finalImgPath;
};

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): T {
  let timeout: NodeJS.Timeout;
  return function (...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  } as T;
}

export function formatName(input: string): string {
  if (!input) return "";
  return input
    ?.toLowerCase()
    ?.replace(/_/g, " ")
    ?.replace(/\b\w/g, (char) => char.toUpperCase());
}

export const downloadPdf = (filePath: string, fileName: string): void => {
  const link = document.createElement("a");
  link.href = filePath;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const JSONConvert = (input = "") => {
  let value = JSON.parse(JSON.stringify(input));

  return value;
};

export const getMaxValue = (arr: any) => {
  return Math.max(...arr);
};
/**
 * Changes the stroke color of an SVG element.
 * @param svgElement - The SVG element to change color.
 * @param color - The color to apply to the SVG stroke.
 */
export const changeSvgStrokeColor = (
  svgElement: string,
  color: string
): string => {
  return svgElement?.replace(/stroke="[^"]*"/g, `stroke="${color}"`);
};

export default changeSvgStrokeColor;

export const compareAndFilterReportQuestionObjects = (sourceObj: IReportJson, compareObj: IReportJson): IReportJson => {
  return Object.keys(sourceObj)
    // Filter out keys that are not in compareObj
    .filter((key) => {
      const sourceField = sourceObj[key];
      // Check if any field in compareObj has the same 'name' value
      return !Object.keys(compareObj).some(compareKey => compareObj[compareKey].name === sourceField.name);
    })
    .reduce((acc: IReportJson, key: string) => {
      acc[key] = sourceObj[key]; // Add the remaining keys to the new object
      return acc;
    }, {});
};
