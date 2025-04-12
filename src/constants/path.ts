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
	MONITORING: {
		ROOT: addBaseUrl("/monitoring"),
		DASHBOARD: addBaseUrl("/monitoring/dashboard"),
		ANALYTICS: addBaseUrl("/monitoring/analytics"),
		LIVE_VIEW: addBaseUrl("/monitoring/live-view"),
	},
	DEVICES: {
		ROOT: addBaseUrl("/devices"),
		CAMERAS: {
			ROOT: addBaseUrl("/devices/cameras"),
			ADD: addBaseUrl("/devices/cameras/add"),
			EDIT: addBaseUrl("/devices/cameras/edit"),
		},
	},
	OPERATIONS: {
		ROOT: addBaseUrl("/operations"),
		MAP_CONFIGURATION: addBaseUrl("/operations/map-configuration"),
		DEVICE_STATUS: addBaseUrl("/operations/device-status"),
		DETECTIONS: addBaseUrl("/operations/detections"),
		LOGS: addBaseUrl("/operations/logs"),
		KNOWLEDGE_BASE: addBaseUrl("/operations/knowledge-base"),
	},
	SYSTEM: {
		ROOT: addBaseUrl("/system"),
		ADMINISTRATION: addBaseUrl("/system/administration"),
		ROLE_SETTINGS: addBaseUrl("/system/role-settings"),
		COMPANIES: addBaseUrl("/system/companies"),
	},
}
