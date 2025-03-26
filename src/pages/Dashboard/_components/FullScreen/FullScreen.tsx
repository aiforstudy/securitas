import React from "react"

import { Maximize, Minimize } from "lucide-react"

import { Button } from "@/components/ui/button"
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Tooltip } from "@/components/ui/tooltip"

type IFullscreenProps = {
	isFullscreen: boolean
	toggleFullScreen: () => void
}

const FullScreen: React.FC<IFullscreenProps> = ({ isFullscreen, toggleFullScreen }) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button onClick={toggleFullScreen} variant="outline" className="w-10 h-10">
						{isFullscreen ? <Minimize className="size-5" /> : <Maximize className="size-5" />}
					</Button>
				</TooltipTrigger>
				<TooltipContent side="left" align="center">
					<p className="text-md font-medium">Fullscreen view</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

export default FullScreen
