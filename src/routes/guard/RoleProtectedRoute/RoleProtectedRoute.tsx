import React from "react"
import { Navigate } from "react-router-dom"

import { PATH } from "@/constants/path"
import { ERole } from "@/enums/permissions"

interface RoleProtectedRouteProps {
	element: React.ReactNode
	allowedRoles: string[]
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({ element, allowedRoles }) => {
	const userRoles = [ERole.ADMIN]
	const hasAccess = userRoles.length && allowedRoles.some((role) => userRoles.includes(role as ERole))

	return hasAccess ? element : <Navigate to={PATH.FORBIDDEN} />
}

export default RoleProtectedRoute
