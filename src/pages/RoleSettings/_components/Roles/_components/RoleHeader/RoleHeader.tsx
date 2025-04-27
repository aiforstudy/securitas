import { useState } from "react"

import { EllipsisIcon } from "lucide-react"

import { Role } from "@/api-generated"
import PermissionCheck from "@/components/PermissionCheck"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import PERMISSIONS from "@/constants/permissions"

type RoleHeaderProps = {
	data: Role
	isDefault: boolean
	onCloneRole: () => void
	onSelectRole: () => void
	onDeleteRole: () => void
}

const RoleHeader = ({ data, isDefault, onCloneRole, onSelectRole, onDeleteRole }: RoleHeaderProps) => {
	const [open, setOpen] = useState(false)

	return (
		<div className="relative w-max">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<div className="flex items-center gap-2 relative">
						<div className="">{data.name}</div>
						<EllipsisIcon className="w-5 h-5 cursor-pointer" onClick={() => setOpen(true)} />
					</div>
				</PopoverTrigger>
				<PopoverContent align="end" sideOffset={8} className="w-auto p-0 border-none shadow-dropdown">
					<div className="p-2 flex flex-col items-center gap-2 w-full min-w-[150px]">
						<PermissionCheck fullWidth allowPermission={[PERMISSIONS.ROLE.CREATE]}>
							<Button size="sm" className="w-full" variant="outline" onClick={() => onCloneRole()}>
								Clone
							</Button>
						</PermissionCheck>
						{!isDefault && (
							<PermissionCheck fullWidth allowPermission={[PERMISSIONS.ROLE.UPDATE]}>
								<Button size="sm" className="w-full" variant="outline" onClick={() => onSelectRole()}>
									Edit
								</Button>
							</PermissionCheck>
						)}
						{!isDefault && (
							<PermissionCheck fullWidth allowPermission={[PERMISSIONS.ROLE.DELETE]}>
								<Button size="sm" className="w-full" variant="destructive" onClick={() => onDeleteRole()}>
									Delete
								</Button>
							</PermissionCheck>
						)}
					</div>
				</PopoverContent>
			</Popover>
		</div>
	)
}

export default RoleHeader
