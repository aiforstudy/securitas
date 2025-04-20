import { useMutation, useQuery } from "@tanstack/react-query"

import {
	type Options,
	SmartLockEvent,
	SmartLockEventControllerFindAllData,
	SmartLockEventControllerFindOneData,
} from "@/api-generated"
import {
	smartLockEventControllerCreateMutation,
	smartLockEventControllerFindAllOptions,
	smartLockEventControllerFindAllQueryKey,
	smartLockEventControllerFindOneOptions,
	smartLockEventControllerFindOneQueryKey,
} from "@/api-generated/@tanstack/react-query.gen"

export const useGetSmartLockEvents = (queryOptions: Options<SmartLockEventControllerFindAllData>) => {
	return {
		...useQuery({ ...smartLockEventControllerFindAllOptions({ query: queryOptions.query }) }),
		queryKey: smartLockEventControllerFindAllQueryKey({ query: queryOptions.query }),
	}
}

export const useGetSmartLockEvent = (queryOptions: Options<SmartLockEventControllerFindOneData>) => {
	return {
		...useQuery({
			...smartLockEventControllerFindOneOptions({ path: queryOptions.path }),
			enabled: !!queryOptions.path,
		}),
		queryKey: smartLockEventControllerFindOneQueryKey({ path: queryOptions.path }),
	}
}

export const useCreateSmartLockEvent = (
	onSuccess?: (data: SmartLockEvent) => void,
	onError?: (error: Error) => void,
) => {
	const mutationOptions = smartLockEventControllerCreateMutation()
	return useMutation({ ...mutationOptions, onSuccess, onError })
}

type UseSmartLockEventApiOptions = {
	query?: Options<SmartLockEventControllerFindAllData>["query"]
	path?: Options<SmartLockEventControllerFindOneData>["path"]
	onCreateSuccess?: (data: SmartLockEvent) => void
	onCreateError?: (error: Error) => void
}

const useSmartLockEventApi = ({ query, path, onCreateSuccess, onCreateError }: UseSmartLockEventApiOptions) => {
	const smartLockEvent = useGetSmartLockEvent({ path: path! })
	const smartLockEvents = useGetSmartLockEvents({ query: query! })
	const createSmartLockEvent = useCreateSmartLockEvent(onCreateSuccess, onCreateError)

	return {
		smartLockEvent,
		smartLockEvents,
		createSmartLockEvent,
	}
}

export default useSmartLockEventApi
