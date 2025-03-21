import { initReactI18next } from "react-i18next"

import i18n from "i18next"

import { LANGUAGES } from "@/constants/language"

import { resources } from "./resources"

export const locales = {
	[LANGUAGES.EN]: "English",
	[LANGUAGES.VI]: "Tiếng Việt",
} as const

export const defaultNS = "translation"
export const fallbackNS = "fallback"

i18n.use(initReactI18next).init({
	lng: LANGUAGES.VI,
	resources,
	fallbackLng: LANGUAGES.VI,
	interpolation: { escapeValue: false },
})

export default i18n
