import React from "react"

import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "../ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubItem,
	useSidebar,
} from "../ui/sidebar"
import RenderButton from "./RenderButton"
import { currentRoles, ISidebarItem } from "./useSideBarItems"

type IRenderSidebarItemsProps = {
	items: ISidebarItem[]
}

const RenderSidebarItems: React.FC<IRenderSidebarItemsProps> = ({ items }) => {
	const { open } = useSidebar()

	return (
		<SidebarGroup className="py-1 px-5">
			<SidebarMenu>
				{items.map((item) => {
					const canRender = !item.roles || item.roles.some((role) => currentRoles.includes(role))
					const hasChildren = item.children && item.children.length > 0
					return canRender ? (
						<Collapsible key={item.key} asChild defaultOpen={true} className="group/collapsible">
							<SidebarMenuItem>
								<CollapsibleTrigger asChild>
									<Button variant="ghost" size="lg" className="w-full text-md cursor-pointer hover:bg-gray-200">
										{item.icon}
										{open && item.label}
										{hasChildren && (
											<ChevronRight
												className={cn(
													"ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90",
												)}
											/>
										)}
									</Button>
								</CollapsibleTrigger>
								<CollapsibleContent className="my-3">
									<SidebarMenuSub className="gap-3">
										{item.children?.map((subItem) => (
											<SidebarMenuSubItem key={subItem.label}>
												<RenderButton path={subItem.path} icon={subItem.icon} label={subItem.label} justify="start" />
											</SidebarMenuSubItem>
										))}
									</SidebarMenuSub>
								</CollapsibleContent>
							</SidebarMenuItem>
						</Collapsible>
					) : null
				})}
			</SidebarMenu>
		</SidebarGroup>
	)
}

export default RenderSidebarItems
