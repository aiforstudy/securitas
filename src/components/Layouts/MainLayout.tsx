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
				<div className="relative mt-[77px] p-4 overflow-y-auto" style={{ minHeight: "calc(100vh - 77px)" }}>
					{children}
					<Outlet />
				</div>
			</main>
		</SidebarProvider>
	)
}

export default memo(MainLayout)
