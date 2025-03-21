import React from "react"

import { LANGUAGES } from "@/constants/language"
import { STORAGE_KEYS } from "@/constants/storage"
import { localS } from "@/utils/storage"

export type ILangContext = {
	currentLang: string
	setCurrentLang: (lang: string) => void
}

export type ILangProvider = {
	children: React.ReactNode
}

const LangContext = React.createContext<ILangContext | undefined>(undefined)

export const LangProvider: React.FC<ILangProvider> = ({ children }) => {
	const [currentLang, setCurrentLang] = React.useState(() => localS.get(STORAGE_KEYS.LANGUAGE) || LANGUAGES.EN)

	return <LangContext.Provider value={{ currentLang, setCurrentLang }}>{children}</LangContext.Provider>
}

export const useLang = () => {
	const context = React.useContext(LangContext)
	if (context === undefined) {
		throw new Error("useLang must be used within a LangProvider")
	}
	return context
}

export default LangContext
