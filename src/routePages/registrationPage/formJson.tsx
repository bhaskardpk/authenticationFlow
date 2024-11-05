import { regexValues } from "@/utils/frontHelper";

export const step1FormJson = {
  Email: {
    type: "input",
    label: "Email",
    icon: "frameIcon",
    name: "email",
    required: {
      required: "Email is required",
      pattern: {
        value: regexValues.emailValidation.validation,
        message: regexValues.emailValidation.message,
      },
    },
    // errorMessage: "required",
  },
  Password: {
    type: "password",
    label: "Password",
    icon: "lockIcon",
    name: "password",
    required: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters",
      },
      pattern: {
        value: regexValues.passwordValidation.validation,
        message: regexValues.passwordValidation.message,
      },
    },
  },
};

export const step2FormJson = {
  "Phone Number": {
    type: "input",
    label: "Phone number",
    icon: "phoneIcon",
    name: "phoneNumber",
    required: {
      required: "Phone number is required",
      pattern: {
        value: regexValues.phoneNumberValidation.validation,
        message: regexValues.phoneNumberValidation.message,
      },
    },
    isPhoneNumber: true,
  },
  Username: {
    type: "input",
    label: "Username",
    icon: "frameIcon",
    name: "userName",
    required: {
      required: "Username is required",
      pattern: {
        value: regexValues.userNameValidation.validation,
        message: regexValues.userNameValidation.message,
      },
    },
  },
  "First name": {
    type: "input",
    label: "First name",
    icon: "frameIcon",
    name: "firstName",
    required: {
      required: "First name is required",
      pattern: {
        value: regexValues.nameValidation.validation,
        message: `First ${regexValues.nameValidation.message}`,
      },
    },
  },
  "Last name": {
    type: "input",
    label: "Last name",
    icon: "frameIcon",
    name: "lastName",
    required: {
      required: "Last name is required",
      pattern: {
        value: regexValues.nameValidation.validation,
        message: `Last ${regexValues.nameValidation.message}`,
      },
    },
  },
  Address: {
    isAddress: true,
    type: "input",
    label: "Address",
    icon: "frameIcon",
    name: "address",
    required: {
      required: "Address is required",
      // pattern: {
      //   value: /^[a-zA-Z0-9]$/,
      //   message: "Address must be at least 3 characters",
      // },
    },
  },
  "Date of birth": {
    type: "date",
    label: "Date of birth",
    icon: "calendarIcon",
    name: "dob",
    required: {
      required: "Date of birth is required",
      pattern: {
        value: regexValues.dobValidation.validation,
        message: regexValues.dobValidation.message,
      },
    },
  },
};
export const orderReportJson = {
  "International report": {
    subscriptionType: "ORDER_REPORT",
    price: "10,000",
    priceValue: 10000,
    features: ["Order reports", "Buy reports"],
    isSelected: true,
    type: "€ HT / an",
    borderColor: "#ababce",
    selectedColor: "#1b1b80",
  },
  "Nation report": {
    subscriptionType: "ORDER_REPORT",
    price: "5,000",
    priceValue: 5000,
    features: ["Order reports", "Buy reports"],
    isSelected: false,
    type: "€ HT / an",
    borderColor: "#ababce",
    selectedColor: "#1b1b80",
  },
  "Region report": {
    subscriptionType: "ORDER_REPORT",
    price: "450",
    priceValue: 450,
    features: ["Order reports", "Buy reports"],
    isSelected: false,
    type: "€ HT / an",
    borderColor: "#ababce",
    selectedColor: "#1b1b80",
  },
  "Subscription type": {
    Monthly: {
      isselected: false,
    },
    Annual: {
      isselected: true,
    },
  },
};

export const scoutingSubscriptionJson = {
  "Scouting account": {
    subscriptionType: "CREATE_REPORT",
    price: "70",
    priceValue: 70,
    features: [
      "Create and sell reports",
      "35€ right away + €35 deducted from the first report sold",
    ],
    isSelected: true,
    type: "€ HT / an",
    borderColor: "#ababce",
    selectedColor: "#1b1b80",
  },
};
