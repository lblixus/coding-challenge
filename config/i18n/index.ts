import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import translationEn from "./locales/en-US/translation.json";
import translationEs from "./locales/es-MX/translation.json";

const resources = {
  "en-US": { translation: translationEn },
  "es-MX": { translation: translationEs },
};

const getStorageItem = async (key: string): Promise<string | null> => {
  if (Platform.OS === "web") {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem(key);
    } else {
      return null;
    }
  } else {
    return await AsyncStorage.getItem(key);
  }
};

const setStorageItem = async (key: string, value: string): Promise<void> => {
  if (Platform.OS === "web") {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem(key, value);
    }
  } else {
    await AsyncStorage.setItem(key, value);
  }
};

const initI18n = async () => {
  let savedLanguage = await getStorageItem("language");

  if (!savedLanguage) {
    const deviceLocales = Localization.getLocales();
    savedLanguage =
      deviceLocales.length > 0 ? deviceLocales[0].languageTag : "es-MX";
  }

  await setStorageItem("language", savedLanguage);

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources,
    lng: savedLanguage,
    fallbackLng: "es-MX",
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
