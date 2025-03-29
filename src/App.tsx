import GlobalConfirmDialog from "@/components/GlobalConfirmDialog"
import useAppConfig from "@/hooks/useAppConfig"
import useRouterElements from "@/routes/useRouterElements"

export default function App() {
	useAppConfig()
	const routeElements = useRouterElements()

	return (
		<>
			<div className="min-h-screen">{routeElements}</div>
			<GlobalConfirmDialog />
		</>
	)
}
