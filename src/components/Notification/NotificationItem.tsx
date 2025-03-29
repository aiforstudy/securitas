import React from "react"

import { CheckCheck } from "lucide-react"

// import DateTimeDisplay from "@/components/DateTimeDisplay"
// import { DoubleCheck } from "@/components/Icons"
// import { SectionWrapper } from "@/components/SectionWrapper"
import { cn } from "@/lib/utils"

import { INotification } from "./NotificationList"
import { ENotificationType } from "./NotificationTabType"

type NotificationItemProps = {
	type?: ENotificationType
	data: INotification
	onTrigger?: () => void
}

const NotificationItem: React.FC<NotificationItemProps> = ({ data }) => {
	const [isUnread, setIsUnread] = React.useState(true)

	return (
		<div
			className={cn("relative cursor-pointer", {
				"bg-primary-light": isUnread,
			})}
			onClick={() => setIsUnread(false)}
		>
			<div className="flex items-center justify-between mb-2">{!isUnread && <CheckCheck />}</div>
			<div className="flex items-center justify-between mb-2">{data.body}</div>
		</div>
	)
}

export default NotificationItem
