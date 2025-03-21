import React from "react"

import { cn } from "@/lib/utils"

import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"

export type IHeaderDialogProps = {
	isShowBorderBottom?: boolean
	title?: string
	description?: React.ReactNode | string
	header?: React.ReactNode
}

const HeaderDialog: React.FC<IHeaderDialogProps> = ({ isShowBorderBottom, title, description, header }) => {
	if (header) return header
	return (
		<DialogHeader className={cn("p-6", { "border-b-[1px] border-primary": isShowBorderBottom })}>
			<DialogTitle className="font-bricolage text-primary-dark font-bold text-xl text-center">{title}</DialogTitle>

			{description && (
				<DialogDescription className="text-center text-base text-gray-400 font-normal">{description}</DialogDescription>
			)}
		</DialogHeader>
	)
}

export default HeaderDialog
