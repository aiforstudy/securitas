import React from "react"
import { Navigate } from "react-router-dom"

import { useAuth } from "@/contexts/auth.context"

const withAuthGuard = (
	Component: React.FC,
	checkCondition: (isAuthenticated: boolean) => boolean,
	redirectTo: string,
) => {
	return () => {
		const { isAuthenticated } = useAuth()

		return checkCondition(isAuthenticated) ? <Component /> : <Navigate to={redirectTo} />
	}
}

export default withAuthGuard
