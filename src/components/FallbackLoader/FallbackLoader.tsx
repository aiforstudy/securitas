import React, { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

export type IFallbackLoaderProps = {
	isLoading?: boolean
	className?: HTMLAttributes<HTMLDivElement>["className"]
}

const FallbackLoader: React.FC<IFallbackLoaderProps> = ({ isLoading = true, className }) => {
	return isLoading ? (
		<div className={cn("flex items-center justify-center h-full w-full", className)}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="lucide lucide-loader-circle text-primary animate-spin h-10 w-10"
			>
				<path d="M21 12a9 9 0 1 1-6.219-8.56" />
			</svg>
		</div>
	) : null
}

export default FallbackLoader
