import { useMemo } from "react"

import { useAuth } from "@/contexts/auth.context"

export type IPermission = string | string[]

const usePermissions = (allowPermission: IPermission) => {
	const { currentUser } = useAuth()
	const userPermissions = currentUser?.permissions

	return useMemo(() => {
		if (!userPermissions?.length) return false

		return Array.isArray(allowPermission)
			? allowPermission.some((permission) => userPermissions.includes(permission))
			: userPermissions.includes(allowPermission)
	}, [allowPermission, userPermissions])
}

export default usePermissions
