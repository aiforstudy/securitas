const DASHBOARD_PERMISSION = {
	VIEW: "dashboard.view",
	STATISTICS_VIEW: "dashboard.statistics.view",
	ALERTS_VIEW: "dashboard.alerts.view",
}

const USER_PERMISSION = {
	VIEW: "users.view",
	CREATE: "users.create",
	EDIT: "users.edit",
	DELETE: "users.delete",
}

const COMPANY_PERMISSION = {
	VIEW: "companies.view",
	CREATE: "companies.create",
	EDIT: "companies.edit",
	DELETE: "companies.delete",
}

const MONITOR_PERMISSION = {
	VIEW: "monitors.view",
	CREATE: "monitors.create",
	EDIT: "monitors.edit",
	DELETE: "monitors.delete",
	STREAM: {
		START: "monitors.stream.start",
		STOP: "monitors.stream.stop",
	},
}

const ENGINE_PERMISSION = {
	VIEW: "engines.view",
	CREATE: "engines.create",
	EDIT: "engines.edit",
	DELETE: "engines.delete",
}

const DETECTION_PERMISSION = {
	VIEW: "detections.view",
	DETAILS_VIEW: "detections.details.view",
	EXPORT: "detections.export",
}

const SETTING_PERMISSION = {
	VIEW: "settings.view",
	EDIT: "settings.edit",
}

const REPORT_PERMISSION = {
	VIEW: "reports.view",
	GENERATE: "reports.generate",
	EXPORT: "reports.export",
}

const PERMISSIONS = {
	DASHBOARD: DASHBOARD_PERMISSION,
	USER: USER_PERMISSION,
	COMPANY: COMPANY_PERMISSION,
	MONITOR: MONITOR_PERMISSION,
	ENGINE: ENGINE_PERMISSION,
	DETECTION: DETECTION_PERMISSION,
	SETTING: SETTING_PERMISSION,
	REPORT: REPORT_PERMISSION,
}

export default PERMISSIONS
