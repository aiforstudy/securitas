import { QueryClient } from "@tanstack/react-query"

import { client } from "@/api-generated/client.gen"
import { STORAGE_KEYS } from "@/constants/storage"

import { localS } from "./storage"

export const initializeClient = async () => {
	const token = await localS.get(STORAGE_KEYS.ACCESS_TOKEN)
	client.setConfig({
		headers: { Authorization: `Bearer ${token}` },
		timeout: 30000,
	})
}

// Initialize the client
initializeClient()

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
		},
	},
})

export default queryClient
