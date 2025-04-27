import { useMutation, useQuery } from "@tanstack/react-query"

import { type Options, SmartLockEventControllerFindAllData, SmartLockEventControllerFindOneData } from "@/api-generated"
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

export const useCreateSmartLockEvent = () => {
	const mutationOptions = smartLockEventControllerCreateMutation()
	return useMutation({ ...mutationOptions })
}

type UseSmartLockEventApiOptions = {
	path?: Options<SmartLockEventControllerFindOneData>["path"]
	query?: Options<SmartLockEventControllerFindAllData>["query"]
}

const useSmartLockEventApi = (options: UseSmartLockEventApiOptions = {}) => {
	const smartLockEvent = useGetSmartLockEvent({ path: options.path! })
	const smartLockEvents = useGetSmartLockEvents({ query: options.query! })
	const createSmartLockEvent = useCreateSmartLockEvent()

	return {
		smartLockEvent,
		smartLockEvents,
		createSmartLockEvent,
	}
}

export default useSmartLockEventApi
