export const localS = {
	set: <T extends object | string | number>(key: string, value: T) => {
		localStorage.setItem(key, JSON.stringify(value))
	},
	get: (key: string) => {
		try {
			const value = localStorage.getItem(key)
			return value ? JSON.parse(value) : null
		} catch (error) {
			console.debug("localS.get ~ error:", error)
			return null
		}
	},
	clear: (key: string) => localStorage.removeItem(key),
	clearAll: () => localStorage.clear(),
}

export const securedLocalS = {
	set: <T extends object | string | number>(key: string, value: T) => {
		sessionStorage.setItem(key, JSON.stringify(value))
	},
	get: (key: string) => {
		try {
			const value = sessionStorage.getItem(key)
			return value ? JSON.parse(value) : null
		} catch (e) {
			console.debug("securedLocalS.get ~ e:", e)
			return null
		}
	},
	clear: (key: string) => sessionStorage.removeItem(key),
	clearAll: () => sessionStorage.clear(),
}
