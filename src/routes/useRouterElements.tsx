import React, { useMemo } from "react"
import { Navigate, RouteObject, useRoutes } from "react-router-dom"

import FallbackLoader from "@/components/FallbackLoader"
import { AuthLayout, MainLayout } from "@/components/Layouts"
import { PATH } from "@/constants/path"
import PERMISSIONS from "@/constants/permissions"
import { useAuth } from "@/contexts/auth.context"
import LoginPage from "@/pages/Authentication/Login"
import CamerasPage from "@/pages/Cameras/CamerasPage"
import ComingSoonPage from "@/pages/ComingSoon/ComingSoonPage"
import CompaniesPage from "@/pages/Companies/CompaniesPage"
import DashboardPage from "@/pages/Dashboard"
import DetectionsPage from "@/pages/Detections/DetectionsPage"
import ForbiddenPage from "@/pages/Forbidden/ForbiddenPage"
import LiveViewPage from "@/pages/LiveView/LiveViewPage"
import NotFoundPage from "@/pages/NotFound/NotFoundPage"
import RoleSettingsPage from "@/pages/RoleSettings"
import SmartLocksPage from "@/pages/SmartLocks/SmartLocksPage"

import GuardedProtectedRoute from "./guard/ProtectedRoute/ProtectedRoute"
import GuardedRejectedRoute from "./guard/RejectedRoute/RejectedRoute"
import RoleProtectedRoute from "./guard/RoleProtectedRoute"

const withSuspense = (Component: React.ComponentType) => {
	return (
		<React.Suspense
			fallback={<FallbackLoader className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
		>
			<Component />
		</React.Suspense>
	)
}

const useRouterElements = () => {
	const { currentUser } = useAuth()
	const routes = useMemo(() => {
		const defaultRoutes: RouteObject[] = [
			{
				path: "",
				element: <GuardedRejectedRoute />,
				children: [
					{
						path: "",
						element: <AuthLayout />,
						children: [
							{
								path: PATH.AUTHENTICATION.LOGIN,
								element: withSuspense(LoginPage),
							},
						],
					},
				],
			},
			{
				path: PATH.FORBIDDEN,
				element: withSuspense(ForbiddenPage),
			},
			{
				path: "*",
				element: withSuspense(NotFoundPage),
			},
		]
		const authenticatedRoutes: RouteObject[] = [
			{
				path: "",
				element: <GuardedProtectedRoute />,
				children: [
					{
						path: "",
						element: <MainLayout />,
						children: [
							{
								path: PATH.BASE_URL,
								index: true,
								element: <Navigate to={PATH.MONITORING.DASHBOARD} replace />,
							},
							{
								path: PATH.MONITORING.ROOT,
								children: [
									{
										path: PATH.MONITORING.DASHBOARD,
										index: true,
										element: withSuspense(DashboardPage),
									},
									{
										path: PATH.MONITORING.ANALYTICS,
										element: withSuspense(ComingSoonPage),
									},
									{
										path: PATH.MONITORING.LIVE_VIEW,
										element: withSuspense(LiveViewPage),
									},
								],
							},
							{
								path: PATH.DEVICES.ROOT,
								children: [
									{
										path: PATH.DEVICES.CAMERAS.ROOT,
										element: withSuspense(CamerasPage),
									},
									{
										path: PATH.DEVICES.SMART_LOCKS.ROOT,
										element: withSuspense(SmartLocksPage),
									},
								],
							},
							{
								path: PATH.OPERATIONS.ROOT,
								children: [
									{
										path: PATH.OPERATIONS.MAP_CONFIGURATION,
										element: withSuspense(ComingSoonPage),
									},
									{
										path: PATH.OPERATIONS.DEVICE_STATUS,
										element: withSuspense(ComingSoonPage),
									},
									{
										path: PATH.OPERATIONS.DETECTIONS,
										element: withSuspense(DetectionsPage),
									},
									{
										path: PATH.OPERATIONS.LOGS,
										element: withSuspense(ComingSoonPage),
									},
									{
										path: PATH.OPERATIONS.KNOWLEDGE_BASE,
										element: withSuspense(ComingSoonPage),
									},
								],
							},
							{
								path: PATH.SYSTEM.ROOT,
								children: [
									{
										path: PATH.SYSTEM.ADMINISTRATION,
										element: withSuspense(ComingSoonPage),
									},
									{
										path: PATH.SYSTEM.ROLE_SETTINGS,
										element: (
											<RoleProtectedRoute
												element={withSuspense(RoleSettingsPage)}
												allowPermission={[PERMISSIONS.ROLE.READ]}
											/>
										),
									},
									{
										path: PATH.SYSTEM.COMPANIES,
										element: (
											<RoleProtectedRoute
												element={withSuspense(CompaniesPage)}
												allowPermission={[PERMISSIONS.COMPANY.READ]}
											/>
										),
									},
								],
							},
						],
					},
				],
			},
		]

		return defaultRoutes.concat(currentUser?.permissions ? authenticatedRoutes : [])
	}, [currentUser?.permissions])

	const elements = useRoutes(routes)

	return elements
}

export default useRouterElements
