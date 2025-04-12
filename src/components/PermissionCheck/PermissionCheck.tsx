import * as React from "react"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import usePermissions, { IPermission } from "@/hooks/usePermissions"

export type PermissionCheckProps = React.PropsWithChildren<{
	allowPermission: IPermission
	hideIfDoNotHavePermission?: boolean
}>

const PermissionCheck: React.FC<PermissionCheckProps> = ({
	children,
	allowPermission,
	hideIfDoNotHavePermission = false,
}) => {
	const hasPermission = usePermissions(allowPermission)
	const canAccess = !allowPermission || hasPermission

	if (!canAccess) {
		if (hideIfDoNotHavePermission) {
			return null
		}
		return (
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<div className="w-fit cursor-not-allowed opacity-80">
							<div className="w-fit pointer-events-none text-gray-400">{children}</div>
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
