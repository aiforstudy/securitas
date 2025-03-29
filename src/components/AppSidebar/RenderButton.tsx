import { useLocation, useNavigate } from "react-router-dom"

import { cn } from "@/lib/utils"

import { Button } from "../ui/button"
import { useSidebar } from "../ui/sidebar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

const RenderButton: React.FC<{
	label: string
	justify?: "start" | "center" | "end" | "between"
	icon?: React.ReactNode
	justifyIcon?: "start" | "end"
	path?: string
	rightIcon?: React.ReactNode
}> = ({ label, justify = "center", icon, justifyIcon = "start", path, rightIcon }) => {
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const isActive = pathname === path
	const { open, state, isMobile } = useSidebar()
	const onlyIcon = open ? justify : "center"

	const handleClick = () => {
		if (path) navigate(path)
	}

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="ghost"
						onClick={handleClick}
						className={cn("justify-start w-full cursor-pointer hover:bg-gray-200 !font-medium", {
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
						{rightIcon && rightIcon}
					</Button>
				</TooltipTrigger>
				<TooltipContent side="right" align="center" hidden={state !== "collapsed" || isMobile}>
					{label}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

export default RenderButton
