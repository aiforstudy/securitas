import { QueryClient } from "@tanstack/react-query"

import { client } from "@/api-generated/client.gen"
import { STORAGE_KEYS } from "@/constants/storage"

import { localS } from "./storage"

client.setConfig({
	headers: {
		Authorization: `Bearer ${await localS.get(STORAGE_KEYS.ACCESS_TOKEN)}`,
	},
})

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
		},
	},
})

export default queryClient
