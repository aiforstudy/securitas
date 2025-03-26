import { ILiveViewTemplate } from "@/types/liveView"

export const getGridItemClasses = (col: ILiveViewTemplate["cols"][number]) => {
	const properties = [
		{ key: "row-start", value: col.grid_row_start },
		{ key: "row-end", value: col.grid_row_end },
		{ key: "column-start", value: col.grid_column_start },
		{ key: "column-end", value: col.grid_column_end },
	]
	let value = ""
	properties.forEach((property) => {
		value += property.value ? ` grid-item-${property.key}-${property.value}` : ` grid-item-${property.key}-unset`
	})

	return value
}
