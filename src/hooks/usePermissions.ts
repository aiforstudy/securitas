import { useEffect, useMemo, useState } from "react"

import { useAuth } from "@/contexts/auth.context"

export type IPermission = string[]

const usePermissions = (allowPermission: IPermission) => {
	const { currentUser } = useAuth()
	const userPermissions = currentUser?.permissions
	const [permissions, setPermissions] = useState<string[]>([])

	useEffect(() => {
		if (userPermissions) {
			const list: string[] = []
			userPermissions.forEach((_) => {
				_.actions.forEach((action) => list.push(`${_.resource}.${action}`))
			})
			setPermissions(list)
		}
	}, [userPermissions])

	return useMemo(() => {
		if (!permissions.length || !allowPermission.length) return false

		return permissions.some((permission) => allowPermission.includes(permission))
	}, [allowPermission, permissions])
}

export default usePermissions
