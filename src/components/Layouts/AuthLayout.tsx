import React, { memo } from "react"
import { Outlet } from "react-router-dom"

import { cn } from "@/lib/utils"

type IAuthLayoutProps = {
	children?: React.ReactNode
	className?: string
}

const AuthLayout: React.FC<IAuthLayoutProps> = ({ children, className }) => {
	return (
		<div className="w-screen min-h-screen flex justify-center">
			<div className={cn("w-full h-auto flex flex-col items-center", className)}>
				{children}
				<Outlet />
			</div>
		</div>
	)
}

export default memo(AuthLayout)
