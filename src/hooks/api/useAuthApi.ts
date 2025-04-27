import { useMutation, useQuery } from "@tanstack/react-query"

import {
	authControllerGetPermissionsOptions,
	authControllerGetPermissionsQueryKey,
	authControllerLoginMutation,
	authControllerRegisterMutation,
} from "@/api-generated/@tanstack/react-query.gen"

export const useLogin = () => {
	const mutationOptions = authControllerLoginMutation()
	return useMutation({ ...mutationOptions })
}

export const useRegister = () => {
	const mutationOptions = authControllerRegisterMutation()
	return useMutation({ ...mutationOptions })
}

export const useGetPermissions = () => {
	const query = useQuery({ ...authControllerGetPermissionsOptions() })
	const queryKey = authControllerGetPermissionsQueryKey()

	return { ...query, queryKey }
}

const useAuthApi = () => {
	const login = useLogin()
	const register = useRegister()
	const permissions = useGetPermissions()

	return {
		login,
		register,
		permissions,
	}
}

export default useAuthApi
