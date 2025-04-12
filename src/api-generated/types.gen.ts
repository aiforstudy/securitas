// This file is auto-generated by @hey-api/openapi-ts

export type CreateCompanyDto = {
	/**
	 * Company ID (UUID)
	 */
	id?: string
	/**
	 * The name of the company
	 */
	name: string
	/**
	 * The unique code of the company
	 */
	company_code: string
	/**
	 * The selected project for the company
	 */
	selected_project?: string
	/**
	 * The expiration date of the company
	 */
	expires_on?: string
	/**
	 * The title of the company
	 */
	title?: string
	/**
	 * The API key for the company
	 */
	apikey?: string
	/**
	 * The URL of the company logo
	 */
	logo_url?: string
	/**
	 * The daily report configuration
	 */
	daily_report?: string
	/**
	 * The instant alert configuration
	 */
	instant_alert?: string
	/**
	 * The enabled cards configuration
	 */
	enabled_cards?: string
	/**
	 * The locale settings for the company
	 */
	locale?: {
		[key: string]: unknown
	}
	/**
	 * The location coordinates
	 */
	location?: string
}

export type Company = {
	/**
	 * The unique identifier of the company
	 */
	id: string
	/**
	 * The name of the company
	 */
	name: string
	/**
	 * The unique code of the company
	 */
	company_code: string
	/**
	 * The selected project for the company
	 */
	selected_project?: string
	/**
	 * The expiration date of the company
	 */
	expires_on?: string
	/**
	 * The title of the company
	 */
	title?: string
	/**
	 * The API key for the company
	 */
	apikey?: string
	/**
	 * The URL of the company logo
	 */
	logo_url?: string
	/**
	 * The daily report configuration
	 */
	daily_report?: string
	/**
	 * The instant alert configuration
	 */
	instant_alert?: string
	/**
	 * The enabled cards configuration
	 */
	enabled_cards?: string
	/**
	 * The locale settings for the company
	 */
	locale?: {
		[key: string]: unknown
	}
	/**
	 * The location
	 */
	location?: string
	/**
	 * The timestamp when the company was created
	 */
	created_at: string
	/**
	 * The timestamp when the company was last updated
	 */
	updated_at: string
}

export type PaginatedCompanyDto = {
	/**
	 * Array of companies
	 */
	data: Array<Company>
	/**
	 * Current page number
	 */
	page: number
	/**
	 * Number of items per page
	 */
	limit: number
	/**
	 * Total number of items
	 */
	total: number
	/**
	 * Total number of pages
	 */
	total_pages: number
}

export type UpdateCompanyDto = {
	[key: string]: unknown
}

export type CreateEngineDto = {
	/**
	 * Engine ID
	 */
	id: string
	/**
	 * Engine name
	 */
	name: string
	/**
	 * Related engine ID
	 */
	related_engine?: string
	/**
	 * Engine icon URL
	 */
	icon?: string
	/**
	 * Engine color in hex format
	 */
	color?: string
}

export type Engine = {
	/**
	 * The unique identifier of the engine
	 */
	id: string
	/**
	 * The name of the engine
	 */
	name: string
	/**
	 * The description of the engine
	 */
	description: string
	/**
	 * The type of engine
	 */
	type: string
	/**
	 * The version of the engine
	 */
	version: string
	/**
	 * The status of the engine
	 */
	status: string
	/**
	 * The icon of the engine
	 */
	icon: string
	/**
	 * The color of the engine
	 */
	color: string
	/**
	 * The timestamp when the engine was created
	 */
	created_at: string
	/**
	 * The timestamp when the engine was last updated
	 */
	updated_at: string
}

export type PaginatedEngineDto = {
	/**
	 * List of engines
	 */
	data: Array<Engine>
	/**
	 * Current page number
	 */
	page: number
	/**
	 * Number of items per page
	 */
	limit: number
	/**
	 * Total number of items
	 */
	total: number
	/**
	 * Total number of pages
	 */
	total_pages: number
}

export type UpdateEngineDto = {
	/**
	 * Engine ID
	 */
	id?: string
	/**
	 * Engine name
	 */
	name?: string
	/**
	 * Related engine ID
	 */
	related_engine?: string
	/**
	 * Engine icon URL
	 */
	icon?: string
	/**
	 * Engine color in hex format
	 */
	color?: string
}

/**
 * The status of the monitor
 */
export enum Status {
	CONNECTED = "CONNECTED",
	DISCONNECTED = "DISCONNECTED",
	UNAVAILABLE = "UNAVAILABLE",
}

export type CreateMonitorDto = {
	/**
	 * The company code associated with the monitor
	 */
	company_code: string
	/**
	 * The name of the monitor
	 */
	name?: string
	/**
	 * The engines configuration as JSON string
	 */
	engines?: string
	/**
	 * The zone configuration as JSON string
	 */
	zone?: string
	/**
	 * The type of monitor
	 */
	type?: string
	/**
	 * The device ID
	 */
	device_id?: string
	/**
	 * The IP address
	 */
	ip?: string
	/**
	 * The configuration version
	 */
	config?: string
	/**
	 * The user ID
	 */
	user_id?: string
	/**
	 * The connection URI
	 */
	connection_uri?: string
	/**
	 * The hls URI
	 */
	hls_uri?: string
	/**
	 * The snapshot data
	 */
	snapshot?: string
	/**
	 * The location
	 */
	location?: string
	/**
	 * The last ping timestamp
	 */
	last_ping_at?: string
	/**
	 * The engines requiring approval
	 */
	engines_require_approval?: string
	/**
	 * The color
	 */
	color?: string
	/**
	 * The status of the monitor
	 */
	status?: "CONNECTED" | "DISCONNECTED" | "UNAVAILABLE"
	/**
	 * The serial number
	 */
	sn?: string
	/**
	 * The description
	 */
	description?: string
}

/**
 * The status of the monitor
 */
export enum MonitorStatus {
	CONNECTED = "CONNECTED",
	DISCONNECTED = "DISCONNECTED",
	UNAVAILABLE = "UNAVAILABLE",
}

export type Monitor = {
	/**
	 * The unique identifier of the monitor
	 */
	id: string
	/**
	 * The company code associated with the monitor
	 */
	company_code: string
	/**
	 * The name of the monitor
	 */
	name: string
	/**
	 * The engines configuration as JSON string
	 */
	engines: string
	/**
	 * The zone configuration as JSON string
	 */
	zone: string
	/**
	 * The type of monitor
	 */
	type: string
	/**
	 * The device ID
	 */
	device_id: string
	/**
	 * The IP address
	 */
	ip: string
	/**
	 * The configuration version
	 */
	config: string
	/**
	 * The user ID
	 */
	user_id: string
	/**
	 * The connection URI
	 */
	connection_uri: string
	/**
	 * The hls URI
	 */
	hls_uri: string
	/**
	 * The snapshot data
	 */
	snapshot: string
	/**
	 * The location
	 */
	location: string
	/**
	 * The last ping timestamp
	 */
	last_ping_at: string
	/**
	 * The engines requiring approval
	 */
	engines_require_approval: string
	/**
	 * The color
	 */
	color: string
	status: MonitorStatus
	/**
	 * The serial number
	 */
	sn: string
	/**
	 * The description
	 */
	description: string
	/**
	 * The timestamp when the monitor was created
	 */
	created_at: string
	/**
	 * The timestamp when the monitor was last updated
	 */
	updated_at: string
}

export type PaginatedMonitorDto = {
	/**
	 * Array of monitors
	 */
	data: Array<Monitor>
	/**
	 * Current page number
	 */
	page: number
	/**
	 * Number of items per page
	 */
	limit: number
	/**
	 * Total number of items
	 */
	total: number
	/**
	 * Total number of pages
	 */
	total_pages: number
}

export type UpdateMonitorDto = {
	/**
	 * The company code associated with the monitor
	 */
	company_code?: string
	/**
	 * The name of the monitor
	 */
	name?: string
	/**
	 * The engines configuration as JSON string
	 */
	engines?: string
	/**
	 * The zone configuration as JSON string
	 */
	zone?: string
	/**
	 * The type of monitor
	 */
	type?: string
	/**
	 * The device ID
	 */
	device_id?: string
	/**
	 * The IP address
	 */
	ip?: string
	/**
	 * The configuration version
	 */
	config?: string
	/**
	 * The user ID
	 */
	user_id?: string
	/**
	 * The connection URI
	 */
	connection_uri?: string
	/**
	 * The hls URI
	 */
	hls_uri?: string
	/**
	 * The snapshot data
	 */
	snapshot?: string
	/**
	 * The location
	 */
	location?: string
	/**
	 * The last ping timestamp
	 */
	last_ping_at?: string
	/**
	 * The engines requiring approval
	 */
	engines_require_approval?: string
	/**
	 * The color
	 */
	color?: string
	/**
	 * The status of the monitor
	 */
	status?: "CONNECTED" | "DISCONNECTED" | "UNAVAILABLE"
	/**
	 * The serial number
	 */
	sn?: string
	/**
	 * The description
	 */
	description?: string
}

export type StartStreamDto = {
	/**
	 * List of monitor IDs to start streaming
	 */
	monitor_ids: Array<string>
}

export type DetectionStatisticsDataDto = {
	/**
	 * Timestamp of the statistics entry in ISO 8601 format
	 */
	timestamp: string
}

export type DetectionStatisticsResponseDto = {
	/**
	 * Array of statistics data
	 */
	data: Array<DetectionStatisticsDataDto>
	/**
	 * Map of engine details
	 */
	engines: {
		[key: string]: unknown
	}
}

/**
 * The status of the detection
 */
export enum DetectionStatus {
	PENDING = "PENDING",
	APPROVED = "APPROVED",
	REJECTED = "REJECTED",
	COMPLETED = "COMPLETED",
}

/**
 * The feedback status of the detection
 */
export enum FeedbackStatus {
	UNMARK = "UNMARK",
	APPROVED = "APPROVED",
	REJECTED = "REJECTED",
}

export type Detection = {
	/**
	 * The unique identifier of the detection
	 */
	id: string
	/**
	 * The timestamp of the detection
	 */
	timestamp: string
	/**
	 * The monitor ID
	 */
	monitor_id: string
	/**
	 * The approved status
	 */
	approved?: string
	/**
	 * The approved by
	 */
	approved_by?: string
	/**
	 * The zone ID
	 */
	zone?: string
	/**
	 * The monitor details
	 */
	monitor?: Monitor
	/**
	 * The engine ID
	 */
	engine: string
	/**
	 * The engine details
	 */
	engineDetail?: Engine
	status: DetectionStatus
	feedback_status: FeedbackStatus
	/**
	 * Whether the detection is an alert
	 */
	alert: boolean
	/**
	 * Whether the detection is unread
	 */
	unread: boolean
	/**
	 * The district where the detection occurred
	 */
	district: string
	/**
	 * The suspected offense
	 */
	suspected_offense: string
	/**
	 * The type of vehicle
	 */
	vehicle_type: string
	/**
	 * The license plate number
	 */
	license_plate: string
	/**
	 * Additional metadata about the detection
	 */
	metadata: {
		[key: string]: unknown
	}
	/**
	 * The timestamp when the detection was created
	 */
	created_at: string
	/**
	 * The timestamp when the detection was last updated
	 */
	updated_at: string
	/**
	 * The image URL of the detection
	 */
	image_url?: string
	/**
	 * The video URL of the detection
	 */
	video_url?: string
}

export type PaginatedDetectionDto = {
	/**
	 * The list of detections
	 */
	data: Array<Detection>
	/**
	 * The current page number
	 */
	page: number
	/**
	 * The number of items per page
	 */
	limit: number
	/**
	 * The total number of items
	 */
	total: number
	/**
	 * The total number of pages
	 */
	total_pages: number
}

/**
 * The feedback status of the detection
 */
export enum FeedbackStatus2 {
	UNMARK = "UNMARK",
	APPROVED = "APPROVED",
	REJECTED = "REJECTED",
}

export type CreateDetectionDto = {
	/**
	 * The unique identifier of the detection
	 */
	id?: string
	/**
	 * The timestamp of the detection
	 */
	timestamp?: string
	/**
	 * The monitor ID
	 */
	monitor_id: string
	/**
	 * The engine ID
	 */
	engine: string
	/**
	 * The status of the detection
	 */
	status?: "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED"
	/**
	 * The feedback status of the detection
	 */
	feedback_status?: "UNMARK" | "APPROVED" | "REJECTED"
	/**
	 * Whether the detection is an alert
	 */
	alert?: string
	/**
	 * The district where the detection occurred
	 */
	district?: string
	/**
	 * The suspected offense
	 */
	suspected_offense?: string
	/**
	 * The type of vehicle
	 */
	vehicle_type?: string
	/**
	 * The license plate number
	 */
	license_plate?: string
	/**
	 * Additional metadata about the detection
	 */
	metadata?: {
		[key: string]: unknown
	}
	/**
	 * URL to the detection image
	 */
	image_url?: string
	/**
	 * URL to the detection video
	 */
	video_url?: string
}

export type UpdateDetectionDto = {
	/**
	 * The status of the detection
	 */
	status?: "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED"
	/**
	 * The feedback status of the detection
	 */
	feedback_status?: "UNMARK" | "APPROVED" | "REJECTED"
	/**
	 * Whether the detection is unread
	 */
	unread?: boolean
	/**
	 * The approved status
	 */
	approved?: string
	/**
	 * The approved by
	 */
	approved_by?: string
}

/**
 * The approval status
 */
export enum Approved {
	YES = "yes",
	NO = "no",
	EXPIRED = "expired",
}

export type BulkApproveDetectionDto = {
	/**
	 * Array of detection IDs to approve
	 */
	detection_ids: Array<string>
	/**
	 * The approval status
	 */
	approved: "yes" | "no" | "expired"
	/**
	 * The user who approved the detection
	 */
	approved_by?: string
}

export type LoginDto = {
	/**
	 * The email of the user
	 */
	email: string
	/**
	 * The password of the user
	 */
	password: string
}

export type RegisterDto = {
	/**
	 * The email of the user
	 */
	email: string
	/**
	 * The password of the user
	 */
	password: string
	/**
	 * The name of the user
	 */
	name: string
	/**
	 * The role of the user
	 */
	role?: string
	/**
	 * The company code associated with the user
	 */
	company_code?: string
}

export type UserPermissionsDto = {
	/**
	 * User ID
	 */
	id: string
	/**
	 * User email
	 */
	email: string
	/**
	 * User name
	 */
	name: string
	/**
	 * User role
	 */
	role: string
	/**
	 * Company code associated with the user
	 */
	company_code?: string
	/**
	 * List of permissions based on role
	 */
	permissions: Array<string>
}

export type AppControllerGetHelloData = {
	body?: never
	path?: never
	query?: never
	url: "/"
}

export type AppControllerGetHelloResponses = {
	200: unknown
}

export type CompanyControllerFindAllData = {
	body?: never
	path?: never
	query?: {
		/**
		 * Page number (1-based)
		 */
		page?: number
		/**
		 * Number of items per page
		 */
		limit?: number
	}
	url: "/companies"
}

export type CompanyControllerFindAllResponses = {
	/**
	 * Return paginated companies.
	 */
	200: PaginatedCompanyDto
}

export type CompanyControllerFindAllResponse =
	CompanyControllerFindAllResponses[keyof CompanyControllerFindAllResponses]

export type CompanyControllerCreateData = {
	body: CreateCompanyDto
	path?: never
	query?: never
	url: "/companies"
}

export type CompanyControllerCreateResponses = {
	/**
	 * The company has been successfully created.
	 */
	201: Company
}

export type CompanyControllerCreateResponse = CompanyControllerCreateResponses[keyof CompanyControllerCreateResponses]

export type CompanyControllerRemoveData = {
	body?: never
	path: {
		code: string
	}
	query?: never
	url: "/companies/{code}"
}

export type CompanyControllerRemoveErrors = {
	/**
	 * Company not found.
	 */
	404: unknown
}

export type CompanyControllerRemoveResponses = {
	/**
	 * The company has been successfully deleted.
	 */
	204: void
}

export type CompanyControllerRemoveResponse = CompanyControllerRemoveResponses[keyof CompanyControllerRemoveResponses]

export type CompanyControllerFindOneData = {
	body?: never
	path: {
		code: string
	}
	query?: never
	url: "/companies/{code}"
}

export type CompanyControllerFindOneErrors = {
	/**
	 * Company not found.
	 */
	404: unknown
}

export type CompanyControllerFindOneResponses = {
	/**
	 * Return the company.
	 */
	200: Company
}

export type CompanyControllerFindOneResponse =
	CompanyControllerFindOneResponses[keyof CompanyControllerFindOneResponses]

export type CompanyControllerUpdateData = {
	body: UpdateCompanyDto
	path: {
		code: string
	}
	query?: never
	url: "/companies/{code}"
}

export type CompanyControllerUpdateErrors = {
	/**
	 * Company not found.
	 */
	404: unknown
}

export type CompanyControllerUpdateResponses = {
	/**
	 * The company has been successfully updated.
	 */
	200: Company
}

export type CompanyControllerUpdateResponse = CompanyControllerUpdateResponses[keyof CompanyControllerUpdateResponses]

export type EngineControllerFindAllData = {
	body?: never
	path?: never
	query?: {
		/**
		 * Engine name to search for
		 */
		name?: string
		/**
		 * Page number
		 */
		page?: number
		/**
		 * Number of items per page
		 */
		limit?: number
	}
	url: "/engines"
}

export type EngineControllerFindAllResponses = {
	/**
	 * Return all engines with pagination.
	 */
	200: PaginatedEngineDto
}

export type EngineControllerFindAllResponse = EngineControllerFindAllResponses[keyof EngineControllerFindAllResponses]

export type EngineControllerCreateData = {
	body: CreateEngineDto
	path?: never
	query?: never
	url: "/engines"
}

export type EngineControllerCreateResponses = {
	/**
	 * The engine has been successfully created.
	 */
	201: Engine
}

export type EngineControllerCreateResponse = EngineControllerCreateResponses[keyof EngineControllerCreateResponses]

export type EngineControllerRemoveData = {
	body?: never
	path: {
		id: string
	}
	query?: never
	url: "/engines/{id}"
}

export type EngineControllerRemoveErrors = {
	/**
	 * Engine not found.
	 */
	404: unknown
}

export type EngineControllerRemoveResponses = {
	/**
	 * The engine has been successfully deleted.
	 */
	204: void
}

export type EngineControllerRemoveResponse = EngineControllerRemoveResponses[keyof EngineControllerRemoveResponses]

export type EngineControllerFindOneData = {
	body?: never
	path: {
		id: string
	}
	query?: never
	url: "/engines/{id}"
}

export type EngineControllerFindOneErrors = {
	/**
	 * Engine not found.
	 */
	404: unknown
}

export type EngineControllerFindOneResponses = {
	/**
	 * Return the engine.
	 */
	200: Engine
}

export type EngineControllerFindOneResponse = EngineControllerFindOneResponses[keyof EngineControllerFindOneResponses]

export type EngineControllerUpdateData = {
	body: UpdateEngineDto
	path: {
		id: string
	}
	query?: never
	url: "/engines/{id}"
}

export type EngineControllerUpdateErrors = {
	/**
	 * Engine not found.
	 */
	404: unknown
}

export type EngineControllerUpdateResponses = {
	/**
	 * The engine has been successfully updated.
	 */
	200: Engine
}

export type EngineControllerUpdateResponse = EngineControllerUpdateResponses[keyof EngineControllerUpdateResponses]

export type MonitorControllerFindAllData = {
	body?: never
	path?: never
	query?: {
		/**
		 * The page number
		 */
		page?: number
		/**
		 * The number of items per page
		 */
		limit?: number
		/**
		 * The company code to filter by
		 */
		company_code?: string
		/**
		 * The status to filter by
		 */
		status?: "CONNECTED" | "DISCONNECTED" | "UNAVAILABLE"
		/**
		 * The search term to filter by name or description
		 */
		search?: string
	}
	url: "/monitors"
}

export type MonitorControllerFindAllResponses = {
	/**
	 * Return all monitors.
	 */
	200: PaginatedMonitorDto
}

export type MonitorControllerFindAllResponse =
	MonitorControllerFindAllResponses[keyof MonitorControllerFindAllResponses]

export type MonitorControllerCreateData = {
	body: CreateMonitorDto
	path?: never
	query?: never
	url: "/monitors"
}

export type MonitorControllerCreateResponses = {
	/**
	 * The monitor has been successfully created.
	 */
	201: Monitor
}

export type MonitorControllerCreateResponse = MonitorControllerCreateResponses[keyof MonitorControllerCreateResponses]

export type MonitorControllerRemoveData = {
	body?: never
	path: {
		id: string
	}
	query?: never
	url: "/monitors/{id}"
}

export type MonitorControllerRemoveErrors = {
	/**
	 * Monitor not found.
	 */
	404: unknown
}

export type MonitorControllerRemoveResponses = {
	/**
	 * The monitor has been successfully deleted.
	 */
	204: void
}

export type MonitorControllerRemoveResponse = MonitorControllerRemoveResponses[keyof MonitorControllerRemoveResponses]

export type MonitorControllerFindOneData = {
	body?: never
	path: {
		id: string
	}
	query?: never
	url: "/monitors/{id}"
}

export type MonitorControllerFindOneErrors = {
	/**
	 * Monitor not found.
	 */
	404: unknown
}

export type MonitorControllerFindOneResponses = {
	/**
	 * Return the monitor.
	 */
	200: Monitor
}

export type MonitorControllerFindOneResponse =
	MonitorControllerFindOneResponses[keyof MonitorControllerFindOneResponses]

export type MonitorControllerUpdateData = {
	body: UpdateMonitorDto
	path: {
		id: string
	}
	query?: never
	url: "/monitors/{id}"
}

export type MonitorControllerUpdateErrors = {
	/**
	 * Monitor not found.
	 */
	404: unknown
}

export type MonitorControllerUpdateResponses = {
	/**
	 * The monitor has been successfully updated.
	 */
	200: Monitor
}

export type MonitorControllerUpdateResponse = MonitorControllerUpdateResponses[keyof MonitorControllerUpdateResponses]

export type MonitorControllerStartStreamData = {
	body: StartStreamDto
	path?: never
	query?: never
	url: "/monitors/start-stream"
}

export type MonitorControllerStartStreamResponses = {
	/**
	 * Streams have been successfully started.
	 */
	200: unknown
}

/**
 * Group by time unit
 */
export enum GroupBy {
	DAY = "day",
	HOUR = "hour",
}

export type DetectionControllerGetStatisticsData = {
	body?: never
	path?: never
	query: {
		/**
		 * The company code
		 */
		company_code: string
		/**
		 * Start date for statistics
		 */
		from: string
		/**
		 * End date for statistics
		 */
		to: string
		/**
		 * Timezone for date formatting
		 */
		timezone?: string
		/**
		 * Group by time unit
		 */
		group_by?: "day" | "hour"
	}
	url: "/detections/statistics"
}

export type DetectionControllerGetStatisticsResponses = {
	/**
	 * Return detection statistics grouped by engine and time.
	 */
	200: DetectionStatisticsResponseDto
}

export type DetectionControllerGetStatisticsResponse =
	DetectionControllerGetStatisticsResponses[keyof DetectionControllerGetStatisticsResponses]

export type DetectionControllerSearchDetectionsData = {
	body?: never
	path?: never
	query?: {
		/**
		 * Monitor name to search for
		 */
		monitor_name?: string
		/**
		 * Company name to search for
		 */
		company_name?: string
		/**
		 * Company code to search for
		 */
		company_code?: string
		/**
		 * Detection ID to search for
		 */
		detection_id?: string
		/**
		 * Detection status to filter by
		 */
		status?: "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED"
		/**
		 * Approval status to filter by
		 */
		approved?: "yes" | "no" | "expired"
		/**
		 * From date to filter by (ISO 8601 format)
		 */
		from?: string
		/**
		 * To date to filter by (ISO 8601 format)
		 */
		to?: string
		/**
		 * Page number to filter by
		 */
		page?: number
		/**
		 * Limit number to filter by
		 */
		limit?: number
	}
	url: "/detections/search"
}

export type DetectionControllerSearchDetectionsResponses = {
	/**
	 * Return filtered detections sorted by timestamp.
	 */
	200: PaginatedDetectionDto
}

export type DetectionControllerSearchDetectionsResponse =
	DetectionControllerSearchDetectionsResponses[keyof DetectionControllerSearchDetectionsResponses]

export type DetectionControllerCreateIncomingDetectionData = {
	body: CreateDetectionDto
	path?: never
	query?: never
	url: "/detections/incoming"
}

export type DetectionControllerCreateIncomingDetectionResponses = {
	/**
	 * The detection has been successfully created.
	 */
	201: Detection
}

export type DetectionControllerCreateIncomingDetectionResponse =
	DetectionControllerCreateIncomingDetectionResponses[keyof DetectionControllerCreateIncomingDetectionResponses]

export type DetectionControllerFindAllData = {
	body?: never
	path?: never
	query?: {
		/**
		 * The page number
		 */
		page?: number
		/**
		 * The number of items per page
		 */
		limit?: number
		/**
		 * The monitor ID to filter by
		 */
		monitor_id?: string
		/**
		 * The engine to filter by
		 */
		engine?: string
		/**
		 * The status to filter by
		 */
		status?: "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED"
		/**
		 * The feedback status to filter by
		 */
		feedback_status?: "UNMARK" | "APPROVED" | "REJECTED"
		/**
		 * Filter by alert status
		 */
		alert?: boolean
		/**
		 * Filter by unread status
		 */
		unread?: boolean
		/**
		 * The start date to filter by
		 */
		start_date?: string
		/**
		 * The end date to filter by
		 */
		end_date?: string
		/**
		 * Filter by approved status
		 */
		approved?: "yes" | "no" | "expired"
	}
	url: "/detections"
}

export type DetectionControllerFindAllResponses = {
	/**
	 * Return all detections.
	 */
	200: PaginatedDetectionDto
}

export type DetectionControllerFindAllResponse =
	DetectionControllerFindAllResponses[keyof DetectionControllerFindAllResponses]

export type DetectionControllerRemoveData = {
	body?: never
	path: {
		id: string
	}
	query?: never
	url: "/detections/{id}"
}

export type DetectionControllerRemoveErrors = {
	/**
	 * Detection not found.
	 */
	404: unknown
}

export type DetectionControllerRemoveResponses = {
	/**
	 * The detection has been successfully deleted.
	 */
	204: void
}

export type DetectionControllerRemoveResponse =
	DetectionControllerRemoveResponses[keyof DetectionControllerRemoveResponses]

export type DetectionControllerFindOneData = {
	body?: never
	path: {
		id: string
	}
	query?: never
	url: "/detections/{id}"
}

export type DetectionControllerFindOneErrors = {
	/**
	 * Detection not found.
	 */
	404: unknown
}

export type DetectionControllerFindOneResponses = {
	/**
	 * Return the detection.
	 */
	200: Detection
}

export type DetectionControllerFindOneResponse =
	DetectionControllerFindOneResponses[keyof DetectionControllerFindOneResponses]

export type DetectionControllerUpdateData = {
	body: UpdateDetectionDto
	path: {
		id: string
	}
	query?: never
	url: "/detections/{id}"
}

export type DetectionControllerUpdateErrors = {
	/**
	 * Detection not found.
	 */
	404: unknown
}

export type DetectionControllerUpdateResponses = {
	/**
	 * The detection has been successfully updated.
	 */
	200: Detection
}

export type DetectionControllerUpdateResponse =
	DetectionControllerUpdateResponses[keyof DetectionControllerUpdateResponses]

export type DetectionControllerApproveDetectionData = {
	body?: never
	path: {
		id: string
	}
	query?: never
	url: "/detections/{id}/approve"
}

export type DetectionControllerApproveDetectionErrors = {
	/**
	 * Detection not found.
	 */
	404: unknown
}

export type DetectionControllerApproveDetectionResponses = {
	/**
	 * The detection has been successfully approved.
	 */
	200: Detection
}

export type DetectionControllerApproveDetectionResponse =
	DetectionControllerApproveDetectionResponses[keyof DetectionControllerApproveDetectionResponses]

export type DetectionControllerBulkApproveDetectionsData = {
	body: BulkApproveDetectionDto
	path?: never
	query?: never
	url: "/detections/approve/bulk"
}

export type DetectionControllerBulkApproveDetectionsErrors = {
	/**
	 * One or more detections not found.
	 */
	404: unknown
}

export type DetectionControllerBulkApproveDetectionsResponses = {
	/**
	 * The detections have been successfully approved.
	 */
	200: Array<Detection>
}

export type DetectionControllerBulkApproveDetectionsResponse =
	DetectionControllerBulkApproveDetectionsResponses[keyof DetectionControllerBulkApproveDetectionsResponses]

export type AuthControllerLoginData = {
	body: LoginDto
	path?: never
	query?: never
	url: "/auth/login"
}

export type AuthControllerLoginErrors = {
	/**
	 * Invalid credentials
	 */
	401: unknown
}

export type AuthControllerLoginResponses = {
	/**
	 * User logged in successfully
	 */
	200: unknown
}

export type AuthControllerRegisterData = {
	body: RegisterDto
	path?: never
	query?: never
	url: "/auth/register"
}

export type AuthControllerRegisterErrors = {
	/**
	 * Bad request
	 */
	400: unknown
}

export type AuthControllerRegisterResponses = {
	/**
	 * User registered successfully
	 */
	201: unknown
}

export type AuthControllerGetPermissionsData = {
	body?: never
	path?: never
	query?: never
	url: "/auth/permissions"
}

export type AuthControllerGetPermissionsErrors = {
	/**
	 * Unauthorized
	 */
	401: unknown
}

export type AuthControllerGetPermissionsResponses = {
	/**
	 * User permissions retrieved successfully
	 */
	200: UserPermissionsDto
}

export type AuthControllerGetPermissionsResponse =
	AuthControllerGetPermissionsResponses[keyof AuthControllerGetPermissionsResponses]

export type ClientOptions = {
	baseURL: string
}
