export type IGetListParams = {
	page: number
	limit: number
}

export type IGetListResult<DataType> = {
	data: DataType[]
	count: number
}
