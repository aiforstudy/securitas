import React from "react"

import { SidebarGroup } from "../ui/sidebar"
import RenderButton from "./RenderButton"
import RenderSidebarItem from "./RenderSidebarItem"
import RenderSidebarLabel from "./RenderSidebarLabel"
import { currentRoles, ISidebarItem } from "./useSideBarItems"

type IRenderSidebarItemsProps = {
	items: ISidebarItem[]
}

const RenderSidebarItems: React.FC<IRenderSidebarItemsProps> = ({ items }) => {
	return (
		<>
			{items.map((item) => {
				const hasChildren = item.children && item.children.length > 0
				const canRender = !item.roles || item.roles.some((role) => currentRoles.includes(role))
				return canRender ? (
					<SidebarGroup className="border-none py-2 px-4" key={`sidebar-group-${item.label}`}>
						{!hasChildren && (
							<div className="pr-1">
								<RenderButton label={item.label} justify="start" icon={item.icon} path={item.path} />
							</div>
						)}
						{hasChildren && canRender && (
							<>
								<RenderSidebarLabel label={item.label} icon={item.icon} path={item.path} prefixPath={item.prefixPath} />
								<RenderSidebarItem items={item.children || []} />
							</>
						)}
					</SidebarGroup>
				) : null
			})}
		</>
	)
}

export default RenderSidebarItems
