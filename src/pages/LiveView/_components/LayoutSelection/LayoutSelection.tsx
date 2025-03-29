import { LoaderCircle } from "lucide-react"

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ILiveViewLayout } from "@/types/liveView"

type ILayoutSelectionProps = {
	layouts: ILiveViewLayout[]
	selected: string
	onSelect: (layoutId: string) => void
	isLoading: boolean
}

const LayoutSelection: React.FC<ILayoutSelectionProps> = ({ selected, layouts, isLoading, onSelect }) => {
	return (
		<Select value={selected} disabled={isLoading} onValueChange={(value) => onSelect(value)}>
			<SelectTrigger className="w-10 min-w-[140px] h-10 text-sm px-2">
				<div className="flex items-center gap-2">
					<div className="gap-2	flex">
						{isLoading ? (
							<LoaderCircle className="animate-spin" size={16} />
						) : (
							<div className="text-gray-600">Layout:</div>
						)}
						<SelectValue placeholder="Select layout" />
					</div>
				</div>
			</SelectTrigger>
			<SelectContent className="!rounded-md">
				<SelectGroup>
					{layouts?.map((item) => (
						<SelectItem value={item.id} key={`layout-${item.id}`} className="text-sm">
							{item.name}
						</SelectItem>
					))}
					<SelectItem value="add-new-layout" key="add-new-layout" className="text-sm">
						Add new layout
					</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}

export default LayoutSelection
