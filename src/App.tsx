import { useEffect } from "react"

import { useQuery } from "@tanstack/react-query"

import GlobalConfirmDialog from "@/components/GlobalConfirmDialog"
import useAppConfig from "@/hooks/useAppConfig"
import useRouterElements from "@/routes/useRouterElements"

import { companyControllerFindAllOptions } from "./api-generated/@tanstack/react-query.gen"
import { useAuth } from "./contexts/auth.context"

export default function App() {
	useAppConfig()
	const routeElements = useRouterElements()
	const { currentUser, isAuthenticated } = useAuth()

	const { data: company } = useQuery({
		...companyControllerFindAllOptions({ query: { page: 1, limit: 10 } }),
		enabled: isAuthenticated,
	})
	console.log("🚀 ~ App.tsx:18 ~ company:", company)

	useEffect(() => {
		if (currentUser && isAuthenticated) {
			console.log("🚀 ~ App.tsx:23 ~ currentUser:", currentUser)
		}
	}, [currentUser, isAuthenticated])

	return (
		<>
			<div className="min-h-screen">{routeElements}</div>
			<GlobalConfirmDialog />
		</>
	)
}
