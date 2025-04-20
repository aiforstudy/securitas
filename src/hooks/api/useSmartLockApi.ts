import { useMutation, useQuery } from "@tanstack/react-query"

import {
	type Options,
	SmartLock,
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

export const useCreateSmartLock = (onSuccess?: (data: SmartLock) => void, onError?: (error: Error) => void) => {
	const mutationOptions = smartLockControllerCreateMutation()
	return useMutation({ ...mutationOptions, onSuccess, onError })
}

export const useUpdateSmartLock = (onSuccess?: (data: SmartLock) => void, onError?: (error: Error) => void) => {
	const mutationOptions = smartLockControllerUpdateMutation()
	return useMutation({ ...mutationOptions, onSuccess, onError })
}

export const useDeleteSmartLock = (onSuccess?: (data: unknown) => void, onError?: (error: Error) => void) => {
	const mutationOptions = smartLockControllerRemoveMutation()
	return useMutation({ ...mutationOptions, onSuccess, onError })
}

type UseCompanyApiOptions = {
	query?: Options<SmartLockControllerSearchAndPaginateData>["query"]
	path?: Options<SmartLockControllerFindOneData>["path"]
	sn?: string
	onCreateSuccess?: (data: SmartLock) => void
	onCreateError?: (error: Error) => void
	onUpdateSuccess?: (data: SmartLock) => void
	onUpdateError?: (error: Error) => void
	onDeleteSuccess?: (data: unknown) => void
	onDeleteError?: (error: Error) => void
}

const useSmartLockApi = ({
	query,
	path,
	sn,
	onCreateSuccess,
	onCreateError,
	onUpdateSuccess,
	onUpdateError,
	onDeleteSuccess,
	onDeleteError,
}: UseCompanyApiOptions) => {
	const smartLock = useGetSmartLock({ path: path! })
	const smartLocks = useGetSmartLocks({ query: query! })
	const smartLockBySn = useGetSmartLockBySN(sn)
	const allSmartLocks = useGetAllSmartLocks({ query: query! })
	const createSmartLock = useCreateSmartLock(onCreateSuccess, onCreateError)
	const updateSmartLock = useUpdateSmartLock(onUpdateSuccess, onUpdateError)
	const deleteSmartLock = useDeleteSmartLock(onDeleteSuccess, onDeleteError)

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
