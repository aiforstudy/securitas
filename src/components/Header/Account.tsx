import React from "react"

import { User } from "lucide-react"

import { useAuth } from "@/contexts/auth.context"

const Account: React.FC = () => {
	const { currentUser } = useAuth()

	return (
		<div className="flex items-center gap-2">
			<div className="cursor-pointer w-[36px] h-[36px] rounded-md bg-gray-200  justify-center flex items-center gap-3">
				<User className="w-5 h-5" />
			</div>
			<div className="h-full flex flex-col justify-between">
				<p className="font-semibold text-base">{currentUser?.name || currentUser?.email}</p>
				<p className="text-sidebar-foreground/70 text-[12px] font-light">{currentUser?.role}</p>
			</div>
		</div>
	)
}

export default Account
