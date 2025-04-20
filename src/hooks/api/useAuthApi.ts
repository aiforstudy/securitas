import { useMutation, useQuery } from "@tanstack/react-query"

import {
	authControllerGetPermissionsOptions,
	authControllerGetPermissionsQueryKey,
	authControllerLoginMutation,
	authControllerRegisterMutation,
} from "@/api-generated/@tanstack/react-query.gen"

export const useLogin = (onSuccess?: (data: unknown) => void, onError?: (error: Error) => void) => {
	const mutationOptions = authControllerLoginMutation()
	return useMutation({ ...mutationOptions, onSuccess, onError })
}

export const useRegister = (onSuccess?: (data: unknown) => void, onError?: (error: Error) => void) => {
	const mutationOptions = authControllerRegisterMutation()
	return useMutation({ ...mutationOptions, onSuccess, onError })
}

export const useGetPermissions = () => {
	return {
		...useQuery({ ...authControllerGetPermissionsOptions() }),
		queryKey: authControllerGetPermissionsQueryKey(),
	}
}

type UseAuthApiOptions = {
	onLoginSuccess?: (data: unknown) => void
	onLoginError?: (error: Error) => void
	onRegisterSuccess?: (data: unknown) => void
	onRegisterError?: (error: Error) => void
}

const useAuthApi = ({ onLoginSuccess, onLoginError, onRegisterSuccess, onRegisterError }: UseAuthApiOptions) => {
	const login = useLogin(onLoginSuccess, onLoginError)
	const register = useRegister(onRegisterSuccess, onRegisterError)
	const getPermissions = useGetPermissions()

	return {
		login,
		register,
		getPermissions,
	}
}

export default useAuthApi
