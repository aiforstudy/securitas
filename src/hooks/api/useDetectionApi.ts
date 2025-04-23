import { useMutation, useQuery } from "@tanstack/react-query"

import {
	Detection,
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

export const useCreateDetection = (onSuccess?: (data: Detection) => void, onError?: (error: Error) => void) => {
	const mutationOptions = detectionControllerCreateIncomingDetectionMutation()
	return useMutation({ ...mutationOptions, onSuccess, onError })
}

export const useUpdateDetection = (onSuccess?: (data: Detection) => void, onError?: (error: Error) => void) => {
	const mutationOptions = detectionControllerUpdateMutation()
	return useMutation({ ...mutationOptions, onSuccess, onError })
}

export const useDeleteDetection = (onSuccess?: (data: void) => void, onError?: (error: Error) => void) => {
	const mutationOptions = detectionControllerRemoveMutation()
	return useMutation({ ...mutationOptions, onSuccess, onError })
}

export const useApproveDetection = (onSuccess?: (data: Detection) => void, onError?: (error: Error) => void) => {
	const mutationOptions = detectionControllerApproveDetectionMutation()
	return useMutation({ ...mutationOptions, onSuccess, onError })
}

export const useApproveDetections = (onSuccess?: (data: Detection[]) => void, onError?: (error: Error) => void) => {
	const mutationOptions = detectionControllerBulkApproveDetectionsMutation()
	return useMutation({ ...mutationOptions, onSuccess, onError })
}

type UseDetectionApiOptions = {
	query?: Options<DetectionControllerSearchDetectionsData>["query"]
	allQuery?: Options<DetectionControllerFindAllData>["query"]
	path?: Options<DetectionControllerFindOneData>["path"]
	statisticsQuery?: Options<DetectionControllerGetStatisticsData>["query"]
	refetchInterval?: number
	onCreateSuccess?: (data: Detection) => void
	onCreateError?: (error: Error) => void
	onUpdateSuccess?: (data: Detection) => void
	onUpdateError?: (error: Error) => void
	onDeleteSuccess?: (data: void) => void
	onDeleteError?: (error: Error) => void
	onApproveDetectionSuccess?: (data: Detection) => void
	onApproveDetectionError?: (error: Error) => void
	onApproveDetectionsSuccess?: (data: Detection[]) => void
	onApproveDetectionsError?: (error: Error) => void
}

const useDetectionApi = ({
	path,
	query,
	allQuery,
	statisticsQuery,
	refetchInterval,
	onCreateSuccess,
	onCreateError,
	onUpdateSuccess,
	onUpdateError,
	onDeleteSuccess,
	onDeleteError,
	onApproveDetectionSuccess,
	onApproveDetectionError,
	onApproveDetectionsSuccess,
	onApproveDetectionsError,
}: UseDetectionApiOptions) => {
	const detection = useGetDetection({ path: path! })
	const detections = useGetDetections({ query: query! }, { enabled: !!query, refetchInterval })
	const allDetections = useGetAllDetections({ query: allQuery! }, { enabled: !!allQuery })
	const createDetection = useCreateDetection(onCreateSuccess, onCreateError)
	const updateDetection = useUpdateDetection(onUpdateSuccess, onUpdateError)
	const deleteDetection = useDeleteDetection(onDeleteSuccess, onDeleteError)
	const approveDetection = useApproveDetection(onApproveDetectionSuccess, onApproveDetectionError)
	const approveDetections = useApproveDetections(onApproveDetectionsSuccess, onApproveDetectionsError)
	const detectionsStatistics = useGetDetectionsStatistics({ query: statisticsQuery! })

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
