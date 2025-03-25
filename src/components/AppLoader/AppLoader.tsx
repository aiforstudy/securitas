import React, { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

type IAppLoaderProps = {
	isLoading?: boolean
}

const AppLoader: React.FC<IAppLoaderProps> = ({ isLoading = false }) => {
	const [visible, setVisible] = useState(isLoading)

	useEffect(() => {
		let timeout: NodeJS.Timeout
		if (isLoading) {
			setVisible(true)
		} else {
			timeout = setTimeout(() => setVisible(false), 300)
		}
		return () => clearTimeout(timeout)
	}, [isLoading])

	if (!visible) return null

	return (
		<div
			className={cn(
				"fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300",
				{
					"opacity-100": isLoading,
					"opacity-0": !isLoading,
				},
			)}
		>
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
	)
}

export default AppLoader
