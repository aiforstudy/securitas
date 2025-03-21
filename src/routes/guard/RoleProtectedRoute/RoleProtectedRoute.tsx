import React from "react"
import { Navigate } from "react-router-dom"

import { PATH } from "@/constants/path"

interface RoleProtectedRouteProps {
	element: React.ReactNode
	allowedRoles: string[]
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({ element, allowedRoles }) => {
	const userRoles = ["ADMIN", "SUPER_ADMIN"]
	const hasAccess = userRoles.length && allowedRoles.some((role) => userRoles.includes(role))

	return hasAccess ? element : <Navigate to={PATH.FORBIDDEN} />
}

export default RoleProtectedRoute
