export type ICamera = {
	color: string | null
	company: { id: string; name: string; company_code: string }
	company_code: string
	connection_uri: string
	created_at: string
	engines: string[]
	engines_require_approval: string[]
	id: string
	location: null
	name: string
	platform_device_id: string | null
	rtmp_uri: string | null
	rule: []
	snapshot: string
	status: string
	type: string
	updated_at: string
	zone: ICameraZone[]
	zones: ICameraZone[]
	angle_view: string | null
	camera_identification: string | null
	configs: object | null
	direction: null
	enable_status: null
	group_id: string | null
	is_deleted: boolean
	is_local: boolean
	position: { x: number; y: number }
	rtsp_url: string | null
	seq_no_format: string | null
	snapshot_created_at: string
	username: string | null
	web_url: string | null
	battery_threshold: number
	disabled: number
	latest_disabled_at: null
	expiry_date: null
	object_mapping: null
	zabbix_host_id: null
	description: string | null
	sub_connection_uri: null
	sn: null
}

export type ICameraZone = {
	id: string
	name: string
	width: number
	height: number
	engines: string[]
	polygon: IAxis[]
	camera_id: string
	color: string
	company_code: string
	config: object
	created_at: string
	square: ISquare
	updated_at: string
	zone_object?: ICameraZoneObject
	zoneColor: string
	startTime: string
	endTime: string
	activeDays: string[]
	updated_by: string
	timestamp: string
}

export type IAxis = {
	x: number
	y: number
}

export type ISquare = IAxis & {
	width: number
	height: number
}

export type ICameraZoneObject = {
	id?: string
	name?: string
	data?: object
	type: "WorkerCounting" | "MultipleZones" | "SingleZone" | "LineDirection"
	color?: string | null
	width?: number
	height?: number
	status?: "hide" | "active"
	config?: object | null
	line?: IAxis[]
	square?: ISquare
	polygon?: IAxis[]
	polygons?: { id: string; color: string; status: "hide" | "active"; polygon: IAxis[] }[]
	direction?: { in: IAxis[]; out: IAxis[] }
}
