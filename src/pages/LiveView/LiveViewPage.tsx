import React, { memo, useEffect, useRef, useState } from "react"

import { useQuery } from "@tanstack/react-query"
import { EllipsisVertical, Maximize, Minimize } from "lucide-react"

import { monitorControllerFindAllOptions } from "@/api-generated/@tanstack/react-query.gen"
import { Button } from "@/components/ui/button"
import { DEFAULT_STREAM } from "@/constants/stream"
import { cn } from "@/lib/utils"
import LiveViewApi from "@/pages/LiveView/mocks/liveView"
import { ILiveViewGridCol, ILiveViewTemplate } from "@/types/liveView"
import { getGridItemClasses } from "@/utils/grid"

import AddCameraDialog from "./_components/AddCameraDialog"
import AddLayoutDialog from "./_components/AddLayoutDialog"
import SelectLayout from "./_components/SelectLayout"
import StreamingCamera from "./_components/StreamingCamera"

const LiveViewPage: React.FC = () => {
	const { data } = useQuery({
		queryFn: () => LiveViewApi.getLiveViewTemplates(),
		queryKey: ["live-view-templates"],
	})
	const { data: layouts, isLoading: isLoadingLayouts } = useQuery({
		queryFn: () => LiveViewApi.getLiveViewLayouts(),
		queryKey: ["live-view-layouts"],
	})

	const { data: cameras } = useQuery({ ...monitorControllerFindAllOptions({ query: { page: 1, limit: 10 } }) })
	console.log("🚀 ~ LiveViewPage.tsx:25 ~ cameras:", cameras)
	const containerRef = useRef<HTMLDivElement>(null)
	const [layout, setLayout] = useState("")
	const [isFullscreen, setIsFullscreen] = useState(false)
	const [openAddNewCamera, setOpenAddNewCamera] = useState(false)
	const [openAddNewLayout, setOpenAddNewLayout] = useState(false)
	const [selectedTemplate, setSelectedTemplate] = useState<ILiveViewTemplate | null>(null)

	const { data: detailLayout } = useQuery({
		queryFn: () => LiveViewApi.getLiveViewDetailLayout(layout),
		queryKey: ["live-view-detail-layout"],
		enabled: !!layout,
	})

	useEffect(() => {
		if (layouts?.length && !layout) {
			setLayout(layouts[0].id)
			const template = data?.find((item) => item.id === layouts[0].configuration_id)
			setSelectedTemplate(template || null)
		}
	}, [layouts, layout, data])

	const handleFullscreen = () => {
		if (isFullscreen) {
			setIsFullscreen(false)
			document.exitFullscreen()
		} else {
			setIsFullscreen(true)
			containerRef.current?.requestFullscreen()
		}
	}

	const getCameraStreamInfo = (col: ILiveViewGridCol) => {
		const camera = detailLayout?.layout?.positions?.find((e) => e?.grid_settings?.col === col?.col && e?.has_monitor)
		if (camera) {
			return {
				snapshot: camera?.monitor?.snapshot,
				streamID: camera?.monitor?.id,
				streamName: camera?.monitor?.name,
				url: camera?.monitor?.connection_uri,
				isLocal: camera?.monitor?.is_local,
			}
		}
		return DEFAULT_STREAM
	}

	return (
		<div ref={containerRef} className="p-5 w-full h-full space-y-4">
			{isFullscreen && (
				<div className="flex items-center justify-end">
					<Button variant="outline" size="icon" onClick={handleFullscreen}>
						<Minimize className="size-5 text-dark-700" />
					</Button>
				</div>
			)}
			{!isFullscreen && (
				<div className="flex items-center justify-between">
					<SelectLayout
						layouts={layouts || []}
						selected={layout}
						isLoading={isLoadingLayouts}
						onSelect={(layoutId) => (layoutId === "add-new-layout" ? setOpenAddNewLayout(true) : setLayout(layoutId))}
					/>

					<h3 className="text-xl text-dark-700 font-semibold">Live View</h3>

					<div className="flex items-center gap-4">
						<Button variant="outline" size="icon">
							<EllipsisVertical className="size-5 text-dark-700" />
						</Button>
						<Button onClick={handleFullscreen} variant="outline" size="icon">
							<Maximize className="size-5 text-dark-700" />
						</Button>
					</div>
				</div>
			)}

			{selectedTemplate && (
				<div
					style={{ gridTemplateColumns: `repeat(${selectedTemplate?.total_columns}, 1fr)` }}
					className={cn(
						"grid border-r-2 border-b-2 w-full h-[calc(100%-36px-20px)] auto-rows-fr",
						isFullscreen && "h-[calc(100%-36px-20px)]",
					)}
				>
					{selectedTemplate?.cols?.map((col) => {
						return (
							<div key={col.col} className={`bg-gray-50 ${getGridItemClasses(col)} border-l-2 border-t-2`}>
								<StreamingCamera
									onAddCamera={() => setOpenAddNewCamera(true)}
									streamingInfo={getCameraStreamInfo(col) as typeof DEFAULT_STREAM}
								/>
							</div>
						)
					})}
				</div>
			)}

			<AddCameraDialog open={openAddNewCamera} cameras={cameras?.data || []} onOpenChange={setOpenAddNewCamera} />
			<AddLayoutDialog open={openAddNewLayout} templates={data || []} onOpenChange={setOpenAddNewLayout} />
		</div>
	)
}

export default memo(LiveViewPage)
