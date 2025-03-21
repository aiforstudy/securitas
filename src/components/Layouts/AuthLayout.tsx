import React, { memo } from "react"
import { Outlet } from "react-router-dom"

interface AuthLayoutProps {
	children?: React.ReactNode
	backgroundImageUrl?: string // URL of the background image
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, backgroundImageUrl }) => {
	return (
		<div className="w-screen min-h-screen flex justify-center bg-[#101519;]">
			<div className={`w-full h-auto flex flex-col items-center ${backgroundImageUrl ? "" : "max-w-[1440px]"}`}>
				{children}
				<Outlet />
			</div>
		</div>
	)
}

export default memo(AuthLayout)
