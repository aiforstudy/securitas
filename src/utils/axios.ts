import axios, { AxiosError } from "axios"

import { CONFIG } from "@/constants/config"
import { STORAGE_KEYS } from "@/constants/storage"

import { localS } from "./storage"

const instance = axios.create({ baseURL: CONFIG.API_URL, timeout: 20000 })

instance.interceptors.request.use(
	async (config) => {
		config.headers.lang = await localS.get(STORAGE_KEYS.LANGUAGE)
		config.headers.Authorization = `Bearer ${await localS.get(STORAGE_KEYS.ACCESS_TOKEN)}`
		return config
	},
	(error) => Promise.reject(error),
)

instance.interceptors.response.use(
	(response) => {
		return response
	},
	(axiosError: AxiosError) => {
		return Promise.reject(axiosError)
	},
)

export default instance
