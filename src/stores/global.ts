import { create } from "zustand"

import { Company } from "@/api-generated"

export type IConfirmDialogMessage = {
	title: string
	description: string
	isHiddenCancelButton?: boolean
	isHiddenConfirmButton?: boolean
}

export type IGlobalStore = {
	isLoading: boolean
	isSnackbarOpen: boolean
	selectedCompany?: Company
	isConfirmDialogOpen: boolean
	confirmDialogMessage?: IConfirmDialogMessage

	setIsLoading: (isLoading: boolean) => void
	setIsSnackbarOpen: (isSnackbarOpen: boolean) => void
	setSelectedCompany: (selectedCompany: Company) => void
	setIsConfirmDialogOpen: (isConfirmDialogOpen: boolean) => void
	setConfirmDialogMessage: (confirmDialogMessage?: IConfirmDialogMessage) => void
}

export const useGlobalStore = create<IGlobalStore>((set) => ({
	isLoading: false,
	isSnackbarOpen: false,
	selectedCompany: undefined,
	isConfirmDialogOpen: false,
	confirmDialogMessage: undefined,

	setIsLoading: (isLoading) => set({ isLoading }),
	setIsSnackbarOpen: (isSnackbarOpen) => set({ isSnackbarOpen }),
	setSelectedCompany: (selectedCompany) => set({ selectedCompany }),
	setIsConfirmDialogOpen: (isConfirmDialogOpen) => {
		set({ isConfirmDialogOpen })
		if (!isConfirmDialogOpen) set({ confirmDialogMessage: undefined })
	},
	setConfirmDialogMessage: (confirmDialogMessage) => set({ confirmDialogMessage }),
}))
