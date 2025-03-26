import React from "react"

import { BrickWall, Gauge, Layers2, LayoutPanelLeft, TabletSmartphone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { TooltipContent } from "@/components/ui/tooltip"
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip"
import { TooltipProvider } from "@/components/ui/tooltip"

import FullScreen from "../FullScreen"

type IGroupButtonsRightProps = {
	isFullscreen: boolean
	toggleFullscreen: () => void
}

const GroupButtonsRight: React.FC<IGroupButtonsRightProps> = ({ isFullscreen, toggleFullscreen }) => {
	return (
		<div className="absolute top-[10px] right-[10px]">
			<div className="flex flex-col gap-[10px]">
				<FullScreen isFullscreen={isFullscreen} toggleFullScreen={toggleFullscreen} />

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="outline" size="icon" className="w-10 h-10">
								<TabletSmartphone className="size-5" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="left" align="center">
							<p className="text-md font-medium">Coming soon</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="outline" size="icon" className="w-10 h-10">
								<Layers2 className="size-5" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="left" align="center">
							<p className="text-md font-medium">Coming soon</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="outline" size="icon" className="w-10 h-10">
								<LayoutPanelLeft className="size-5" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="left" align="center">
							<p className="text-md font-medium">Coming soon</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="outline" size="icon" className="w-10 h-10">
								<BrickWall className="size-5" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="left" align="center">
							<p className="text-md font-medium">Coming soon</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="outline" size="icon" className="w-10 h-10">
								<Gauge className="size-5" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="left" align="center">
							<p className="text-md font-medium">Coming soon</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		</div>
	)
}

export default GroupButtonsRight
