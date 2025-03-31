export type ILiveViewGridCol = {
	col: number
	grid_row_start?: number
	grid_row_end?: number
	grid_column_start?: number
	grid_column_end?: number
}

export type ILiveViewGridRow = {
	id: number
	grid_row_start?: number
	grid_row_end?: number
}

export type ILiveViewTemplate = {
	id: string
	name: string
	cols: ILiveViewGridCol[]
	order: number
	total_columns: number
}

export type ILiveViewLayout = {
	id: string
	name: string
	created_at: string
	updated_at: string
	company_code: string
	configuration_id: null | string
}

export type ILiveViewDetailLayout = {
	id?: string
	name: string
	layout: {
		name: string
		positions: ILiveViewPositionCamera[]
		activated: boolean
		total_columns: number
		configuration_id: string
	}
	company_code: string
}

export type ILiveViewPositionCamera = {
	id?: string
	monitor?: {
		id: string
		name: string
		snapshot: string
		rtmp_uri: null | string
		company_code: string
		connection_uri: string
	}
	has_monitor: boolean
	grid_settings: {
		col: number
	}
}

export type IStreamingCamera = {
	url: string | null
	snapshot: string | null
	cameraId: string | null
	cameraName: string | null
}
