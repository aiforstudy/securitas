import { memo, useState } from "react"

import { Monitor } from "@/api-generated/types.gen"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

type IAddCameraDialogProps = {
	open: boolean
	cameras: Monitor[]
	onOpenChange: (open: boolean) => void
}

const AddCameraDialog: React.FC<IAddCameraDialogProps> = ({ open, cameras, onOpenChange }) => {
	const [selectedCamera, setSelectedCamera] = useState<Monitor | null>(null)

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="pt-12 !max-w-[800px]">
				<DialogHeader>
					<DialogTitle>Add new camera</DialogTitle>
				</DialogHeader>

				<ScrollArea>
					<div className="mt-5 grid grid-cols-3 gap-4 min-h-[300px]">
						{cameras.map((item) => (
							<div
								key={item.id}
								onClick={() => setSelectedCamera(item)}
								className={cn("rounded-md p-4", selectedCamera?.id === item.id && "bg-gray-50")}
							>
								<div className="flex items-center gap-2">
									<img src={item.snapshot} alt={item.name} className="w-10 h-10 rounded-md" />
									<h3 className="text-sm font-medium">{item.name}</h3>
								</div>
							</div>
						))}
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</DialogContent>
		</Dialog>
	)
}

export default memo(AddCameraDialog)
