import React from "react"
import { useRoutes } from "react-router-dom"

import FallbackLoader from "@/components/FallbackLoader"
import { AuthLayout, MainLayout } from "@/components/Layouts"
import { PATH } from "@/constants/path"
import AlertsPage from "@/pages/Alerts/Alerts"
import LoginPage from "@/pages/Authentication/Login"
import DashboardPage from "@/pages/Dashboard"
import LiveViewPage from "@/pages/LiveView/LiveView"

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
							element: withSuspense(DashboardPage),
						},
					],
				},
				{
					path: PATH.ALERTS.ROOT,
					element: <MainLayout />,
					children: [
						{
							index: true,
							path: PATH.ALERTS.ROOT,
							element: withSuspense(AlertsPage),
						},
					],
				},
				{
					path: PATH.LIVE_VIEW.ROOT,
					element: <MainLayout />,
					children: [
						{
							index: true,
							path: PATH.LIVE_VIEW.ROOT,
							element: withSuspense(LiveViewPage),
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
