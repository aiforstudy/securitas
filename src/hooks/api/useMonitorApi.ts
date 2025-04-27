import { useMutation, useQuery } from "@tanstack/react-query"

import { MonitorControllerFindAllData, MonitorControllerFindOneData, type Options } from "@/api-generated"
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

export const useGetMonitors = (
	options: Options<MonitorControllerFindAllData>,
	queryOptions?: { enabled?: boolean; refetchInterval?: number },
) => {
	return {
		...useQuery({
			...monitorControllerFindAllOptions({ query: options.query }),
			enabled: !!queryOptions?.enabled,
			refetchInterval: queryOptions?.refetchInterval,
		}),
		queryKey: monitorControllerFindAllQueryKey({ query: options.query }),
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

export const useCreateMonitor = () => {
	const mutationOptions = monitorControllerCreateMutation()
	return useMutation({ ...mutationOptions })
}

export const useUpdateMonitor = () => {
	const mutationOptions = monitorControllerUpdateMutation()
	return useMutation({ ...mutationOptions })
}

export const useDeleteMonitor = () => {
	const mutationOptions = monitorControllerRemoveMutation()
	return useMutation({ ...mutationOptions })
}

export const useStartMonitorsStream = () => {
	const mutationOptions = monitorControllerStartStreamMutation()
	return useMutation({ ...mutationOptions })
}

type UseMonitorApiOptions = {
	path?: Options<MonitorControllerFindOneData>["path"]
	query?: Options<MonitorControllerFindAllData>["query"]
}

const useMonitorApi = (options: UseMonitorApiOptions = {}) => {
	const monitor = useGetMonitor({ path: options.path! })
	const monitors = useGetMonitors({ query: options.query! }, { enabled: !!options.query })
	const createMonitor = useCreateMonitor()
	const updateMonitor = useUpdateMonitor()
	const deleteMonitor = useDeleteMonitor()
	const startMonitorsStream = useStartMonitorsStream()

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
