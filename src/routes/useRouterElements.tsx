import React from "react"
import { Navigate, useRoutes } from "react-router-dom"

import FallbackLoader from "@/components/FallbackLoader"
import { AuthLayout, MainLayout } from "@/components/Layouts"
import { PATH } from "@/constants/path"
import LoginPage from "@/pages/Authentication/Login"
import ComingSoonPage from "@/pages/ComingSoon/ComingSoonPage"
import DashboardPage from "@/pages/Dashboard"
import DetectionsPage from "@/pages/Detections/DetectionsPage"
import LiveViewPage from "@/pages/LiveView/LiveViewPage"

import GuardedProtectedRoute from "./guard/ProtectedRoute/ProtectedRoute"
import GuardedRejectedRoute from "./guard/RejectedRoute/RejectedRoute"

// import RoleProtectedRoute from "./guard/RoleProtectedRoute"

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
	const elements = useRoutes([
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
									element: withSuspense(ComingSoonPage),
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
									element: withSuspense(ComingSoonPage),
								},
							],
						},
					],
				},
			],
		},
		{
			path: PATH.FORBIDDEN,
			element: <div>403</div>,
		},
		{
			path: "*",
			element: <div>404</div>,
		},
	])
	return elements
}

export default useRouterElements
