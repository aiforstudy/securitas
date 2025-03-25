import React from "react"
import { useTranslation } from "react-i18next"

import { cn } from "@/lib/utils"

type IEmptyDataProps = {
	text?: string
	className?: React.HTMLAttributes<HTMLDivElement>["className"]
}

const EmptyData: React.FC<IEmptyDataProps> = ({ className, text }) => {
	const { t } = useTranslation()

	return (
		<div className={cn("h-12 flex items-center justify-center gap-3 w-full min-h-40", className)}>
			{text || t("common.noData")}
		</div>
	)
}

export default EmptyData
