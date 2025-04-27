import { useMutation, useQuery } from "@tanstack/react-query"

import { type Options, RolesControllerFindOneData } from "@/api-generated"
import {
	rolesControllerCreateMutation,
	rolesControllerFindAllOptions,
	rolesControllerFindAllQueryKey,
	rolesControllerFindOneOptions,
	rolesControllerFindOneQueryKey,
	rolesControllerGetPermissionsOptions,
	rolesControllerGetPermissionsQueryKey,
	rolesControllerRemoveMutation,
	rolesControllerUpdateMutation,
} from "@/api-generated/@tanstack/react-query.gen"

export const useGetRoles = () => {
	return {
		...useQuery({ ...rolesControllerFindAllOptions() }),
		queryKey: rolesControllerFindAllQueryKey(),
	}
}

export const useGetPermissions = () => {
	return {
		...useQuery({ ...rolesControllerGetPermissionsOptions() }),
		queryKey: rolesControllerGetPermissionsQueryKey(),
	}
}

export const useGetRole = (queryOptions: Options<RolesControllerFindOneData>) => {
	return {
		...useQuery({
			...rolesControllerFindOneOptions({ path: queryOptions.path }),
			enabled: !!queryOptions.path,
		}),
		queryKey: rolesControllerFindOneQueryKey({ path: queryOptions.path }),
	}
}

export const useCreateRole = () => {
	const mutationOptions = rolesControllerCreateMutation()
	return useMutation({ ...mutationOptions })
}

export const useUpdateRole = () => {
	const mutationOptions = rolesControllerUpdateMutation()
	return useMutation({ ...mutationOptions })
}

export const useDeleteRole = () => {
	const mutationOptions = rolesControllerRemoveMutation()
	return useMutation({ ...mutationOptions })
}

type UseRoleApiOptions = {
	path?: Options<RolesControllerFindOneData>["path"]
}

const useRoleApi = (options: UseRoleApiOptions = {}) => {
	const role = useGetRole({ path: options.path! })
	const roles = useGetRoles()
	const createRole = useCreateRole()
	const updateRole = useUpdateRole()
	const deleteRole = useDeleteRole()
	const permissions = useGetPermissions()

	return {
		role,
		roles,
		createRole,
		updateRole,
		deleteRole,
		permissions,
	}
}

export default useRoleApi
