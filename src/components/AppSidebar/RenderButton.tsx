import { useLocation, useNavigate } from "react-router-dom"

import { cn } from "@/lib/utils"

import { Button } from "../ui/button"

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

	const handleClick = () => {
		if (path) navigate(path)
	}

	return (
		<Button
			variant="ghost"
			onClick={handleClick}
			className={cn("justify-start w-full cursor-pointer hover:bg-gray-200", {
				"justify-start": justify === "start",
				"justify-center": justify === "center",
				"justify-end": justify === "end",
				"justify-between": justify === "between",
				"bg-gray-200 text-accent-foreground": isActive,
			})}
		>
			{icon && justifyIcon === "start" && icon}
			{label}
			{icon && justifyIcon === "end" && icon}
		</Button>
	)
}

export default RenderButton
