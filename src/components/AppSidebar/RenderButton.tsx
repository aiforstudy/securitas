import { useLocation, useNavigate } from "react-router-dom"

import { cn } from "@/lib/utils"

import { Button } from "../ui/button"
import { useSidebar } from "../ui/sidebar"

const RenderButton: React.FC<{
	label: string
	justify?: "start" | "center" | "end" | "between"
	icon?: React.ReactNode
	justifyIcon?: "start" | "end"
	path?: string
}> = ({ label, justify = "center", icon, justifyIcon = "start", path }) => {
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const isActive = pathname === path
	const { open } = useSidebar()
	const onlyIcon = open ? justify : "center"

	const handleClick = () => {
		if (path) navigate(path)
	}

	return (
		<Button
			variant="ghost"
			onClick={handleClick}
			className={cn("justify-start w-full cursor-pointer hover:bg-gray-200", {
				"justify-start": onlyIcon === "start",
				"justify-center": onlyIcon === "center",
				"justify-end": onlyIcon === "end",
				"justify-between": onlyIcon === "between",
				"bg-gray-200 text-accent-foreground": isActive,
			})}
		>
			{icon && justifyIcon === "start" && icon}
			{open && label}
			{icon && justifyIcon === "end" && icon}
		</Button>
	)
}

export default RenderButton
