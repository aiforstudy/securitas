import { useMemo } from "react"
import { useTranslation } from "react-i18next"

import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"

export enum ENotificationType {
	ALL = "all",
	UNREAD = "unread",
}

const NotificationTabType: React.FC<{
	currentTab: ENotificationType
	handleTabChange: (value: ENotificationType) => void
}> = ({ currentTab, handleTabChange }) => {
	const { t } = useTranslation()
	const tabsList = useMemo(() => {
		return [
			{ value: ENotificationType.ALL, label: t("All") },
			{ value: ENotificationType.UNREAD, label: t("Unread") },
		]
	}, [t])

	return (
		<div className="bg-[#B4DCF733] rounded-2xl p-2">
			<Tabs
				defaultValue="balance"
				className="w-full"
				value={currentTab}
				onValueChange={(value) => handleTabChange(value as ENotificationType)}
			>
				<TabsList className="bg-transparent flex items-center gap-5">
					{tabsList.map((item) => (
						<TabsTrigger
							key={`tab-notification-${item.value}`}
							value={item.value}
							className="w-fit font-normal !rounded-2xl py-2 px-4 text-primary-dark data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:rounded-base"
						>
							{item.label}
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs>
		</div>
	)
}

export default NotificationTabType
