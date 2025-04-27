import { useMemo } from "react"
import { useTranslation } from "react-i18next"

import {
	BookText,
	Cctv,
	ChartNoAxesCombined,
	Grid2X2,
	LayoutDashboard,
	Lock,
	Logs,
	Map,
	Settings2,
	Siren,
	SquareStack,
	User,
	Users,
} from "lucide-react"

import { PATH } from "@/constants/path"
import PERMISSIONS from "@/constants/permissions"

export type ISubmenu = {
	label: string
	path?: string
	icon?: React.ReactNode
	isComingSoon?: boolean
	allowPermission?: string[]
}

export type ISidebarChildren = ISubmenu & {
	submenu?: ISubmenu[]
}

export type ISidebarItem = ISubmenu & {
	key?: string
	children?: ISidebarChildren[]
	prefixPath?: string
}

export const useSideBarItems = () => {
	const { t } = useTranslation()

	const sidebarItems = useMemo(
		() => [
			{
				label: t("sidebar.monitoring"),
				path: PATH.MONITORING.ROOT,
				children: [
					{
						label: t("sidebar.dashboard"),
						icon: <LayoutDashboard className="!w-5 !h-5" />,
						path: PATH.MONITORING.DASHBOARD,
					},
					{
						label: t("sidebar.analytics"),
						icon: <ChartNoAxesCombined className="!w-5 !h-5" />,
						path: PATH.MONITORING.ANALYTICS,
						isComingSoon: true,
					},
					{
						label: t("sidebar.liveView"),
						icon: <Grid2X2 className="!w-5 !h-5" />,
						path: PATH.MONITORING.LIVE_VIEW,
					},
				],
			},
			{
				label: t("sidebar.devices"),
				path: PATH.DEVICES.ROOT,
				children: [
					{
						label: t("sidebar.cameras"),
						icon: <Cctv className="!w-5 !h-5" />,
						path: PATH.DEVICES.CAMERAS.ROOT,
					},
					{
						label: t("sidebar.smartLocks"),
						icon: <Lock className="!w-5 !h-5" />,
						path: PATH.DEVICES.SMART_LOCKS.ROOT,
					},
				],
			},
			{
				label: t("sidebar.operations"),
				path: PATH.OPERATIONS.ROOT,
				children: [
					{
						label: t("sidebar.mapConfiguration"),
						icon: <Map className="!w-5 !h-5" />,
						path: PATH.OPERATIONS.MAP_CONFIGURATION,
						isComingSoon: true,
					},
					{
						label: t("sidebar.deviceStatus"),
						icon: <SquareStack className="!w-5 !h-5" />,
						path: PATH.OPERATIONS.DEVICE_STATUS,
						isComingSoon: true,
					},
					{
						label: t("sidebar.detections"),
						icon: <Siren className="!w-5 !h-5" />,
						path: PATH.OPERATIONS.DETECTIONS,
					},
					{
						label: t("sidebar.logs"),
						icon: <Logs className="!w-5 !h-5" />,
						path: PATH.OPERATIONS.LOGS,
						isComingSoon: true,
					},
					{
						label: t("sidebar.knowledgeBase"),
						icon: <BookText className="!w-5 !h-5" />,
						path: PATH.OPERATIONS.KNOWLEDGE_BASE,
						isComingSoon: true,
					},
				],
			},
			{
				label: t("sidebar.system"),
				path: PATH.SYSTEM.ROOT,
				children: [
					{
						label: t("sidebar.administration"),
						icon: <User className="!w-5 !h-5" />,
						path: PATH.SYSTEM.ADMINISTRATION,
					},
					{
						label: t("sidebar.roleSettings"),
						icon: <Users className="!w-5 !h-5" />,
						path: PATH.SYSTEM.ROLE_SETTINGS,
						allowPermission: [PERMISSIONS.ROLE.READ],
					},
					{
						icon: <Settings2 className="!w-5 !h-5" />,
						path: PATH.SYSTEM.COMPANIES,
						label: t("sidebar.companies"),
						allowPermission: [PERMISSIONS.COMPANY.READ],
					},
				],
			},
		],
		[t],
	)

	return sidebarItems
}
