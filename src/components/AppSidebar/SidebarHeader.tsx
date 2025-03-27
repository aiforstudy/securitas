import { SidebarHeader as SidebarHeaderUI, useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const SidebarHeader = () => {
	const { open } = useSidebar()
	return (
		<SidebarHeaderUI className="px-0 py-0">
			<div className="px-5 border-b-[1px] border-b-input h-[77px] flex justify-between items-center">
				<div className="flex items-center gap-2">
					<div className="cursor-pointer w-[50px] h-[50px] rounded-md bg-gray-200  justify-center flex items-center gap-3"></div>
					<div className={cn("text-2xl font-bold transition-all duration-200 ease-linear", { hidden: !open })}>
						Ez Securitas
					</div>
				</div>
			</div>
		</SidebarHeaderUI>
	)
}

export default SidebarHeader
