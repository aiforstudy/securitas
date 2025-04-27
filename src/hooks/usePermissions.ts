import { useMemo } from "react"

import { useAuth } from "@/contexts/auth.context"

export type IPermission = string[]

const usePermissions = (allowPermission: IPermission) => {
	const { currentUser } = useAuth()
	const userPermissions = currentUser?.permissions

	return useMemo(() => {
		if (!userPermissions?.length || !allowPermission.length) return false

		const permissionsList: string[] = []
		userPermissions.forEach((_) => {
			_.actions.forEach((action) => permissionsList.push(`${_.resource}.${action}`))
		})

		return permissionsList.some((permission) => allowPermission.includes(permission))
	}, [allowPermission, userPermissions])
}

export default usePermissions
