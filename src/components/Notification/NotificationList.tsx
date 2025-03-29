import React from "react"

import { LoaderCircle } from "lucide-react"

import NotificationItem from "./NotificationItem"
import { ENotificationType } from "./NotificationTabType"

export type INotification = {
	id: string
	created_at: string
	updated_at: string
	read_at: string | null
	body: string
}

type NotificationListProps = {
	type?: ENotificationType
	isLoading?: boolean
	onTrigger?: () => void
	notifications: INotification[]
}

const NotificationList: React.FC<NotificationListProps> = ({ type, isLoading, onTrigger, notifications = [] }) => {
	return (
		<div className="relative min-h-[10vh] overflow-x-hidden overflow-y-scroll pb-3">
			{isLoading && (
				<div className="w-full flex items-center justify-center h-[30vh]">
					<LoaderCircle className="animate-spin text-primary" size={24} />
				</div>
			)}

			{!isLoading && (
				<div className="space-y-2 overflow-y-scroll">
					{notifications.map((notification: INotification) => (
						<NotificationItem key={notification.id} type={type} onTrigger={onTrigger} data={notification} />
					))}
				</div>
			)}
		</div>
	)
}

export default NotificationList
