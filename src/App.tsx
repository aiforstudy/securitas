import GlobalConfirmDialog from "@/components/GlobalConfirmDialog"
import useAppConfig from "@/hooks/useAppConfig"
import useRouterElements from "@/routes/useRouterElements"

import { useAuth } from "./contexts/auth.context"

export default function App() {
	useAppConfig()
	const routeElements = useRouterElements()

	const { currentUser, isAuthenticated } = useAuth()
	console.log("🚀 ~ App.tsx:12 ~ currentUser:", currentUser)
	console.log("🚀 ~ App.tsx:13 ~ isAuthenticated:", isAuthenticated)

	return (
		<>
			<div className="min-h-screen">{routeElements}</div>
			<GlobalConfirmDialog />
		</>
	)
}
