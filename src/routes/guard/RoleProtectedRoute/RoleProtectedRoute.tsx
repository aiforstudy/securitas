import React from "react"
import { Navigate } from "react-router-dom"

import { PATH } from "@/constants/path"
import usePermissions from "@/hooks/usePermissions"

interface RoleProtectedRouteProps {
	element: React.ReactNode
	allowPermission: string[]
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({ element, allowPermission }) => {
	const { hasPermission } = usePermissions(allowPermission)
	return hasPermission ? element : <Navigate to={PATH.FORBIDDEN} />
}

export default RoleProtectedRoute
