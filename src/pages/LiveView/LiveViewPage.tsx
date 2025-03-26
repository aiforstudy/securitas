import React, { useState } from "react"

import { EllipsisVertical, Maximize } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Dialog } from "@/components/ui/dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import VideoPreview from "@/components/VideoPreview"

const layoutOptions = [
	{
		label: "Default",
		value: "default",
	},
	{
		label: "Add new layout",
		value: "add-new-layout",
	},
]

const LiveViewPage: React.FC = () => {
	const [layout, setLayout] = useState("default")
	const [openAddNewLayout, setOpenAddNewLayout] = useState(false)

	return (
		<div className="p-5 w-full h-full space-y-4">
			<div className="flex items-center justify-between">
				<Select
					value={layout}
					onValueChange={(value) => {
						if (value === "add-new-layout") {
							setOpenAddNewLayout(true)
						} else {
							setLayout(value)
						}
					}}
				>
					<SelectTrigger className="w-10 md:w-[140px] h-10 text-sm font-normal px-2 font-bricolage">
						<div className="flex items-center gap-2">
							<p className="hidden md:block">
								<div className="gap-2	flex">
									<div className="text-gray-600">Layout:</div>
									<SelectValue placeholder="Select layout" />
								</div>
							</p>
						</div>
					</SelectTrigger>
					<SelectContent className="!rounded-md">
						<SelectGroup>
							{layoutOptions.map((item) => (
								<SelectItem value={item.value} key={`layout-${item.value}`} className="text-sm">
									{item.label}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
				<Dialog open={openAddNewLayout} onOpenChange={() => setOpenAddNewLayout(false)}>
					<DialogContent className="pt-12 !max-w-[800px]">
						<DialogHeader>
							<DialogTitle>Add new layout</DialogTitle>
						</DialogHeader>
						<div className="mt-5"></div>
					</DialogContent>
				</Dialog>

				<h3 className="text-xl text-dark-700 font-semibold">Live View</h3>

				<div className="flex items-center gap-4">
					<Button variant="outline" size="icon">
						<EllipsisVertical className="size-5 text-dark-700" />
					</Button>
					<Button variant="outline" size="icon">
						<Maximize className="size-5 text-dark-700" />
					</Button>
				</div>
			</div>
		</div>
	)
}

export default LiveViewPage
