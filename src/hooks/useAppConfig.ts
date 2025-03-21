import { useEffect } from "react"
import { useTranslation } from "react-i18next"

import { LANGUAGES } from "@/constants/language"
import { useAuth } from "@/contexts/auth.context"
import { useLang } from "@/contexts/lang.context"

import useIdleTimer from "./useIdleTimer"
import useScrollTop from "./useScrollTop"

const useAppConfig = () => {
	useScrollTop()
	const { i18n } = useTranslation()
	const { logout } = useAuth()
	useIdleTimer(logout)
	const { currentLang } = useLang()

	useEffect(() => {
		i18n.changeLanguage(currentLang || LANGUAGES.VI)
	}, [currentLang, i18n])
}
export default useAppConfig
