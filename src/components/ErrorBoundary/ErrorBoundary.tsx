import { Component, ErrorInfo, ReactNode } from "react"

type IErrorBoundaryProps = {
	children: ReactNode
	fallback?: ReactNode
}

type IErrorBoundaryState = {
	hasError: boolean
	error: Error | null
}

class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
	constructor(props: IErrorBoundaryProps) {
		super(props)
		this.state = { error: null, hasError: false }
	}

	static getDerivedStateFromError(error: Error): IErrorBoundaryState {
		return { error, hasError: true }
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.error("Error caught by ErrorBoundary:", error)
		console.error("Component stack:", errorInfo.componentStack)
		// Here you could also send the error to an error reporting service
	}

	render(): ReactNode {
		if (this.state.hasError) {
			// Render fallback UI if provided, otherwise default error UI
			return (
				this.props.fallback || (
					<div className="flex flex-col items-center justify-center p-6 rounded-lg bg-destructive/10 text-destructive border border-destructive">
						<h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
						<p className="text-sm mb-4">{this.state.error?.message || "An unexpected error occurred"}</p>
						<button
							onClick={() => this.setState({ hasError: false, error: null })}
							className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm"
						>
							Try again
						</button>
					</div>
				)
			)
		}

		return this.props.children
	}
}

export default ErrorBoundary
