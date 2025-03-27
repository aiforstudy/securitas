import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { LogOut } from "lucide-react"

import { SidebarFooter as SidebarFooterUI, useSidebar } from "@/components/ui/sidebar"
import { PATH } from "@/constants/path"
import { useAuth } from "@/contexts/auth.context"
import { cn } from "@/lib/utils"

const SidebarFooter = () => {
	const navigate = useNavigate()
	const { logout } = useAuth()
	const { t } = useTranslation()
	const { open } = useSidebar()

	const handleLogout = () => {
		logout()
		navigate(PATH.AUTHENTICATION.LOGIN)
	}

	return (
		<SidebarFooterUI className="bg-gray-200 rounded-xl h-12 m-5 p-0">
			<div
				className={cn("flex items-center justify-center h-full gap-2 cursor-pointer", {
					"w-full": open,
					"w-[50px]": !open,
				})}
				onClick={handleLogout}
			>
				<LogOut className="w-5 h-5" />
				{open && <p className="text-md">{t("button.signOut")}</p>}
			</div>
		</SidebarFooterUI>
	)
}

export default SidebarFooter
