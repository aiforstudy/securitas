import React, { useImperativeHandle } from "react"

import useOpen from "@/hooks/useOpen"
import { cn } from "@/lib/utils"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import FooterDialog from "./FooterDialog"
import HeaderDialog from "./HeaderDialog"

export type IConfirmPayload = {
	size?: "xs" | "sm" | "md" | "lg" | "xl"
	title?: string
	description?: React.ReactNode | string
	textButtonLeft?: string
	isHiddenCancel?: boolean
	textButtonRight?: string

	action?: () => void
	actionClose?: () => void
}

export type IConfirmDialogProps = {
	size?: "xs" | "sm" | "md" | "lg"
	header?: React.ReactNode
	footer?: React.ReactNode
	content?: React.ReactNode
	isProcessing?: boolean
	disableClose?: boolean
	hideCloseButton?: boolean
	isHiddenCancel?: boolean
	isShowBorderBottom?: boolean
}

const ConfirmDialog = React.forwardRef(
	(
		{
			isProcessing,
			size,
			isHiddenCancel = false,
			isShowBorderBottom = false,
			disableClose = false,
			hideCloseButton = false,
			header,
			footer,
			content,
		}: IConfirmDialogProps,
		ref,
	) => {
		const { open, setOpen } = useOpen()
		const [data, setData] = React.useState<IConfirmPayload | null>(null)
		const confirm = (data: IConfirmPayload) => {
			setData(data)
			setOpen(true)
		}

		const withBySize = (size?: string) => {
			switch (size) {
				case "xs":
					return "max-w-xs"
				case "sm":
					return "max-w-sm"
				case "md":
					return "max-w-md"
				case "lg":
					return "max-w-lg"
				default:
					return "max-w-xl"
			}
		}

		const onCloseDialog = () => {
			setData(null)
			setOpen(false)
		}

		useImperativeHandle(ref, () => ({ close: onCloseDialog, confirm }))

		return (
			<Dialog
				open={open}
				onOpenChange={(isOpen) => {
					if (isProcessing) return
					if (disableClose) return
					setOpen(isOpen)
					if (!isOpen) {
						setOpen(false)
						setData(null)
						data?.actionClose?.()
					}
				}}
			>
				<DialogContent
					hideCloseButton={hideCloseButton}
					className={cn("max-w-xl p-0 rounded-2xl border-none gap-0", withBySize(data?.size || size))}
					disableClose={disableClose}
					onIconCloseClick={() => {
						onCloseDialog()
						data?.actionClose?.()
					}}
				>
					<DialogHeader className="hidden">
						<DialogTitle></DialogTitle>
						<DialogDescription></DialogDescription>
					</DialogHeader>
					<HeaderDialog
						isShowBorderBottom={isShowBorderBottom}
						title={data?.title}
						description={data?.description}
						header={header}
					/>
					{content}
					<FooterDialog
						footer={footer}
						isHiddenCancel={isHiddenCancel}
						isProcessing={isProcessing}
						onAction={() => data?.action && data?.action()}
						onCloseDialog={() => onCloseDialog()}
						textButtonLeft={data?.textButtonLeft}
						textButtonRight={data?.textButtonRight}
					/>
				</DialogContent>
			</Dialog>
		)
	},
)

export default ConfirmDialog
