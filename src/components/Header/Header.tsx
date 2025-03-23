import React from "react"

import { PanelLeftClose, PanelLeftOpen } from "lucide-react"

import { SIDEBAR_WIDTH, useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

import { Language } from "../Language"
import { Button } from "../ui/button"
import Account from "./Account"
import BackButton from "./BackButton"
import Settings from "./Settings"

const Header: React.FC = () => {
	const { open, toggleSidebar } = useSidebar()

	return (
		<div className="flex justify-between h-[77px] border-b pr-4 items-center bg-opacity-100 bg-sidebar z-1 fixed right-0 left-0 top-0">
			<div className={cn(`w-[${SIDEBAR_WIDTH}] h-[77px] flex p-4 items-center`)}>
				<div className={cn(`flex w-full gap-4 items-center justify-between`, { hidden: open })}>
					<div className="flex items-center gap-2">
						<div className="cursor-pointer w-[50px] h-[50px] rounded-md bg-gray-200 justify-center flex items-center gap-3"></div>
						<div className={cn("text-2xl font-bold")}>Ez Securitas</div>
					</div>
					<div className="flex items-center justify-end flex-col">
						<Button variant="ghost" size="icon" onClick={toggleSidebar}>
							{open ? <PanelLeftClose className="!w-5 !h-5" /> : <PanelLeftOpen className="!w-5 !h-5" />}
						</Button>
					</div>
				</div>
			</div>
			<div>
				<BackButton />
				<div className="flex items-center gap-4">
					<Language isHiddenText className="w-[36px] h-[36px] rounded-md" />
					<Settings />
					<Account />
				</div>
			</div>
		</div>
	)
}

export default Header
