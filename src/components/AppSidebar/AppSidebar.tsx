import React, { memo } from "react"
import { useLocation } from "react-router-dom"

import { Sidebar } from "../ui/sidebar"
import RenderSidebarContent from "./RenderSidebarContent"
import SidebarFooter from "./SidebarFooter"
import SidebarHeader from "./SidebarHeader"
import { useSideBarItems } from "./useSideBarItems"

const AppSidebar: React.FC = () => {
	const { pathname } = useLocation()

	const sidebarItems = useSideBarItems()

	React.useEffect(() => {
		const prefixPath = pathname.split("/")[1]
		const activeElement = document.getElementById(prefixPath)
		if (activeElement) {
			activeElement.scrollIntoView({ behavior: "smooth", block: "center" })
		}
	}, [pathname])

	return (
		<Sidebar>
			<SidebarHeader />
			<RenderSidebarContent items={sidebarItems} />
			<SidebarFooter />
		</Sidebar>
	)
}

export default memo(AppSidebar)
