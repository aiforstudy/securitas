const DETECTION_PERMISSION = {
	READ: "detection.read",
	CREATE: "detection.create",
	UPDATE: "detection.edit",
	DELETE: "detection.delete",
}

const ENGINE_PERMISSION = {
	READ: "engine.read",
	CREATE: "engine.create",
	UPDATE: "engine.edit",
	DELETE: "engine.delete",
}

const COMPANY_PERMISSION = {
	READ: "company.read",
	CREATE: "company.create",
	UPDATE: "company.edit",
	DELETE: "company.delete",
}

const SMART_LOCK_PERMISSION = {
	READ: "smartlock.read",
	CREATE: "smartlock.create",
	UPDATE: "smartlock.edit",
	DELETE: "smartlock.delete",
}

const MONITOR_PERMISSION = {
	READ: "monitor.read",
	CREATE: "monitor.create",
	UPDATE: "monitor.edit",
	DELETE: "monitor.delete",
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
