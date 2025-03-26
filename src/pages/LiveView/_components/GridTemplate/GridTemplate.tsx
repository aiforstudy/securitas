import React, { memo } from "react"

import { cn } from "@/lib/utils"
import { ILiveViewTemplate } from "@/types/liveView"
import { getGridItemClasses } from "@/utils/grid"

type IGridTemplateProps = {
	template: ILiveViewTemplate
	selected: boolean
	onSelect: (template: ILiveViewTemplate) => void
}

const GridTemplate: React.FC<IGridTemplateProps> = ({ template, selected, onSelect }) => {
	return (
		<div className="text-center cursor-pointer" onClick={() => onSelect(template)}>
			<div
				className={cn(
					"p-2 grid grid-cols-1 h-[150px] items-center justify-center",
					selected && "border-2 border-primary",
				)}
			>
				<div
					key={template.id}
					style={{ gridTemplateColumns: `repeat(${template.total_columns}, 1fr)` }}
					className="grid w-full h-full border-t-2 border-l-2 auto-rows-fr"
				>
					{template.cols.map((col, index) => {
						return (
							<div
								key={`${col.col}-${index}`}
								className={`border-r-2 border-b-2 bg-gray-50 ${getGridItemClasses(col)}`}
							/>
						)
					})}
				</div>
			</div>
			<div className={cn("mt-3 text-md font-medium", selected && "text-primary")}>{template.name}</div>
		</div>
	)
}

export default memo(GridTemplate)
