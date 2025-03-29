import React from "react"
import { useTranslation } from "react-i18next"

import { Bell, CheckCheck } from "lucide-react"

import NotificationList from "@/components/Notification/NotificationList"
import NotificationTabType, { ENotificationType } from "@/components/Notification/NotificationTabType"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const Notification: React.FC = () => {
	const { t } = useTranslation()
	// const route = useLocation()

	const [open, setOpen] = React.useState(false)
	const [currentTab, setCurrentTab] = React.useState<ENotificationType>(ENotificationType.ALL)
	const [notificationCount, setNotificationCount] = React.useState(5)

	const handleTabChange = (value: string) => setCurrentTab(value as ENotificationType)

	const handleMarkAll = () => {
		setNotificationCount(0)
	}

	// const isPageNotification = route.pathname == PATH.NOTIFICATIONS.ROOT

	// useEffect(() => {
	// 	if (isPageNotification) {
	// 		setOpen(false)
	// 	}
	// }, [isPageNotification])

	return (
		<DropdownMenu open={open} onOpenChange={(value) => setOpen(value)}>
			<DropdownMenuTrigger asChild>
				<div
					className={cn(
						"cursor-pointer w-[36px] h-[36px] rounded-md bg-gray-200 justify-center flex items-center gap-2",
						{ "bg-primary text-white": open },
					)}
				>
					<div className="relative">
						<Bell className="w-5 h-5" />
						{notificationCount > 0 && (
							<div className="absolute -top-[4px] -right-[4px] w-[14px] h-[14px] bg-red-500 text-white text-[8px] flex justify-center items-center rounded-full">
								{notificationCount}
							</div>
						)}
					</div>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[520px] shadow-1 rounded-2xl overflow-hidden">
				<DropdownMenuLabel>
					<div className="text-center font-bricolage text-primary-dark text-xl font-bold py-1 flex items-center justify-between gap-2 px-4">
						<div className="flex flex-row items-center">
							<span>{t("Notifications")}</span>
							<div className="text-primary font-normal text-sm ml-4 cursor-pointer underline">All Notifications</div>
						</div>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="ghost" size="sm" disabled={notificationCount === 0} onClick={handleMarkAll}>
									<CheckCheck />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="bottom">
								<p className="text-sm font-normal">{t("header.markAllAsRead")}</p>
							</TooltipContent>
						</Tooltip>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<div className="space-y-4 mt-6">
						<div className="px-6 space-y-4">
							<NotificationTabType currentTab={currentTab} handleTabChange={handleTabChange} />
						</div>
						<div className="pl-6 h-[70vh] overflow-scroll">
							<NotificationList type={currentTab} onTrigger={() => setOpen(false)} notifications={[]} />
						</div>
					</div>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default Notification
