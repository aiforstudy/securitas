import React, { memo } from "react"
import { Outlet } from "react-router-dom"

import { AppSidebar } from "@/components/AppSidebar"
import { Header } from "@/components/Header"
import { SidebarProvider } from "@/components/ui/sidebar"

type IMainLayoutProps = {
	children?: React.ReactNode
}

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="w-full overflow-x-hidden">
				<Header />
				<div className="h-[calc(100vh-77px)] min-h-[calc(100vh-77px)] relative mt-[77px] overflow-y-auto">
					{children}
					<Outlet />
				</div>
			</main>
		</SidebarProvider>
	)
}

export default memo(MainLayout)
