import { memo, useState } from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ILiveViewTemplate } from "@/types/liveView"

import GridTemplate from "../GridTemplate"

type IAddLayoutDialogProps = {
	open: boolean
	templates: ILiveViewTemplate[]
	onOpenChange: (open: boolean) => void
}

const AddLayoutDialog: React.FC<IAddLayoutDialogProps> = ({ open, templates, onOpenChange }) => {
	const [selectedTemplate, setSelectedTemplate] = useState<ILiveViewTemplate | null>(null)

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="pt-12 !max-w-[800px]">
				<DialogHeader>
					<DialogTitle>Add new layout</DialogTitle>
				</DialogHeader>
				<div className="mt-5 grid grid-cols-3 gap-4">
					{templates.map((item) => (
						<GridTemplate
							key={item.id}
							template={item}
							selected={selectedTemplate?.id === item.id}
							onSelect={setSelectedTemplate}
						/>
					))}
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default memo(AddLayoutDialog)
