import React, { HTMLAttributes, memo, useEffect } from "react"
import { useTranslation } from "react-i18next"

import { LoaderCircle } from "lucide-react"

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { STORAGE_KEYS } from "@/constants/storage"
import useCompanyApi from "@/hooks/api/useCompanyApi"
import { useGlobalStore } from "@/stores/global"
import { localS } from "@/utils/storage"

type ICompanySelectionProps = {
	className?: HTMLAttributes<HTMLDivElement>["className"]
}

const CompanySelection: React.FC<ICompanySelectionProps> = () => {
	const { t } = useTranslation()
	const { companies } = useCompanyApi({ query: { page: 1, limit: 1000 } })
	const { selectedCompany, setSelectedCompany } = useGlobalStore()

	useEffect(() => {
		if (companies?.data?.data?.length) {
			const companyCode = localS.get(STORAGE_KEYS.COMPANY_CODE)
			const found = companies?.data?.data?.find((_) => _.company_code === companyCode)
			if (found) setSelectedCompany(found)
		}
	}, [companies?.data, setSelectedCompany])

	return (
		<Select
			value={selectedCompany?.company_code}
			onValueChange={(value) => {
				const found = companies?.data?.data?.find((_) => _.company_code === value)
				if (found) setSelectedCompany(found)
			}}
		>
			<SelectTrigger className="h-10 w-max text-sm font-normal px-2">
				<div className="flex items-center gap-2">
					{companies?.isLoading ? (
						<LoaderCircle className="animate-spin" size={16} />
					) : (
						<div className="text-gray-600">Company:</div>
					)}
					<SelectValue placeholder={t("Company")} />
				</div>
			</SelectTrigger>
			<SelectContent className="!rounded-md">
				<SelectGroup>
					{companies?.data?.data?.map((item) => (
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
