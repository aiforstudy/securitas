import { useMutation, useQuery } from "@tanstack/react-query"

import { Engine, EngineControllerFindAllData, EngineControllerFindOneData, type Options } from "@/api-generated"
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

export const useCreateEngine = (onSuccess?: (data: Engine) => void, onError?: (error: Error) => void) => {
	const mutationOptions = engineControllerCreateMutation()
	return useMutation({ ...mutationOptions, onSuccess, onError })
}

export const useUpdateEngine = (onSuccess?: (data: Engine) => void, onError?: (error: Error) => void) => {
	const mutationOptions = engineControllerUpdateMutation()
	return useMutation({ ...mutationOptions, onSuccess, onError })
}

export const useDeleteEngine = (onSuccess?: (data: void) => void, onError?: (error: Error) => void) => {
	const mutationOptions = engineControllerRemoveMutation()
	return useMutation({ ...mutationOptions, onSuccess, onError })
}

type UseCompanyApiOptions = {
	query?: Options<EngineControllerFindAllData>["query"]
	path?: Options<EngineControllerFindOneData>["path"]
	onCreateSuccess?: (data: Engine) => void
	onCreateError?: (error: Error) => void
	onUpdateSuccess?: (data: Engine) => void
	onUpdateError?: (error: Error) => void
	onDeleteSuccess?: (data: void) => void
	onDeleteError?: (error: Error) => void
}

const useEngineApi = ({
	query,
	path,
	onCreateSuccess,
	onCreateError,
	onUpdateSuccess,
	onUpdateError,
	onDeleteSuccess,
	onDeleteError,
}: UseCompanyApiOptions) => {
	const engine = useGetEngine({ path: path! })
	const engines = useGetEngines({ query: query! })
	const createEngine = useCreateEngine(onCreateSuccess, onCreateError)
	const updateEngine = useUpdateEngine(onUpdateSuccess, onUpdateError)
	const deleteEngine = useDeleteEngine(onDeleteSuccess, onDeleteError)

	return {
		engine,
		engines,
		createEngine,
		updateEngine,
		deleteEngine,
	}
}

export default useEngineApi
