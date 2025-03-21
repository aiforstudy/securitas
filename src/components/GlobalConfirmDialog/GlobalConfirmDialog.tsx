import React from "react"

import { useGlobalStore } from "@/stores/global"

import ConfirmDialog, { IConfirmPayload } from "../ConfirmDialog"

export type IConfirmDialogRef = {
	confirm: (data: IConfirmPayload) => void
	close: () => void
}

const GlobalConfirmDialog: React.FC = () => {
	const confirmDialogRef = React.useRef<IConfirmDialogRef | null>(null)
	const { isConfirmDialogOpen, confirmDialogMessage, setConfirmDialogMessage, setIsConfirmDialogOpen } =
		useGlobalStore()

	React.useEffect(() => {
		if (isConfirmDialogOpen && confirmDialogRef.current) {
			confirmDialogRef.current.confirm({
				title: confirmDialogMessage?.title || "",
				description: confirmDialogMessage?.description,
				isHiddenCancel: true,
				action: () => {
					setIsConfirmDialogOpen(false)
				},
				actionClose: () => {
					setIsConfirmDialogOpen(false)
				},
			})
		}
	}, [isConfirmDialogOpen, confirmDialogMessage, setConfirmDialogMessage, setIsConfirmDialogOpen])

	return <ConfirmDialog ref={confirmDialogRef} isHiddenCancel />
}

export default GlobalConfirmDialog
