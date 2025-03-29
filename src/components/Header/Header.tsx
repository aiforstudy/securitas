import React from "react"

import { PanelLeftClose, PanelLeftOpen } from "lucide-react"

import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_ICON, useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

import CompanySelection from "../CompanySelection"
import { Language } from "../Language"
import { Button } from "../ui/button"
import Account from "./Account"
import BackButton from "./BackButton"
import Notification from "./Notification"
import Settings from "./Settings"

const Header: React.FC = () => {
	const { open, toggleSidebar } = useSidebar()

	return (
		<div
			style={{ paddingLeft: open ? `${SIDEBAR_WIDTH}` : `${SIDEBAR_WIDTH_ICON}` }}
			className={cn(
				`flex justify-between w-full h-[77px] border-b items-center bg-opacity-100 bg-sidebar z-1 fixed top-0 right-0`,
			)}
		>
			<div className="px-4 flex w-full gap-4 items-center">
				<Button variant="ghost" size="icon" onClick={toggleSidebar}>
					{open ? <PanelLeftClose className="!w-5 !h-5" /> : <PanelLeftOpen className="!w-5 !h-5" />}
				</Button>
				<CompanySelection />
			</div>
			<div className="px-5">
				<BackButton />
				<div className="flex items-center gap-4">
					<Language isHiddenText className="w-[36px] h-[36px] rounded-md" />
					<Notification />
					<Settings />
					<Account />
				</div>
			</div>
		</div>
	)
}

export default Header
