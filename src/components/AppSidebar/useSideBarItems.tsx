import { useMemo } from "react"
import { useTranslation } from "react-i18next"

import { Grid2X2, LayoutDashboard, Siren } from "lucide-react"

import { PATH } from "@/constants/path"

enum Roles {
	Admin = "ADMIN",
	SuperAdmin = "SUPER_ADMIN",
}

export type ISubmenu = {
	label: string
	path?: string
	roles?: Roles[]
}

export type ISidebarChildren = ISubmenu & {
	submenu?: ISubmenu[]
}

export type ISidebarItem = ISubmenu & {
	icon?: React.ReactNode
	prefixPath?: string
	key?: string
	children?: ISidebarChildren[]
}

export const currentRoles = ["ADMIN", "SUPER_ADMIN"]

export const useSideBarItems = () => {
	const { t } = useTranslation()

	const sidebarItems = useMemo(
		() => [
			{
				label: t("sidebar.dashboard"),
				icon: <LayoutDashboard className="!w-5 !h-5" />,
				path: PATH.BASE_URL,
			},
			{
				label: t("sidebar.alerts"),
				icon: <Siren className="!w-5 !h-5" />,
				path: PATH.ALERTS.ROOT,
			},
			{
				label: t("sidebar.liveView"),
				icon: <Grid2X2 className="!w-5 !h-5" />,
				path: PATH.LIVE_VIEW.ROOT,
			},
		],
		[t],
	)

	return sidebarItems
}
