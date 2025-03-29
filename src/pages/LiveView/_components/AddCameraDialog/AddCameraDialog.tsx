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
					<div className="mt-5 grid grid-cols-4 gap-4 min-h-[300px]">
						{cameras.map((item) => (
							<div key={item.id} onClick={() => setSelectedCamera(item)} className="text-center cursor-pointer">
								<div
									className={cn(
										"p-2 grid grid-cols-1 h-[150px] items-center justify-center",
										selectedCamera?.id === item.id && "border-2 border-primary rounded-md",
									)}
								>
									<div className="grid w-full h-full auto-rows-fr">
										<img
											src={
												item.snapshot ||
												"https://upload-file-service-viact-ai.s3.ap-southeast-1.amazonaws.com/7b2f8a25-5fbb-4ef0-9fb1-aa56f628ac5e-images2267-62270f110e752.jpeg"
											}
											className="w-full h-full"
										/>
									</div>
								</div>
								<div className={cn("mt-3 text-md font-medium", selectedCamera?.id === item.id && "text-primary")}>
									{item.name}
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
