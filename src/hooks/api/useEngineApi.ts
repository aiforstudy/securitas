import { useMutation, useQuery } from "@tanstack/react-query"

import { EngineControllerFindAllData, EngineControllerFindOneData, type Options } from "@/api-generated"
import {
	engineControllerCreateMutation,
	engineControllerFindAllOptions,
	engineControllerFindAllQueryKey,
	engineControllerFindOneOptions,
	engineControllerFindOneQueryKey,
	engineControllerRemoveMutation,
	engineControllerUpdateMutation,
} from "@/api-generated/@tanstack/react-query.gen"

export const useGetEngines = (queryOptions: Options<EngineControllerFindAllData>) => {
	return {
		...useQuery({
			...engineControllerFindAllOptions({ query: queryOptions.query }),
		}),
		queryKey: engineControllerFindAllQueryKey({ query: queryOptions.query }),
	}
}

export const useGetEngine = (queryOptions: Options<EngineControllerFindOneData>) => {
	return {
		...useQuery({
			...engineControllerFindOneOptions({ path: queryOptions.path }),
			enabled: !!queryOptions.path,
		}),
		queryKey: engineControllerFindOneQueryKey({ path: queryOptions.path }),
	}
}

export const useCreateEngine = () => {
	const mutationOptions = engineControllerCreateMutation()
	return useMutation({ ...mutationOptions })
}

export const useUpdateEngine = () => {
	const mutationOptions = engineControllerUpdateMutation()
	return useMutation({ ...mutationOptions })
}

export const useDeleteEngine = () => {
	const mutationOptions = engineControllerRemoveMutation()
	return useMutation({ ...mutationOptions })
}

type UseEngineApiOptions = {
	path?: Options<EngineControllerFindOneData>["path"]
	query?: Options<EngineControllerFindAllData>["query"]
}

const useEngineApi = (options: UseEngineApiOptions = {}) => {
	const engine = useGetEngine({ path: options.path! })
	const engines = useGetEngines({ query: options.query! })
	const createEngine = useCreateEngine()
	const updateEngine = useUpdateEngine()
	const deleteEngine = useDeleteEngine()

	return {
		engine,
		engines,
		createEngine,
		updateEngine,
		deleteEngine,
	}
}

export default useEngineApi
