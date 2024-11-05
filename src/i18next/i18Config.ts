import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./languages/en/translation.json";
import frTranslation from "./languages/fr/translation.json";
import LanguageDetector from "i18next-browser-languagedetector";

// Initialize i18n
i18n
  // .use(LanguageDetector) // Add the language detector
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      // fr: { translation: frTranslation },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

export const languageArray = [
  { name: "English", value: "en" },
  // { name: "France", value: "fr" },
];
