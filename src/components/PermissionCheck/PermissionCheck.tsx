import * as React from "react"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import usePermissions, { IPermission } from "@/hooks/usePermissions"
import { cn } from "@/lib/utils"

export type PermissionCheckProps = React.PropsWithChildren<{
	fullWidth?: boolean
	allowPermission: IPermission
	hideIfDoNotHavePermission?: boolean
}>

const PermissionCheck: React.FC<PermissionCheckProps> = ({
	children,
	fullWidth = false,
	allowPermission,
	hideIfDoNotHavePermission = false,
}) => {
	const { hasPermission } = usePermissions(allowPermission)
	const canAccess = !allowPermission || hasPermission

	if (!canAccess) {
		if (hideIfDoNotHavePermission) {
			return null
		}
		return (
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<div className={cn("w-fit cursor-not-allowed opacity-80", { "w-full": fullWidth })}>
							<div className={cn("w-fit pointer-events-none text-gray-400", { "w-full": fullWidth })}>{children}</div>
						</div>
					</TooltipTrigger>
					<TooltipContent>
						<p>You don't have permission</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		)
	}

	return <>{children}</>
}

export default PermissionCheck
