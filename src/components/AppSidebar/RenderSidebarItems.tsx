import React from "react"

import { ChevronRight } from "lucide-react"

import { useAuth } from "@/contexts/auth.context"
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
import { ISidebarItem } from "./useSideBarItems"

type IRenderSidebarItemsProps = {
	items: ISidebarItem[]
}

const RenderSidebarItems: React.FC<IRenderSidebarItemsProps> = ({ items }) => {
	const { open } = useSidebar()
	const { currentUser } = useAuth()

	return (
		<SidebarGroup className="py-5 px-5">
			<SidebarMenu>
				{items.map((item) => {
					const canRender = !item.roles || item.roles.includes(currentUser?.role ?? "")
					const hasChildren = item.children && item.children.length > 0
					return canRender ? (
						<Collapsible key={item.key || item.label} asChild defaultOpen={true} className="group/collapsible">
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
										{item.children?.map((subItem) => {
											const canRender = !subItem.roles || subItem.roles.includes(currentUser?.role ?? "")
											return canRender ? (
												<SidebarMenuSubItem key={subItem.label}>
													<RenderButton path={subItem.path} icon={subItem.icon} label={subItem.label} justify="start" />
												</SidebarMenuSubItem>
											) : null
										})}
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
