// This file is auto-generated by @hey-api/openapi-ts
import {
	type DefaultError,
	type InfiniteData,
	infiniteQueryOptions,
	queryOptions,
	type UseMutationOptions,
} from "@tanstack/react-query"
import type { AxiosError } from "axios"

import { client as _heyApiClient } from "../client.gen"
import {
	appControllerGetHello,
	authControllerGetPermissions,
	authControllerLogin,
	authControllerRegister,
	companyControllerCreate,
	companyControllerFindAll,
	companyControllerFindOne,
	companyControllerRemove,
	companyControllerUpdate,
	detectionControllerApproveDetection,
	detectionControllerBulkApproveDetections,
	detectionControllerCreateIncomingDetection,
	detectionControllerFindAll,
	detectionControllerFindOne,
	detectionControllerGetStatistics,
	detectionControllerRemove,
	detectionControllerSearchDetections,
	detectionControllerUpdate,
	engineControllerCreate,
	engineControllerFindAll,
	engineControllerFindOne,
	engineControllerRemove,
	engineControllerUpdate,
	monitorControllerCreate,
	monitorControllerFindAll,
	monitorControllerFindOne,
	monitorControllerRemove,
	monitorControllerStartStream,
	monitorControllerUpdate,
	type Options,
} from "../sdk.gen"
import type {
	AppControllerGetHelloData,
	AuthControllerGetPermissionsData,
	AuthControllerLoginData,
	AuthControllerRegisterData,
	CompanyControllerCreateData,
	CompanyControllerCreateResponse,
	CompanyControllerFindAllData,
	CompanyControllerFindAllResponse,
	CompanyControllerFindOneData,
	CompanyControllerRemoveData,
	CompanyControllerRemoveResponse,
	CompanyControllerUpdateData,
	CompanyControllerUpdateResponse,
	DetectionControllerApproveDetectionData,
	DetectionControllerApproveDetectionResponse,
	DetectionControllerBulkApproveDetectionsData,
	DetectionControllerBulkApproveDetectionsResponse,
	DetectionControllerCreateIncomingDetectionData,
	DetectionControllerCreateIncomingDetectionResponse,
	DetectionControllerFindAllData,
	DetectionControllerFindAllResponse,
	DetectionControllerFindOneData,
	DetectionControllerGetStatisticsData,
	DetectionControllerRemoveData,
	DetectionControllerRemoveResponse,
	DetectionControllerSearchDetectionsData,
	DetectionControllerSearchDetectionsResponse,
	DetectionControllerUpdateData,
	DetectionControllerUpdateResponse,
	EngineControllerCreateData,
	EngineControllerCreateResponse,
	EngineControllerFindAllData,
	EngineControllerFindAllResponse,
	EngineControllerFindOneData,
	EngineControllerRemoveData,
	EngineControllerRemoveResponse,
	EngineControllerUpdateData,
	EngineControllerUpdateResponse,
	MonitorControllerCreateData,
	MonitorControllerCreateResponse,
	MonitorControllerFindAllData,
	MonitorControllerFindAllResponse,
	MonitorControllerFindOneData,
	MonitorControllerRemoveData,
	MonitorControllerRemoveResponse,
	MonitorControllerStartStreamData,
	MonitorControllerUpdateData,
	MonitorControllerUpdateResponse,
} from "../types.gen"

export type QueryKey<TOptions extends Options> = [
	Pick<TOptions, "baseURL" | "body" | "headers" | "path" | "query"> & {
		_id: string
		_infinite?: boolean
	},
]

const createQueryKey = <TOptions extends Options>(
	id: string,
	options?: TOptions,
	infinite?: boolean,
): [QueryKey<TOptions>[0]] => {
	const params: QueryKey<TOptions>[0] = {
		_id: id,
		baseURL: (options?.client ?? _heyApiClient).getConfig().baseURL,
	} as QueryKey<TOptions>[0]
	if (infinite) {
		params._infinite = infinite
	}
	if (options?.body) {
		params.body = options.body
	}
	if (options?.headers) {
		params.headers = options.headers
	}
	if (options?.path) {
		params.path = options.path
	}
	if (options?.query) {
		params.query = options.query
	}
	return [params]
}

export const appControllerGetHelloQueryKey = (options?: Options<AppControllerGetHelloData>) =>
	createQueryKey("appControllerGetHello", options)

export const appControllerGetHelloOptions = (options?: Options<AppControllerGetHelloData>) => {
	return queryOptions({
		queryFn: async ({ queryKey, signal }) => {
			const { data } = await appControllerGetHello({
				...options,
				...queryKey[0],
				signal,
				throwOnError: true,
			})
			return data
		},
		queryKey: appControllerGetHelloQueryKey(options),
	})
}

export const companyControllerFindAllQueryKey = (options?: Options<CompanyControllerFindAllData>) =>
	createQueryKey("companyControllerFindAll", options)

export const companyControllerFindAllOptions = (options?: Options<CompanyControllerFindAllData>) => {
	return queryOptions({
		queryFn: async ({ queryKey, signal }) => {
			const { data } = await companyControllerFindAll({
				...options,
				...queryKey[0],
				signal,
				throwOnError: true,
			})
			return data
		},
		queryKey: companyControllerFindAllQueryKey(options),
	})
}

const createInfiniteParams = <K extends Pick<QueryKey<Options>[0], "body" | "headers" | "path" | "query">>(
	queryKey: QueryKey<Options>,
	page: K,
) => {
	const params = queryKey[0]
	if (page.body) {
		params.body = {
			...(queryKey[0].body as any),
			...(page.body as any),
		}
	}
	if (page.headers) {
		params.headers = {
			...queryKey[0].headers,
			...page.headers,
		}
	}
	if (page.path) {
		params.path = {
			...(queryKey[0].path as any),
			...(page.path as any),
		}
	}
	if (page.query) {
		params.query = {
			...(queryKey[0].query as any),
			...(page.query as any),
		}
	}
	return params as unknown as typeof page
}

export const companyControllerFindAllInfiniteQueryKey = (
	options?: Options<CompanyControllerFindAllData>,
): QueryKey<Options<CompanyControllerFindAllData>> => createQueryKey("companyControllerFindAll", options, true)

export const companyControllerFindAllInfiniteOptions = (options?: Options<CompanyControllerFindAllData>) => {
	return infiniteQueryOptions<
		CompanyControllerFindAllResponse,
		AxiosError<DefaultError>,
		InfiniteData<CompanyControllerFindAllResponse>,
		QueryKey<Options<CompanyControllerFindAllData>>,
		number | Pick<QueryKey<Options<CompanyControllerFindAllData>>[0], "body" | "headers" | "path" | "query">
	>(
		// @ts-ignore
		{
			queryFn: async ({ pageParam, queryKey, signal }) => {
				// @ts-ignore
				const page: Pick<QueryKey<Options<CompanyControllerFindAllData>>[0], "body" | "headers" | "path" | "query"> =
					typeof pageParam === "object"
						? pageParam
						: {
								query: {
									page: pageParam,
								},
							}
				const params = createInfiniteParams(queryKey, page)
				const { data } = await companyControllerFindAll({
					...options,
					...params,
					signal,
					throwOnError: true,
				})
				return data
			},
			queryKey: companyControllerFindAllInfiniteQueryKey(options),
		},
	)
}

export const companyControllerCreateQueryKey = (options: Options<CompanyControllerCreateData>) =>
	createQueryKey("companyControllerCreate", options)

export const companyControllerCreateOptions = (options: Options<CompanyControllerCreateData>) => {
	return queryOptions({
		queryFn: async ({ queryKey, signal }) => {
			const { data } = await companyControllerCreate({
				...options,
				...queryKey[0],
				signal,
				throwOnError: true,
			})
			return data
		},
		queryKey: companyControllerCreateQueryKey(options),
	})
}

export const companyControllerCreateMutation = (options?: Partial<Options<CompanyControllerCreateData>>) => {
	const mutationOptions: UseMutationOptions<
		CompanyControllerCreateResponse,
		AxiosError<DefaultError>,
		Options<CompanyControllerCreateData>
	> = {
		mutationFn: async (localOptions) => {
			const { data } = await companyControllerCreate({
				...options,
				...localOptions,
				throwOnError: true,
			})
			return data
		},
	}
	return mutationOptions
}

export const companyControllerRemoveMutation = (options?: Partial<Options<CompanyControllerRemoveData>>) => {
	const mutationOptions: UseMutationOptions<
		CompanyControllerRemoveResponse,
		AxiosError<DefaultError>,
		Options<CompanyControllerRemoveData>
	> = {
		mutationFn: async (localOptions) => {
			const { data } = await companyControllerRemove({
				...options,
				...localOptions,
				throwOnError: true,
			})
			return data
		},
	}
	return mutationOptions
}

export const companyControllerFindOneQueryKey = (options: Options<CompanyControllerFindOneData>) =>
	createQueryKey("companyControllerFindOne", options)

export const companyControllerFindOneOptions = (options: Options<CompanyControllerFindOneData>) => {
	return queryOptions({
		queryFn: async ({ queryKey, signal }) => {
			const { data } = await companyControllerFindOne({
				...options,
				...queryKey[0],
				signal,
				throwOnError: true,
			})
			return data
		},
		queryKey: companyControllerFindOneQueryKey(options),
	})
}

export const companyControllerUpdateMutation = (options?: Partial<Options<CompanyControllerUpdateData>>) => {
	const mutationOptions: UseMutationOptions<
		CompanyControllerUpdateResponse,
		AxiosError<DefaultError>,
		Options<CompanyControllerUpdateData>
	> = {
		mutationFn: async (localOptions) => {
			const { data } = await companyControllerUpdate({
				...options,
				...localOptions,
				throwOnError: true,
			})
			return data
		},
	}
	return mutationOptions
}

export const engineControllerFindAllQueryKey = (options?: Options<EngineControllerFindAllData>) =>
	createQueryKey("engineControllerFindAll", options)

export const engineControllerFindAllOptions = (options?: Options<EngineControllerFindAllData>) => {
	return queryOptions({
		queryFn: async ({ queryKey, signal }) => {
			const { data } = await engineControllerFindAll({
				...options,
				...queryKey[0],
				signal,
				throwOnError: true,
			})
			return data
		},
		queryKey: engineControllerFindAllQueryKey(options),
	})
}

export const engineControllerFindAllInfiniteQueryKey = (
	options?: Options<EngineControllerFindAllData>,
): QueryKey<Options<EngineControllerFindAllData>> => createQueryKey("engineControllerFindAll", options, true)

export const engineControllerFindAllInfiniteOptions = (options?: Options<EngineControllerFindAllData>) => {
	return infiniteQueryOptions<
		EngineControllerFindAllResponse,
		AxiosError<DefaultError>,
		InfiniteData<EngineControllerFindAllResponse>,
		QueryKey<Options<EngineControllerFindAllData>>,
		number | Pick<QueryKey<Options<EngineControllerFindAllData>>[0], "body" | "headers" | "path" | "query">
	>(
		// @ts-ignore
		{
			queryFn: async ({ pageParam, queryKey, signal }) => {
				// @ts-ignore
				const page: Pick<QueryKey<Options<EngineControllerFindAllData>>[0], "body" | "headers" | "path" | "query"> =
					typeof pageParam === "object"
						? pageParam
						: {
								query: {
									page: pageParam,
								},
							}
				const params = createInfiniteParams(queryKey, page)
				const { data } = await engineControllerFindAll({
					...options,
					...params,
					signal,
					throwOnError: true,
				})
				return data
			},
			queryKey: engineControllerFindAllInfiniteQueryKey(options),
		},
	)
}

export const engineControllerCreateQueryKey = (options: Options<EngineControllerCreateData>) =>
	createQueryKey("engineControllerCreate", options)

export const engineControllerCreateOptions = (options: Options<EngineControllerCreateData>) => {
	return queryOptions({
		queryFn: async ({ queryKey, signal }) => {
			const { data } = await engineControllerCreate({
				...options,
				...queryKey[0],
				signal,
				throwOnError: true,
			})
			return data
		},
		queryKey: engineControllerCreateQueryKey(options),
	})
}

export const engineControllerCreateMutation = (options?: Partial<Options<EngineControllerCreateData>>) => {
	const mutationOptions: UseMutationOptions<
		EngineControllerCreateResponse,
		AxiosError<DefaultError>,
		Options<EngineControllerCreateData>
	> = {
		mutationFn: async (localOptions) => {
			const { data } = await engineControllerCreate({
				...options,
				...localOptions,
				throwOnError: true,
			})
			return data
		},
	}
	return mutationOptions
}

export const engineControllerRemoveMutation = (options?: Partial<Options<EngineControllerRemoveData>>) => {
	const mutationOptions: UseMutationOptions<
		EngineControllerRemoveResponse,
		AxiosError<DefaultError>,
		Options<EngineControllerRemoveData>
	> = {
		mutationFn: async (localOptions) => {
			const { data } = await engineControllerRemove({
				...options,
				...localOptions,
				throwOnError: true,
			})
			return data
		},
	}
	return mutationOptions
}

export const engineControllerFindOneQueryKey = (options: Options<EngineControllerFindOneData>) =>
	createQueryKey("engineControllerFindOne", options)

export const engineControllerFindOneOptions = (options: Options<EngineControllerFindOneData>) => {
	return queryOptions({
		queryFn: async ({ queryKey, signal }) => {
			const { data } = await engineControllerFindOne({
				...options,
				...queryKey[0],
				signal,
				throwOnError: true,
			})
			return data
		},
		queryKey: engineControllerFindOneQueryKey(options),
	})
}

export const engineControllerUpdateMutation = (options?: Partial<Options<EngineControllerUpdateData>>) => {
	const mutationOptions: UseMutationOptions<
		EngineControllerUpdateResponse,
		AxiosError<DefaultError>,
		Options<EngineControllerUpdateData>
	> = {
		mutationFn: async (localOptions) => {
			const { data } = await engineControllerUpdate({
				...options,
				...localOptions,
				throwOnError: true,
			})
			return data
		},
	}
	return mutationOptions
}

export const monitorControllerFindAllQueryKey = (options?: Options<MonitorControllerFindAllData>) =>
	createQueryKey("monitorControllerFindAll", options)

export const monitorControllerFindAllOptions = (options?: Options<MonitorControllerFindAllData>) => {
	return queryOptions({
		queryFn: async ({ queryKey, signal }) => {
			const { data } = await monitorControllerFindAll({
				...options,
				...queryKey[0],
				signal,
				throwOnError: true,
			})
			return data
		},
		queryKey: monitorControllerFindAllQueryKey(options),
	})
}

export const monitorControllerFindAllInfiniteQueryKey = (
	options?: Options<MonitorControllerFindAllData>,
): QueryKey<Options<MonitorControllerFindAllData>> => createQueryKey("monitorControllerFindAll", options, true)

export const monitorControllerFindAllInfiniteOptions = (options?: Options<MonitorControllerFindAllData>) => {
	return infiniteQueryOptions<
		MonitorControllerFindAllResponse,
		AxiosError<DefaultError>,
		InfiniteData<MonitorControllerFindAllResponse>,
		QueryKey<Options<MonitorControllerFindAllData>>,
		number | Pick<QueryKey<Options<MonitorControllerFindAllData>>[0], "body" | "headers" | "path" | "query">
	>(
		// @ts-ignore
		{
			queryFn: async ({ pageParam, queryKey, signal }) => {
				// @ts-ignore
				const page: Pick<QueryKey<Options<MonitorControllerFindAllData>>[0], "body" | "headers" | "path" | "query"> =
					typeof pageParam === "object"
						? pageParam
						: {
								query: {
									page: pageParam,
								},
							}
				const params = createInfiniteParams(queryKey, page)
				const { data } = await monitorControllerFindAll({
					...options,
					...params,
					signal,
					throwOnError: true,
				})
				return data
			},
			queryKey: monitorControllerFindAllInfiniteQueryKey(options),
		},
	)
}

export const monitorControllerCreateQueryKey = (options: Options<MonitorControllerCreateData>) =>
	createQueryKey("monitorControllerCreate", options)

export const monitorControllerCreateOptions = (options: Options<MonitorControllerCreateData>) => {
	return queryOptions({
		queryFn: async ({ queryKey, signal }) => {
			const { data } = await monitorControllerCreate({
				...options,
				...queryKey[0],
				signal,
				throwOnError: true,
			})
			return data
		},
		queryKey: monitorControllerCreateQueryKey(options),
	})
}

export const monitorControllerCreateMutation = (options?: Partial<Options<MonitorControllerCreateData>>) => {
	const mutationOptions: UseMutationOptions<
		MonitorControllerCreateResponse,
		AxiosError<DefaultError>,
		Options<MonitorControllerCreateData>
	> = {
		mutationFn: async (localOptions) => {
			const { data } = await monitorControllerCreate({
				...options,
				...localOptions,
				throwOnError: true,
			})
			return data
		},
	}
	return mutationOptions
}

export const monitorControllerRemoveMutation = (options?: Partial<Options<MonitorControllerRemoveData>>) => {
	const mutationOptions: UseMutationOptions<
		MonitorControllerRemoveResponse,
		AxiosError<DefaultError>,
		Options<MonitorControllerRemoveData>
	> = {
		mutationFn: async (localOptions) => {
			const { data } = await monitorControllerRemove({
				...options,
				...localOptions,
				throwOnError: true,
			})
			return data
		},
	}
	return mutationOptions
}

export const monitorControllerFindOneQueryKey = (options: Options<MonitorControllerFindOneData>) =>
	createQueryKey("monitorControllerFindOne", options)

export const monitorControllerFindOneOptions = (options: Options<MonitorControllerFindOneData>) => {
	return queryOptions({
		queryFn: async ({ queryKey, signal }) => {
			const { data } = await monitorControllerFindOne({
				...options,
				...queryKey[0],
				signal,
				throwOnError: true,
			})
			return data
		},
		queryKey: monitorControllerFindOneQueryKey(options),
	})
}

export const monitorControllerUpdateMutation = (options?: Partial<Options<MonitorControllerUpdateData>>) => {
	const mutationOptions: UseMutationOptions<
		MonitorControllerUpdateResponse,
		AxiosError<DefaultError>,
		Options<MonitorControllerUpdateData>
	> = {
		mutationFn: async (localOptions) => {
			const { data } = await monitorControllerUpdate({
				...options,
				...localOptions,
				throwOnError: true,
			})
			return data
		},
	}
	return mutationOptions
}

export const monitorControllerStartStreamQueryKey = (options: Options<MonitorControllerStartStreamData>) =>
	createQueryKey("monitorControllerStartStream", options)

export const monitorControllerStartStreamOptions = (options: Options<MonitorControllerStartStreamData>) => {
	return queryOptions({
		queryFn: async ({ queryKey, signal }) => {
			const { data } = await monitorControllerStartStream({
				...options,
				...queryKey[0],
				signal,
				throwOnError: true,
			})
			return data
		},
		queryKey: monitorControllerStartStreamQueryKey(options),
	})
}

export const monitorControllerStartStreamMutation = (options?: Partial<Options<MonitorControllerStartStreamData>>) => {
	const mutationOptions: UseMutationOptions<
		unknown,
		AxiosError<DefaultError>,
		Options<MonitorControllerStartStreamData>
	> = {
		mutationFn: async (localOptions) => {
			const { data } = await monitorControllerStartStream({
				...options,
				...localOptions,
				throwOnError: true,
			})
			return data
		},
	}
	return mutationOptions
}

export const detectionControllerGetStatisticsQueryKey = (options: Options<DetectionControllerGetStatisticsData>) =>
	createQueryKey("detectionControllerGetStatistics", options)

export const detectionControllerGetStatisticsOptions = (options: Options<DetectionControllerGetStatisticsData>) => {
	return queryOptions({
		queryFn: async ({ queryKey, signal }) => {
			const { data } = await detectionControllerGetStatistics({
				...options,
				...queryKey[0],
				signal,
				throwOnError: true,
			})
			return data
		},
		queryKey: detectionControllerGetStatisticsQueryKey(options),
	})
}

export const detectionControllerSearchDetectionsQueryKey = (
	options?: Options<DetectionControllerSearchDetectionsData>,
) => createQueryKey("detectionControllerSearchDetections", options)

export const detectionControllerSearchDetectionsOptions = (
	options?: Options<DetectionControllerSearchDetectionsData>,
) => {
	return queryOptions({
		queryFn: async ({ queryKey, signal }) => {
			const { data } = await detectionControllerSearchDetections({
				...options,
				...queryKey[0],
				signal,
				throwOnError: true,
			})
			return data
		},
		queryKey: detectionControllerSearchDetectionsQueryKey(options),
	})
}

export const detectionControllerSearchDetectionsInfiniteQueryKey = (
	options?: Options<DetectionControllerSearchDetectionsData>,
): QueryKey<Options<DetectionControllerSearchDetectionsData>> =>
	createQueryKey("detectionControllerSearchDetections", options, true)

export const detectionControllerSearchDetectionsInfiniteOptions = (
	options?: Options<DetectionControllerSearchDetectionsData>,
) => {
	return infiniteQueryOptions<
		DetectionControllerSearchDetectionsResponse,
		AxiosError<DefaultError>,
		InfiniteData<DetectionControllerSearchDetectionsResponse>,
		QueryKey<Options<DetectionControllerSearchDetectionsData>>,
		number | Pick<QueryKey<Options<DetectionControllerSearchDetectionsData>>[0], "body" | "headers" | "path" | "query">
	>(
		// @ts-ignore
		{
			queryFn: async ({ pageParam, queryKey, signal }) => {
				// @ts-ignore
				const page: Pick<
					QueryKey<Options<DetectionControllerSearchDetectionsData>>[0],
					"body" | "headers" | "path" | "query"
				> =
					typeof pageParam === "object"
						? pageParam
						: {
								query: {
									page: pageParam,
								},
							}
				const params = createInfiniteParams(queryKey, page)
				const { data } = await detectionControllerSearchDetections({
					...options,
					...params,
					signal,
					throwOnError: true,
				})
				return data
			},
			queryKey: detectionControllerSearchDetectionsInfiniteQueryKey(options),
		},
	)
}

export const detectionControllerCreateIncomingDetectionQueryKey = (
	options: Options<DetectionControllerCreateIncomingDetectionData>,
) => createQueryKey("detectionControllerCreateIncomingDetection", options)

export const detectionControllerCreateIncomingDetectionOptions = (
	options: Options<DetectionControllerCreateIncomingDetectionData>,
) => {
	return queryOptions({
		queryFn: async ({ queryKey, signal }) => {
			const { data } = await detectionControllerCreateIncomingDetection({
				...options,
				...queryKey[0],
				signal,
				throwOnError: true,
			})
			return data
		},
		queryKey: detectionControllerCreateIncomingDetectionQueryKey(options),
	})
}

export const detectionControllerCreateIncomingDetectionMutation = (
	options?: Partial<Options<DetectionControllerCreateIncomingDetectionData>>,
) => {
	const mutationOptions: UseMutationOptions<
		DetectionControllerCreateIncomingDetectionResponse,
		AxiosError<DefaultError>,
		Options<DetectionControllerCreateIncomingDetectionData>
	> = {
		mutationFn: async (localOptions) => {
			const { data } = await detectionControllerCreateIncomingDetection({
				...options,
				...localOptions,
				throwOnError: true,
			})
			return data
		},
	}
	return mutationOptions
}

export const detectionControllerFindAllQueryKey = (options?: Options<DetectionControllerFindAllData>) =>
	createQueryKey("detectionControllerFindAll", options)

export const detectionControllerFindAllOptions = (options?: Options<DetectionControllerFindAllData>) => {
	return queryOptions({
		queryFn: async ({ queryKey, signal }) => {
			const { data } = await detectionControllerFindAll({
				...options,
				...queryKey[0],
				signal,
				throwOnError: true,
			})
			return data
		},
		queryKey: detectionControllerFindAllQueryKey(options),
	})
}

export const detectionControllerFindAllInfiniteQueryKey = (
	options?: Options<DetectionControllerFindAllData>,
): QueryKey<Options<DetectionControllerFindAllData>> => createQueryKey("detectionControllerFindAll", options, true)

export const detectionControllerFindAllInfiniteOptions = (options?: Options<DetectionControllerFindAllData>) => {
	return infiniteQueryOptions<
		DetectionControllerFindAllResponse,
		AxiosError<DefaultError>,
		InfiniteData<DetectionControllerFindAllResponse>,
		QueryKey<Options<DetectionControllerFindAllData>>,
		number | Pick<QueryKey<Options<DetectionControllerFindAllData>>[0], "body" | "headers" | "path" | "query">
	>(
		// @ts-ignore
		{
			queryFn: async ({ pageParam, queryKey, signal }) => {
				// @ts-ignore
				const page: Pick<QueryKey<Options<DetectionControllerFindAllData>>[0], "body" | "headers" | "path" | "query"> =
					typeof pageParam === "object"
						? pageParam
						: {
								query: {
									page: pageParam,
								},
							}
				const params = createInfiniteParams(queryKey, page)
				const { data } = await detectionControllerFindAll({
					...options,
					...params,
					signal,
					throwOnError: true,
				})
				return data
			},
			queryKey: detectionControllerFindAllInfiniteQueryKey(options),
		},
	)
}

export const detectionControllerRemoveMutation = (options?: Partial<Options<DetectionControllerRemoveData>>) => {
	const mutationOptions: UseMutationOptions<
		DetectionControllerRemoveResponse,
		AxiosError<DefaultError>,
		Options<DetectionControllerRemoveData>
	> = {
		mutationFn: async (localOptions) => {
			const { data } = await detectionControllerRemove({
				...options,
				...localOptions,
				throwOnError: true,
			})
			return data
		},
	}
	return mutationOptions
}

export const detectionControllerFindOneQueryKey = (options: Options<DetectionControllerFindOneData>) =>
	createQueryKey("detectionControllerFindOne", options)

export const detectionControllerFindOneOptions = (options: Options<DetectionControllerFindOneData>) => {
	return queryOptions({
		queryFn: async ({ queryKey, signal }) => {
			const { data } = await detectionControllerFindOne({
				...options,
				...queryKey[0],
				signal,
				throwOnError: true,
			})
			return data
		},
		queryKey: detectionControllerFindOneQueryKey(options),
	})
}

export const detectionControllerUpdateMutation = (options?: Partial<Options<DetectionControllerUpdateData>>) => {
	const mutationOptions: UseMutationOptions<
		DetectionControllerUpdateResponse,
		AxiosError<DefaultError>,
		Options<DetectionControllerUpdateData>
	> = {
		mutationFn: async (localOptions) => {
			const { data } = await detectionControllerUpdate({
				...options,
				...localOptions,
				throwOnError: true,
			})
			return data
		},
	}
	return mutationOptions
}

export const detectionControllerApproveDetectionMutation = (
	options?: Partial<Options<DetectionControllerApproveDetectionData>>,
) => {
	const mutationOptions: UseMutationOptions<
		DetectionControllerApproveDetectionResponse,
		AxiosError<DefaultError>,
		Options<DetectionControllerApproveDetectionData>
	> = {
		mutationFn: async (localOptions) => {
			const { data } = await detectionControllerApproveDetection({
				...options,
				...localOptions,
				throwOnError: true,
			})
			return data
		},
	}
	return mutationOptions
}

export const detectionControllerBulkApproveDetectionsQueryKey = (
	options: Options<DetectionControllerBulkApproveDetectionsData>,
) => createQueryKey("detectionControllerBulkApproveDetections", options)

export const detectionControllerBulkApproveDetectionsOptions = (
	options: Options<DetectionControllerBulkApproveDetectionsData>,
) => {
	return queryOptions({
		queryFn: async ({ queryKey, signal }) => {
			const { data } = await detectionControllerBulkApproveDetections({
				...options,
				...queryKey[0],
				signal,
				throwOnError: true,
			})
			return data
		},
		queryKey: detectionControllerBulkApproveDetectionsQueryKey(options),
	})
}

export const detectionControllerBulkApproveDetectionsMutation = (
	options?: Partial<Options<DetectionControllerBulkApproveDetectionsData>>,
) => {
	const mutationOptions: UseMutationOptions<
		DetectionControllerBulkApproveDetectionsResponse,
		AxiosError<DefaultError>,
		Options<DetectionControllerBulkApproveDetectionsData>
	> = {
		mutationFn: async (localOptions) => {
			const { data } = await detectionControllerBulkApproveDetections({
				...options,
				...localOptions,
				throwOnError: true,
			})
			return data
		},
	}
	return mutationOptions
}

export const authControllerLoginQueryKey = (options: Options<AuthControllerLoginData>) =>
	createQueryKey("authControllerLogin", options)

export const authControllerLoginOptions = (options: Options<AuthControllerLoginData>) => {
	return queryOptions({
		queryFn: async ({ queryKey, signal }) => {
			const { data } = await authControllerLogin({
				...options,
				...queryKey[0],
				signal,
				throwOnError: true,
			})
			return data
		},
		queryKey: authControllerLoginQueryKey(options),
	})
}

export const authControllerLoginMutation = (options?: Partial<Options<AuthControllerLoginData>>) => {
	const mutationOptions: UseMutationOptions<unknown, AxiosError<DefaultError>, Options<AuthControllerLoginData>> = {
		mutationFn: async (localOptions) => {
			const { data } = await authControllerLogin({
				...options,
				...localOptions,
				throwOnError: true,
			})
			return data
		},
	}
	return mutationOptions
}

export const authControllerRegisterQueryKey = (options: Options<AuthControllerRegisterData>) =>
	createQueryKey("authControllerRegister", options)

export const authControllerRegisterOptions = (options: Options<AuthControllerRegisterData>) => {
	return queryOptions({
		queryFn: async ({ queryKey, signal }) => {
			const { data } = await authControllerRegister({
				...options,
				...queryKey[0],
				signal,
				throwOnError: true,
			})
			return data
		},
		queryKey: authControllerRegisterQueryKey(options),
	})
}

export const authControllerRegisterMutation = (options?: Partial<Options<AuthControllerRegisterData>>) => {
	const mutationOptions: UseMutationOptions<unknown, AxiosError<DefaultError>, Options<AuthControllerRegisterData>> = {
		mutationFn: async (localOptions) => {
			const { data } = await authControllerRegister({
				...options,
				...localOptions,
				throwOnError: true,
			})
			return data
		},
	}
	return mutationOptions
}

export const authControllerGetPermissionsQueryKey = (options?: Options<AuthControllerGetPermissionsData>) =>
	createQueryKey("authControllerGetPermissions", options)

export const authControllerGetPermissionsOptions = (options?: Options<AuthControllerGetPermissionsData>) => {
	return queryOptions({
		queryFn: async ({ queryKey, signal }) => {
			const { data } = await authControllerGetPermissions({
				...options,
				...queryKey[0],
				signal,
				throwOnError: true,
			})
			return data
		},
		queryKey: authControllerGetPermissionsQueryKey(options),
	})
}
