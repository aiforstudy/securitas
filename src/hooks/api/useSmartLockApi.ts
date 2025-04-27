import { useMutation, useQuery } from "@tanstack/react-query"

import {
	type Options,
	SmartLockControllerFindAllData,
	SmartLockControllerFindOneData,
	SmartLockControllerSearchAndPaginateData,
} from "@/api-generated"
import {
	smartLockControllerCreateMutation,
	smartLockControllerFindAllOptions,
	smartLockControllerFindAllQueryKey,
	smartLockControllerFindBySnOptions,
	smartLockControllerFindBySnQueryKey,
	smartLockControllerFindOneOptions,
	smartLockControllerFindOneQueryKey,
	smartLockControllerRemoveMutation,
	smartLockControllerSearchAndPaginateOptions,
	smartLockControllerSearchAndPaginateQueryKey,
	smartLockControllerUpdateMutation,
} from "@/api-generated/@tanstack/react-query.gen"

export const useGetSmartLocks = (queryOptions: Options<SmartLockControllerSearchAndPaginateData>) => {
	return {
		...useQuery({
			...smartLockControllerSearchAndPaginateOptions({ query: queryOptions.query }),
		}),
		queryKey: smartLockControllerSearchAndPaginateQueryKey({ query: queryOptions.query }),
	}
}

export const useGetAllSmartLocks = (queryOptions: Options<SmartLockControllerFindAllData>) => {
	return {
		...useQuery({
			...smartLockControllerFindAllOptions({ query: queryOptions.query }),
		}),
		queryKey: smartLockControllerFindAllQueryKey({ query: queryOptions.query }),
	}
}

export const useGetSmartLock = (queryOptions: Options<SmartLockControllerFindOneData>) => {
	return {
		...useQuery({
			...smartLockControllerFindOneOptions({ path: queryOptions.path }),
			enabled: !!queryOptions.path,
		}),
		queryKey: smartLockControllerFindOneQueryKey({ path: queryOptions.path }),
	}
}

export const useGetSmartLockBySN = (sn?: string) => {
	return {
		...useQuery({
			...smartLockControllerFindBySnOptions({ path: { sn: sn! } }),
			enabled: !!sn,
		}),
		queryKey: smartLockControllerFindBySnQueryKey({ path: { sn: sn! } }),
	}
}

export const useCreateSmartLock = () => {
	const mutationOptions = smartLockControllerCreateMutation()
	return useMutation({ ...mutationOptions })
}

export const useUpdateSmartLock = () => {
	const mutationOptions = smartLockControllerUpdateMutation()
	return useMutation({ ...mutationOptions })
}

export const useDeleteSmartLock = () => {
	const mutationOptions = smartLockControllerRemoveMutation()
	return useMutation({ ...mutationOptions })
}

type UseSmartLockApiOptions = {
	sn?: string
	path?: Options<SmartLockControllerFindOneData>["path"]
	query?: Options<SmartLockControllerSearchAndPaginateData>["query"]
}

const useSmartLockApi = (options: UseSmartLockApiOptions = {}) => {
	const smartLock = useGetSmartLock({ path: options.path! })
	const smartLocks = useGetSmartLocks({ query: options.query! })
	const smartLockBySn = useGetSmartLockBySN(options.sn)
	const allSmartLocks = useGetAllSmartLocks({ query: options.query! })
	const createSmartLock = useCreateSmartLock()
	const updateSmartLock = useUpdateSmartLock()
	const deleteSmartLock = useDeleteSmartLock()

	return {
		smartLock,
		smartLocks,
		smartLockBySn,
		allSmartLocks,
		createSmartLock,
		updateSmartLock,
		deleteSmartLock,
	}
}

export default useSmartLockApi
