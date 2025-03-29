import React, { HTMLAttributes, memo, useEffect } from "react"
import { useTranslation } from "react-i18next"

import { useQuery } from "@tanstack/react-query"
import { LoaderCircle } from "lucide-react"

import { companyControllerFindAllOptions } from "@/api-generated/@tanstack/react-query.gen"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/auth.context"
import { useGlobalStore } from "@/stores/global"

type ICompanySelectionProps = {
	className?: HTMLAttributes<HTMLDivElement>["className"]
}

const CompanySelection: React.FC<ICompanySelectionProps> = () => {
	const { t } = useTranslation()
	const { isAuthenticated } = useAuth()
	const { data, isLoading } = useQuery({
		...companyControllerFindAllOptions({ query: { page: 1, limit: 10 } }),
		enabled: isAuthenticated,
	})
	const { selectedCompany, setSelectedCompany } = useGlobalStore()

	useEffect(() => {
		if (data?.data?.length) {
			setSelectedCompany(data?.data[0])
		}
	}, [data?.data, setSelectedCompany])

	return (
		<Select
			value={selectedCompany?.company_code}
			onValueChange={(value) => {
				const found = data?.data?.find((_) => _.company_code === value)
				if (found) setSelectedCompany(found)
			}}
		>
			<SelectTrigger className="h-10 w-max text-sm font-normal px-2">
				<div className="flex items-center gap-2">
					{isLoading ? (
						<LoaderCircle className="animate-spin" size={16} />
					) : (
						<div className="text-gray-600">Company:</div>
					)}
					<SelectValue placeholder={t("Company")} />
				</div>
			</SelectTrigger>
			<SelectContent className="!rounded-md">
				<SelectGroup>
					{data?.data?.map((item) => (
						<SelectItem value={item.company_code} key={`company-${item.company_code}`} className="text-sm">
							{item.name}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}

export default memo(CompanySelection)
