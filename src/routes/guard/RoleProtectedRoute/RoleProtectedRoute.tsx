import React from "react"
import { Navigate } from "react-router-dom"

import { PATH } from "@/constants/path"
import { useAuth } from "@/contexts/auth.context"
import { ERole } from "@/enums/permissions"

interface RoleProtectedRouteProps {
	element: React.ReactNode
	allowedRoles: ERole[]
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({ element, allowedRoles }) => {
	const { currentUser } = useAuth()
	const hasAccess = currentUser?.role && allowedRoles.includes(currentUser?.role)
	return hasAccess ? element : <Navigate to={PATH.FORBIDDEN} />
}

export default RoleProtectedRoute
