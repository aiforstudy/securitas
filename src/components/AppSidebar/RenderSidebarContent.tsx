import React from "react"

import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { SidebarContent } from "../ui/sidebar"
import RenderSidebarItems from "./RenderSidebarItems"
import { ISidebarItem } from "./useSideBarItems"

type IRenderSidebarContentProps = {
	items: ISidebarItem[]
}

const RenderSidebarContent: React.FC<IRenderSidebarContentProps> = ({ items }) => {
	return (
		<SidebarContent>
			<ScrollArea className="h-full">
				<RenderSidebarItems items={items} />
				<ScrollBar orientation="vertical" />
			</ScrollArea>
		</SidebarContent>
	)
}

export default RenderSidebarContent
