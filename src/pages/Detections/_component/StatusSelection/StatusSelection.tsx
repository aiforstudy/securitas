import React, { HTMLAttributes, memo } from "react"
import { useTranslation } from "react-i18next"

import { Loader2 } from "lucide-react"

import { DetectionStatus } from "@/api-generated"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type IStatusSelectionProps = {
	loading?: boolean
	className?: HTMLAttributes<HTMLDivElement>["className"]
	selectedStatus: DetectionStatus
	setSelectedStatus: (status: DetectionStatus) => void
}

const statusColors = {
	[DetectionStatus.PENDING]: "bg-green-500",
	[DetectionStatus.APPROVED]: "bg-blue-500",
	[DetectionStatus.REJECTED]: "bg-red-500",
	[DetectionStatus.COMPLETED]: "bg-yellow-500",
}

const statusOptions = Object.values(DetectionStatus).map((status) => ({
	label: status,
	value: status,
}))

const StatusSelection: React.FC<IStatusSelectionProps> = ({ loading, selectedStatus, setSelectedStatus }) => {
	const { t } = useTranslation()

	return (
		<Select value={selectedStatus} onValueChange={setSelectedStatus}>
			<SelectTrigger className="h-full w-max text-sm font-normal px-2">
				{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <SelectValue placeholder={t("Status")} />}
			</SelectTrigger>
			<SelectContent className="!rounded-md">
				<SelectGroup>
					{statusOptions.map((item) => (
						<SelectItem value={item.value} key={`status-${item.value}`} className="text-sm flex">
							<div className={`w-2.5 h-2.5 ${statusColors[item.value as DetectionStatus]} rounded-full`} />
							<div className="ml-2">{item.label}</div>
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}

export default memo(StatusSelection)
