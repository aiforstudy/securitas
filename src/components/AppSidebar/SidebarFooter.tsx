import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { LogOut } from "lucide-react"

import { SidebarFooter as SidebarFooterUI } from "@/components/ui/sidebar"
import { PATH } from "@/constants/path"
import { useAuth } from "@/contexts/auth.context"

const SidebarFooter = () => {
	const navigate = useNavigate()
	const { logout } = useAuth()
	const { t } = useTranslation()

	const handleLogout = () => {
		logout()
		navigate(PATH.AUTHENTICATION.LOGIN)
	}

	return (
		<SidebarFooterUI className="bg-gray-200 rounded-xl h-12 mx-6 my-6">
			<div className="flex items-center justify-center h-full	 cursor-pointer gap-4" onClick={handleLogout}>
				<LogOut className="w-5 h-5" />
				<p className="text-sm">{t("button.signOut")}</p>
			</div>
		</SidebarFooterUI>
	)
}

export default SidebarFooter
