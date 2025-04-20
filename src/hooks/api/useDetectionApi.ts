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

export const useGetDetections = (queryOptions: Options<DetectionControllerSearchDetectionsData>) => {
	return {
		...useQuery({
			...detectionControllerSearchDetectionsOptions({ query: queryOptions.query }),
		}),
		queryKey: detectionControllerSearchDetectionsQueryKey({ query: queryOptions.query }),
	}
}

export const useGetAllDetections = (queryOptions: Options<DetectionControllerFindAllData>) => {
	return {
		...useQuery({
			...detectionControllerFindAllOptions({ query: queryOptions.query }),
		}),
		queryKey: detectionControllerFindAllQueryKey({ query: queryOptions.query }),
	}
}

export const useGetDetectionsStatistics = (queryOptions: Options<DetectionControllerGetStatisticsData>) => {
	return {
		...useQuery({
			...detectionControllerGetStatisticsOptions({ query: queryOptions.query }),
		}),
		queryKey: detectionControllerGetStatisticsQueryKey({ query: queryOptions.query }),
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
	query,
	allQuery,
	path,
	statisticsQuery,
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
	const detections = useGetDetections({ query: query! })
	const allDetections = useGetAllDetections({ query: allQuery! })
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
