import React, { HTMLAttributes, memo } from "react"
import { useTranslation } from "react-i18next"

import { LoaderCircle } from "lucide-react"

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
			<SelectTrigger size="lg" className="h-[44px] w-max text-sm font-normal px-2">
				<div className="flex items-center gap-2">
					{loading && <LoaderCircle className="animate-spin" size={16} />}
					<div className="text-gray-600">Approval:</div>
					<SelectValue placeholder={t("Approval")} />
				</div>
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
