const baseUrlConfig = import.meta.env.VITE_BASE_URL || "/"

const addBaseUrl = (path: string): string => {
	const trimmedBaseUrl = baseUrlConfig.replace(/\/+$/, "")
	const trimmedPath = path.replace(/^\/+/, "")
	return `${trimmedBaseUrl}/${trimmedPath}`
}

export const PATH = {
	BASE_URL: baseUrlConfig,
	NOT_FOUND: addBaseUrl("/404"),
	FORBIDDEN: addBaseUrl("/403"),
	NOT_AUTHORIZED: addBaseUrl("/401"),
	AUTHENTICATION: {
		LOGIN: addBaseUrl("/login"),
		REGISTER: addBaseUrl("/register"),
		FORGOT_PASSWORD: addBaseUrl("/forgot-password"),
		RESET_PASSWORD: addBaseUrl("/reset-password"),
		VERIFY_EMAIL: addBaseUrl("/verify-email"),
	},
	ACCOUNT: {
		ROOT: addBaseUrl("/account"),
		ACCOUNT_INFORMATION: {
			ROOT: addBaseUrl("/account/account-information"),
			DETAILS: addBaseUrl("/account/account-information/details"),
		},
	},
}
