import React from "react"
import { Outlet } from "react-router-dom"

import { PATH } from "@/constants/path"

import withAuthGuard from "../withAuthGuard"

const RejectedRoute: React.FC = () => <Outlet />

const checkCondition = (isAuthenticated: boolean) => {
	return !isAuthenticated
}

const GuardedRejectedRoute = withAuthGuard(RejectedRoute, checkCondition, PATH.BASE_URL)

export default GuardedRejectedRoute
