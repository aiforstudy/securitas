import { useLocation, useNavigate } from "react-router-dom"

import { cn } from "@/lib/utils"

import { MenubarItem } from "../ui/menubar"
import { ISubmenu } from "./useSideBarItems"

type IRenderSubmenuItemsProps = {
	submenu: ISubmenu[]
}

const SubmenuItem = ({ label, path }: ISubmenu) => {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const isActive = pathname === path
	const handleClick = () => {
		if (path) navigate(path)
	}
	return (
		<MenubarItem
			className={cn("!rounded-md cursor-pointer w-full truncate", { "bg-accent text-accent-foreground": isActive })}
			onClick={handleClick}
		>
			{label}
		</MenubarItem>
	)
}

const RenderSubmenuItems: React.FC<IRenderSubmenuItemsProps> = ({ submenu }) => {
	const currentRoles = ["ADMIN", "SUPER_ADMIN"]
	return (
		<>
			{submenu.map((sub) => {
				const canRender = !sub.roles || sub.roles.some((role) => currentRoles.includes(role))
				return canRender ? <SubmenuItem key={`sidebar-submenu-${sub.label}`} {...sub} /> : null
			})}
		</>
	)
}

export default RenderSubmenuItems
