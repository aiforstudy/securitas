import React from "react"

import { ScrollArea } from "../ui/scroll-area"
import { SidebarContent } from "../ui/sidebar"
import RenderSidebarItems from "./RenderSidebarItems"
import { ISidebarItem } from "./useSideBarItems"

type IRenderSidebarContentProps = {
	items: ISidebarItem[]
}

const RenderSidebarContent: React.FC<IRenderSidebarContentProps> = ({ items }) => {
	return (
		<SidebarContent className="py-5">
			<ScrollArea>
				<RenderSidebarItems items={items} />
			</ScrollArea>
		</SidebarContent>
	)
}

export default RenderSidebarContent
