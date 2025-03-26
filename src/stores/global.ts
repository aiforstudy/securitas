import { create } from "zustand"

export type IConfirmDialogMessage = {
	title: string
	description: string
	isHiddenCancelButton?: boolean
	isHiddenConfirmButton?: boolean
}

export type IGlobalStore = {
	isLoading: boolean
	isSnackbarOpen: boolean
	isConfirmDialogOpen: boolean
	confirmDialogMessage?: IConfirmDialogMessage

	setIsLoading: (isLoading: boolean) => void
	setIsSnackbarOpen: (isSnackbarOpen: boolean) => void
	setIsConfirmDialogOpen: (isConfirmDialogOpen: boolean) => void
	setConfirmDialogMessage: (confirmDialogMessage?: IConfirmDialogMessage) => void
}

export const useGlobalStore = create<IGlobalStore>((set) => ({
	isLoading: false,
	isSnackbarOpen: false,
	isConfirmDialogOpen: false,
	confirmDialogMessage: undefined,

	setIsLoading: (isLoading) => set({ isLoading }),
	setIsSnackbarOpen: (isSnackbarOpen) => set({ isSnackbarOpen }),
	setIsConfirmDialogOpen: (isConfirmDialogOpen) => {
		set({ isConfirmDialogOpen })
		if (!isConfirmDialogOpen) set({ confirmDialogMessage: undefined })
	},
	setConfirmDialogMessage: (confirmDialogMessage) => set({ confirmDialogMessage }),
}))
