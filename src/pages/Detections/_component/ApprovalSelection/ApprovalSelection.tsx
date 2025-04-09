import React, { HTMLAttributes, memo } from "react"
import { useTranslation } from "react-i18next"

import { Loader2 } from "lucide-react"

import { Approved } from "@/api-generated"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type IApprovalSelectionProps = {
	loading?: boolean
	className?: HTMLAttributes<HTMLDivElement>["className"]
	selectedApproval: Approved | "all"
	setSelectedApproval: (approval: Approved | "all") => void
}

const approvalOptions = [
	{ label: "All", value: "all" },
	{ label: "Yes", value: Approved.YES },
	{ label: "No", value: Approved.NO },
	{ label: "Expired", value: Approved.EXPIRED },
] as const

const ApprovalSelection: React.FC<IApprovalSelectionProps> = ({ loading, selectedApproval, setSelectedApproval }) => {
	const { t } = useTranslation()

	return (
		<Select value={selectedApproval} onValueChange={setSelectedApproval}>
			<SelectTrigger className="h-full w-max text-sm font-normal px-2">
				{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <SelectValue placeholder={t("Approval")} />}
			</SelectTrigger>
			<SelectContent className="!rounded-md">
				<SelectGroup>
					{approvalOptions.map((option) => (
						<SelectItem value={option.value} key={`approval-${option.value}`} className="text-sm flex">
							<div className="ml-2">{option.label}</div>
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}

export default memo(ApprovalSelection)
