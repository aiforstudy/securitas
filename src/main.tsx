import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter as ReactRouterProvider } from "react-router-dom"

import { QueryClient, QueryClientProvider as ReactQueryProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { APIProvider as ReactGoogleMapProvider } from "@vis.gl/react-google-maps"

import ErrorBoundary from "@/components/ErrorBoundary"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AuthProvider } from "@/contexts/auth.context"
import { LangProvider } from "@/contexts/lang.context"

import App from "./App.tsx"
import "./i18n/i18n"
import "./index.css"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 3,
		},
	},
})

console.log(import.meta.env.VITE_GOOGLE_MAP_API_KEY)

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ReactRouterProvider>
			<ErrorBoundary>
				<ReactGoogleMapProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
					<ReactQueryProvider client={queryClient}>
						<LangProvider>
							<AuthProvider>
								<TooltipProvider>
									<App />
									<SonnerToaster position="top-right" />
									<ReactQueryDevtools initialIsOpen={false} />
								</TooltipProvider>
							</AuthProvider>
						</LangProvider>
					</ReactQueryProvider>
				</ReactGoogleMapProvider>
			</ErrorBoundary>
		</ReactRouterProvider>
	</StrictMode>,
)
