import React from "react"
import { Outlet } from "react-router-dom"

import { PATH } from "@/constants/path"

import withAuthGuard from "../withAuthGuard"

const ProtectedRoute: React.FC = () => <Outlet />

const checkCondition = (isAuthenticated: boolean) => {
	return isAuthenticated
}

const GuardedProtectedRoute = withAuthGuard(ProtectedRoute, checkCondition, PATH.AUTHENTICATION.LOGIN)

export default GuardedProtectedRoute
