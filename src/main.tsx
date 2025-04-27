import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter as ReactRouterProvider } from "react-router-dom"

import { QueryClientProvider as ReactQueryProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { APIProvider as ReactGoogleMapProvider } from "@vis.gl/react-google-maps"
import { CircleAlertIcon, CircleCheckIcon, CircleXIcon, InfoIcon, LoaderCircleIcon } from "lucide-react"

import ErrorBoundary from "@/components/ErrorBoundary"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AuthProvider } from "@/contexts/auth.context"
import { LangProvider } from "@/contexts/lang.context"

import { client } from "./api-generated/client.gen.ts"
import App from "./App.tsx"
import { CONFIG } from "./constants/config.ts"
import { STORAGE_KEYS } from "./constants/storage.ts"
import "./i18n/i18n"
import "./index.css"
import queryClient from "./utils/query.ts"
import { localS } from "./utils/storage.ts"

client.setConfig({
	baseURL: CONFIG.API_URL,
	headers: {
		Authorization: `Bearer ${localS.get(STORAGE_KEYS.ACCESS_TOKEN)}`,
	},
})

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ReactRouterProvider>
			<ErrorBoundary>
				<ReactGoogleMapProvider apiKey={CONFIG.GOOGLE_MAP_API_KEY}>
					<ReactQueryProvider client={queryClient}>
						<LangProvider>
							<AuthProvider>
								<TooltipProvider>
									<App />
									<SonnerToaster
										icons={{
											info: <InfoIcon color="#3b82f6" className="w-4 h-4" />,
											error: <CircleXIcon color="#ef4444" className="w-4 h-4" />,
											success: <CircleCheckIcon color="#10b981" className="w-4 h-4" />,
											warning: <CircleAlertIcon color="#f59e0b" className="w-4 h-4" />,
											loading: <LoaderCircleIcon className="w-4 h-4 animate-spin" />,
										}}
										position="top-right"
									/>
									<ReactQueryDevtools position="bottom" initialIsOpen={false} buttonPosition="bottom-right" />
								</TooltipProvider>
							</AuthProvider>
						</LangProvider>
					</ReactQueryProvider>
				</ReactGoogleMapProvider>
			</ErrorBoundary>
		</ReactRouterProvider>
	</StrictMode>,
)
