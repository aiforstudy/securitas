const DETECTION_PERMISSION = {
	READ: "detections.read",
	CREATE: "detections.create",
	UPDATE: "detections.edit",
	DELETE: "detections.delete",
}

const ENGINE_PERMISSION = {
	READ: "engines.read",
	CREATE: "engines.create",
	UPDATE: "engines.edit",
	DELETE: "engines.delete",
}

const COMPANY_PERMISSION = {
	READ: "companies.read",
	CREATE: "companies.create",
	UPDATE: "companies.edit",
	DELETE: "companies.delete",
}

const SMART_LOCK_PERMISSION = {
	READ: "smart-locks.read",
	CREATE: "smart-locks.create",
	UPDATE: "smart-locks.edit",
	DELETE: "smart-locks.delete",
}

const MONITOR_PERMISSION = {
	READ: "monitors.read",
	CREATE: "monitors.create",
	UPDATE: "monitors.edit",
	DELETE: "monitors.delete",
}

const DASHBOARD_PERMISSION = {
	READ: "dashboard.read",
	CREATE: "dashboard.create",
	UPDATE: "dashboard.edit",
	DELETE: "dashboard.delete",
}

const USER_PERMISSION = {
	READ: "user.read",
	CREATE: "user.create",
	UPDATE: "user.edit",
	DELETE: "user.delete",
}

const SETTING_PERMISSION = {
	READ: "setting.read",
	CREATE: "setting.create",
	UPDATE: "setting.edit",
	DELETE: "setting.delete",
}

const ROLE_PERMISSION = {
	READ: "role.read",
	CREATE: "role.create",
	UPDATE: "role.edit",
	DELETE: "role.delete",
}

const PERMISSIONS = {
	DETECTION: DETECTION_PERMISSION,
	ENGINE: ENGINE_PERMISSION,
	COMPANY: COMPANY_PERMISSION,
	SMART_LOCK: SMART_LOCK_PERMISSION,
	MONITOR: MONITOR_PERMISSION,
	DASHBOARD: DASHBOARD_PERMISSION,
	USER: USER_PERMISSION,
	SETTING: SETTING_PERMISSION,
	ROLE: ROLE_PERMISSION,
}

export default PERMISSIONS
