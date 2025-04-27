import { useMutation, useQuery } from "@tanstack/react-query"

import { type Options, UsersControllerFindAllData, UsersControllerFindOneData } from "@/api-generated"
import {
	usersControllerCreateMutation,
	usersControllerFindAllOptions,
	usersControllerFindAllQueryKey,
	usersControllerFindOneOptions,
	usersControllerFindOneQueryKey,
	usersControllerRemoveMutation,
	usersControllerUpdateMutation,
} from "@/api-generated/@tanstack/react-query.gen"

export const useGetUsers = (queryOptions: Options<UsersControllerFindAllData>) => {
	return {
		...useQuery({
			...usersControllerFindAllOptions({ query: queryOptions.query }),
		}),
		queryKey: usersControllerFindAllQueryKey({ query: queryOptions.query }),
	}
}

export const useGetUser = (queryOptions: Options<UsersControllerFindOneData>) => {
	return {
		...useQuery({
			...usersControllerFindOneOptions({ path: queryOptions.path }),
			enabled: !!queryOptions.path,
		}),
		queryKey: usersControllerFindOneQueryKey({ path: queryOptions.path }),
	}
}

export const useCreateUser = () => {
	const mutationOptions = usersControllerCreateMutation()
	return useMutation({ ...mutationOptions })
}

export const useUpdateUser = () => {
	const mutationOptions = usersControllerUpdateMutation()
	return useMutation({ ...mutationOptions })
}

export const useDeleteUser = () => {
	const mutationOptions = usersControllerRemoveMutation()
	return useMutation({ ...mutationOptions })
}

type UseUserApiOptions = {
	path?: Options<UsersControllerFindOneData>["path"]
	query?: Options<UsersControllerFindAllData>["query"]
}

const useUserApi = (options: UseUserApiOptions = {}) => {
	const user = useGetUser({ path: options.path! })
	const users = useGetUsers({ query: options.query })
	const createUser = useCreateUser()
	const updateUser = useUpdateUser()
	const deleteUser = useDeleteUser()

	return {
		user,
		users,
		createUser,
		updateUser,
		deleteUser,
	}
}

export default useUserApi
