import React from "react"
import { useTranslation } from "react-i18next"

import { cn } from "@/lib/utils"

type IErrorMessageProps = {
	error?: Error
	className?: React.HTMLAttributes<HTMLDivElement>["className"]
}

const ErrorMessage: React.FC<IErrorMessageProps> = ({ error, className }) => {
	const { t } = useTranslation()

	return (
		<div className={cn("h-12 flex items-center justify-center gap-3 w-full min-h-40", className)}>
			{error?.message || t("common.hasError")}
		</div>
	)
}

export default ErrorMessage
