import React, { HTMLAttributes, memo } from "react"
import { useTranslation } from "react-i18next"

import { LoaderCircle } from "lucide-react"

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useRoleApi from "@/hooks/api/useRoleApi"
import { cn } from "@/lib/utils"

type IRoleSelectionProps = {
	className?: HTMLAttributes<HTMLDivElement>["className"]
	selectedRole: string
	onSelectRole: (roleCode: string) => void
}

const RoleSelection: React.FC<IRoleSelectionProps> = ({ className, selectedRole, onSelectRole }) => {
	const { t } = useTranslation()
	const { roles } = useRoleApi()

	return (
		<Select
			value={selectedRole}
			onValueChange={(value) => {
				const found = roles?.data?.find((_) => _.code === value)
				if (found) onSelectRole(found.code)
			}}
		>
			<SelectTrigger className={cn("h-10 w-max px-2", className)}>
				<div className="flex items-center gap-2">
					{roles?.isLoading && <LoaderCircle className="animate-spin" size={16} />}
					<SelectValue placeholder={t("Role")} />
				</div>
			</SelectTrigger>
			<SelectContent className="!rounded-md">
				<SelectGroup>
					{roles?.data?.map((item) => (
						<SelectItem key={`role-${item.code}`} value={item.code} className="text-sm">
							{item.name}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}

export default memo(RoleSelection)
