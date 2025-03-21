import React from "react"
import { useTranslation } from "react-i18next"

import { Button } from "../ui/button"

export type IFooterDialogProps = {
	isHiddenCancel?: boolean
	onCloseDialog: () => void
	isProcessing?: boolean
	onAction: () => void
	textButtonLeft?: string
	textButtonRight?: string
	footer?: React.ReactNode
}

const FooterDialog: React.FC<IFooterDialogProps> = ({
	footer,
	isHiddenCancel,
	isProcessing,
	textButtonLeft,
	textButtonRight,
	onAction,
	onCloseDialog,
}) => {
	const { t } = useTranslation()
	if (footer) return footer
	return (
		<div>
			<div className="flex items-center justify-between pb-6 pt-0 px-6 gap-5">
				{!isHiddenCancel && (
					<Button
						onClick={!!onCloseDialog && onCloseDialog}
						variant="outline"
						className="w-full border-primary text-primary"
						disabled={isProcessing}
					>
						{textButtonLeft}
					</Button>
				)}

				<Button
					onClick={onAction}
					className="w-full focus:drop-shadow-none  focus-visible:ring-0 "
					disabled={isProcessing}
				>
					{textButtonRight || t("buttons.ok")}
				</Button>
			</div>
		</div>
	)
}

export default FooterDialog
