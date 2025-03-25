import React from "react"
import { useTranslation } from "react-i18next"

import { LoaderCircle } from "lucide-react"

import { cn } from "@/lib/utils"

type ILoadingIndicatorProps = {
	icon?: React.ReactNode
	text?: string
	className?: React.HTMLAttributes<HTMLDivElement>["className"]
}

const LoadingIndicator: React.FC<ILoadingIndicatorProps> = ({ icon, text, className }) => {
	const { t } = useTranslation()

	return (
		<div className={cn("h-12 flex items-center justify-center gap-3 w-full min-h-40", className)}>
			{icon || <LoaderCircle className="animate-spin" size={16} />}
			{text || t("common.loading")}
		</div>
	)
}

export default LoadingIndicator
