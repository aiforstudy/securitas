import React from "react"
import { useLocation } from "react-router-dom"

import { ChevronRight } from "lucide-react"

import { Menubar, MenubarContent, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"
import { PATH } from "@/constants/path"
import usePermissions from "@/hooks/usePermissions"
import { cn } from "@/lib/utils"

import { Button } from "../ui/button"
import { SidebarGroupContent } from "../ui/sidebar"
import RenderButton from "./RenderButton"
import RenderSubmenuItems from "./RenderSubmenuItems"
import { ISidebarChildren } from "./useSideBarItems"

type IRenderSidebarItemProps = {
	items: ISidebarChildren[]
}

const RenderSidebarItem: React.FC<IRenderSidebarItemProps> = ({ items }) => {
	const { pathname } = useLocation()
	const { checkPermission } = usePermissions([])

	return (
		<SidebarGroupContent>
			{items.map((child) => {
				const canRender = !child.allowPermission || checkPermission(child.allowPermission ?? [])
				return (
					<React.Fragment key={`sidebar-item-${child.label}`}>
						{canRender ? (
							<>
								{!child.submenu ? (
									<div className="px-1">
										<RenderButton label={child.label} justify="start" path={child.path} />
									</div>
								) : (
									<Menubar className="border-none">
										<MenubarMenu>
											<MenubarTrigger className="w-full border-none bg-sidebar" asChild>
												<Button
													variant="ghost"
													className={cn("!rounded-md text-md justify-between w-full cursor-pointer", {
														"bg-accent text-accent-foreground":
															pathname !== PATH.BASE_URL && pathname.startsWith(child.path || ""),
													})}
												>
													{child.label}
													<ChevronRight />
												</Button>
											</MenubarTrigger>
											<MenubarContent
												style={{ boxShadow: "0px 2px 10px 0px #00000026" }}
												side="right"
												sideOffset={14}
												className="rounded-2xl border-none py-5 px-3 min-w-64 space-y-2"
											>
												<RenderSubmenuItems submenu={child.submenu} />
											</MenubarContent>
										</MenubarMenu>
									</Menubar>
								)}
							</>
						) : null}
					</React.Fragment>
				)
			})}
		</SidebarGroupContent>
	)
}

export default RenderSidebarItem
