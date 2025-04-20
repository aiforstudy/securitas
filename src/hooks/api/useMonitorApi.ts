import { useMutation, useQuery } from "@tanstack/react-query"

import { Monitor, MonitorControllerFindAllData, MonitorControllerFindOneData, type Options } from "@/api-generated"
import {
	monitorControllerCreateMutation,
	monitorControllerFindAllOptions,
	monitorControllerFindAllQueryKey,
	monitorControllerFindOneOptions,
	monitorControllerFindOneQueryKey,
	monitorControllerRemoveMutation,
	monitorControllerStartStreamMutation,
	monitorControllerUpdateMutation,
} from "@/api-generated/@tanstack/react-query.gen"

export const useGetMonitors = (queryOptions: Options<MonitorControllerFindAllData>) => {
	return {
		...useQuery({
			...monitorControllerFindAllOptions({ query: queryOptions.query }),
		}),
		queryKey: monitorControllerFindAllQueryKey({ query: queryOptions.query }),
	}
}

export const useGetMonitor = (queryOptions: Options<MonitorControllerFindOneData>) => {
	return {
		...useQuery({
			...monitorControllerFindOneOptions({ path: queryOptions.path }),
			enabled: !!queryOptions.path,
		}),
		queryKey: monitorControllerFindOneQueryKey({ path: queryOptions.path }),
	}
}

export const useCreateMonitor = (onSuccess?: (data: Monitor) => void, onError?: (error: Error) => void) => {
	const mutationOptions = monitorControllerCreateMutation()
	return useMutation({ ...mutationOptions, onSuccess, onError })
}

export const useUpdateMonitor = (onSuccess?: (data: Monitor) => void, onError?: (error: Error) => void) => {
	const mutationOptions = monitorControllerUpdateMutation()
	return useMutation({ ...mutationOptions, onSuccess, onError })
}

export const useDeleteMonitor = (onSuccess?: (data: void) => void, onError?: (error: Error) => void) => {
	const mutationOptions = monitorControllerRemoveMutation()
	return useMutation({ ...mutationOptions, onSuccess, onError })
}

export const useStartMonitorsStream = (onSuccess?: (data: unknown) => void, onError?: (error: Error) => void) => {
	const mutationOptions = monitorControllerStartStreamMutation()
	return useMutation({ ...mutationOptions, onSuccess, onError })
}

type UseMonitorApiOptions = {
	query?: Options<MonitorControllerFindAllData>["query"]
	path?: Options<MonitorControllerFindOneData>["path"]
	onCreateSuccess?: (data: Monitor) => void
	onCreateError?: (error: Error) => void
	onUpdateSuccess?: (data: Monitor) => void
	onUpdateError?: (error: Error) => void
	onDeleteSuccess?: (data: void) => void
	onDeleteError?: (error: Error) => void
	onStartStreamSuccess?: (data: unknown) => void
	onStartStreamError?: (error: Error) => void
}

const useMonitorApi = ({
	query,
	path,
	onCreateSuccess,
	onCreateError,
	onUpdateSuccess,
	onUpdateError,
	onDeleteSuccess,
	onDeleteError,
	onStartStreamSuccess,
	onStartStreamError,
}: UseMonitorApiOptions) => {
	const monitor = useGetMonitor({ path: path! })
	const monitors = useGetMonitors({ query: query! })
	const createMonitor = useCreateMonitor(onCreateSuccess, onCreateError)
	const updateMonitor = useUpdateMonitor(onUpdateSuccess, onUpdateError)
	const deleteMonitor = useDeleteMonitor(onDeleteSuccess, onDeleteError)
	const startMonitorsStream = useStartMonitorsStream(onStartStreamSuccess, onStartStreamError)
	return {
		monitor,
		monitors,
		createMonitor,
		updateMonitor,
		deleteMonitor,
		startMonitorsStream,
	}
}

export default useMonitorApi
