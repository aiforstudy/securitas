import { useMutation, useQuery } from "@tanstack/react-query"

import {
	DetectionControllerFindAllData,
	DetectionControllerFindOneData,
	DetectionControllerGetStatisticsData,
	DetectionControllerSearchDetectionsData,
	type Options,
} from "@/api-generated"
import {
	detectionControllerApproveDetectionMutation,
	detectionControllerBulkApproveDetectionsMutation,
	detectionControllerCreateIncomingDetectionMutation,
	detectionControllerFindAllOptions,
	detectionControllerFindAllQueryKey,
	detectionControllerFindOneOptions,
	detectionControllerFindOneQueryKey,
	detectionControllerGetStatisticsOptions,
	detectionControllerGetStatisticsQueryKey,
	detectionControllerRemoveMutation,
	detectionControllerSearchDetectionsOptions,
	detectionControllerSearchDetectionsQueryKey,
	detectionControllerUpdateMutation,
} from "@/api-generated/@tanstack/react-query.gen"

export const useGetDetections = (
	options: Options<DetectionControllerSearchDetectionsData>,
	queryOptions?: { enabled?: boolean; refetchInterval?: number },
) => {
	return {
		...useQuery({
			...detectionControllerSearchDetectionsOptions({ query: options?.query }),
			enabled: !!queryOptions?.enabled,
			refetchInterval: queryOptions?.refetchInterval,
		}),
		queryKey: detectionControllerSearchDetectionsQueryKey({ query: options?.query }),
	}
}

export const useGetAllDetections = (
	options: Options<DetectionControllerFindAllData>,
	queryOptions?: { enabled?: boolean; refetchInterval?: number },
) => {
	return {
		...useQuery({
			...detectionControllerFindAllOptions({ query: options.query }),
			enabled: !!queryOptions?.enabled,
			refetchInterval: queryOptions?.refetchInterval,
		}),
		queryKey: detectionControllerFindAllQueryKey({ query: options.query }),
	}
}

export const useGetDetectionsStatistics = (
	options: Options<DetectionControllerGetStatisticsData>,
	queryOptions?: { enabled?: boolean; refetchInterval?: number },
) => {
	return {
		...useQuery({
			...detectionControllerGetStatisticsOptions({ query: options.query }),
			enabled: !!queryOptions?.enabled,
			refetchInterval: queryOptions?.refetchInterval,
		}),
		queryKey: detectionControllerGetStatisticsQueryKey({ query: options.query }),
	}
}

export const useGetDetection = (queryOptions: Options<DetectionControllerFindOneData>) => {
	return {
		...useQuery({
			...detectionControllerFindOneOptions({ path: queryOptions.path }),
			enabled: !!queryOptions.path,
		}),
		queryKey: detectionControllerFindOneQueryKey({ path: queryOptions.path }),
	}
}

export const useCreateDetection = () => {
	const mutationOptions = detectionControllerCreateIncomingDetectionMutation()
	return useMutation({ ...mutationOptions })
}

export const useUpdateDetection = () => {
	const mutationOptions = detectionControllerUpdateMutation()
	return useMutation({ ...mutationOptions })
}

export const useDeleteDetection = () => {
	const mutationOptions = detectionControllerRemoveMutation()
	return useMutation({ ...mutationOptions })
}

export const useApproveDetection = () => {
	const mutationOptions = detectionControllerApproveDetectionMutation()
	return useMutation({ ...mutationOptions })
}

export const useApproveDetections = () => {
	const mutationOptions = detectionControllerBulkApproveDetectionsMutation()
	return useMutation({ ...mutationOptions })
}

type UseDetectionApiOptions = {
	path?: Options<DetectionControllerFindOneData>["path"]
	query?: Options<DetectionControllerSearchDetectionsData>["query"]
	allQuery?: Options<DetectionControllerFindAllData>["query"]
	statisticsQuery?: Options<DetectionControllerGetStatisticsData>["query"]
	refetchInterval?: number
}

const useDetectionApi = (options: UseDetectionApiOptions = {}) => {
	const detection = useGetDetection({ path: options.path! })
	const detections = useGetDetections(
		{ query: options.query! },
		{ enabled: !!options.query, refetchInterval: options.refetchInterval },
	)
	const allDetections = useGetAllDetections({ query: options.allQuery! }, { enabled: !!options.allQuery })
	const createDetection = useCreateDetection()
	const updateDetection = useUpdateDetection()
	const deleteDetection = useDeleteDetection()
	const approveDetection = useApproveDetection()
	const approveDetections = useApproveDetections()
	const detectionsStatistics = useGetDetectionsStatistics({ query: options.statisticsQuery! })

	return {
		detection,
		detections,
		allDetections,
		createDetection,
		updateDetection,
		deleteDetection,
		approveDetection,
		approveDetections,
		detectionsStatistics,
	}
}

export default useDetectionApi
