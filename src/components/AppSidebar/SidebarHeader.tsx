import { PanelLeftOpen } from "lucide-react"
import { PanelLeftClose } from "lucide-react"

import { SidebarHeader as SidebarHeaderUI, useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

import { Button } from "../ui/button"

const SidebarHeader = () => {
	const { open, toggleSidebar } = useSidebar()
	return (
		<SidebarHeaderUI className="px-0 py-0">
			<div className="px-4 border-b-[1px] border-b-input h-[77px] flex justify-between items-center">
				<div className="flex items-center gap-2">
					<div className="cursor-pointer w-[50px] h-[50px] rounded-md bg-gray-200  justify-center flex items-center gap-3"></div>
					<div className={cn("text-2xl font-bold", { hidden: !open })}>Ez Securitas</div>
				</div>
				<div className="flex items-center justify-end flex-col">
					<Button variant="ghost" size="icon" onClick={toggleSidebar}>
						{open ? <PanelLeftClose className="!w-5 !h-5" /> : <PanelLeftOpen className="!w-5 !h-5" />}
					</Button>
				</div>
			</div>
		</SidebarHeaderUI>
	)
}

export default SidebarHeader
