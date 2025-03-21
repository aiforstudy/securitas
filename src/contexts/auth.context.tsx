import React, { createContext, useCallback, useContext, useMemo, useState } from "react"

import isEmpty from "lodash/isEmpty"

import { STORAGE_KEYS } from "@/constants/storage"
import { localS } from "@/utils/storage"

export type ICurrentUser = {
	id: string
	name: string
	email: string
	token: string
	company_id: string
}

export type IAuthContext = {
	currentUser: ICurrentUser | null
	isAuthenticated: boolean

	login: (user: ICurrentUser, isSavedLocal?: boolean) => void
	logout: () => void
	setCurrentUser: React.Dispatch<React.SetStateAction<ICurrentUser | null>>
}

export type IAuthProvider = {
	children: React.ReactNode
}

const AuthContext = createContext<IAuthContext | undefined>(undefined)

const useAuthProvider = () => {
	const [currentUser, setCurrentUser] = useState<ICurrentUser | null>(() => localS.get(STORAGE_KEYS.CURRENT_USER))
	const [isAuthenticated, setIsAuthenticated] = useState(() => !!localS.get(STORAGE_KEYS.CURRENT_USER))

	const login = useCallback((user: ICurrentUser, isSaveLocal: boolean = true) => {
		if (isEmpty(user)) return
		if (isSaveLocal) {
			localS.set(STORAGE_KEYS.COMPANY_ID, user?.company_id)
			localS.set(STORAGE_KEYS.CURRENT_USER, user)
			localS.set(STORAGE_KEYS.ACCESS_TOKEN, user?.token)
		}
		setCurrentUser(user)
		setIsAuthenticated(true)
	}, [])

	const logout = useCallback(() => {
		localS.clearAll()
		setCurrentUser(null)
		setIsAuthenticated(false)
	}, [])

	return useMemo(
		() => ({
			currentUser,
			isAuthenticated,
			login,
			logout,
			setCurrentUser,
		}),
		[isAuthenticated, currentUser, login, logout, setCurrentUser],
	)
}

export const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
	const value = useAuthProvider()

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider")
	}
	return context
}

export default AuthContext
