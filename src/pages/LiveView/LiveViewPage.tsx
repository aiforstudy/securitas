import React, { memo, useEffect, useRef, useState } from "react"

import { useMutation, useQuery } from "@tanstack/react-query"
import { EllipsisVertical, Loader2, Maximize, Minimize } from "lucide-react"

import {
	monitorControllerFindAllOptions,
	monitorControllerFindAllQueryKey,
	monitorControllerStartStreamMutation,
} from "@/api-generated/@tanstack/react-query.gen"
import { Button } from "@/components/ui/button"
import { DEFAULT_STREAM } from "@/constants/stream"
import { cn } from "@/lib/utils"
import LiveViewApi from "@/pages/LiveView/mocks/liveView"
import { useGlobalStore } from "@/stores/global"
import { ILiveViewDetailLayout, ILiveViewGridCol, ILiveViewTemplate, IStreamingCamera } from "@/types/liveView"
import { getGridItemClasses } from "@/utils/grid"
import queryClient from "@/utils/query"

import AddCameraDialog from "./_components/AddCameraDialog"
import AddLayoutDialog from "./_components/AddLayoutDialog"
import LayoutSelection from "./_components/LayoutSelection"
import StreamingCamera from "./_components/StreamingCamera"

const LiveViewPage: React.FC = () => {
	const { selectedCompany } = useGlobalStore()
	const { data } = useQuery({
		queryFn: () => LiveViewApi.getLiveViewTemplates(),
		queryKey: ["live-view-templates"],
	})
	const { data: layouts, isLoading: isLoadingLayouts } = useQuery({
		queryFn: () => LiveViewApi.getLiveViewLayouts(),
		queryKey: ["live-view-layouts"],
	})
	const { data: monitors } = useQuery({
		...monitorControllerFindAllOptions({
			query: { page: 1, limit: 1000, company_code: selectedCompany?.company_code },
		}),
		enabled: !!selectedCompany?.company_code,
	})
	const containerRef = useRef<HTMLDivElement>(null)
	const [layout, setLayout] = useState("")
	const [isFullscreen, setIsFullscreen] = useState(false)
	const [detailLayout, setDetailLayout] = useState<ILiveViewDetailLayout | null>(null)
	const [openAddNewCamera, setOpenAddNewCamera] = useState(false)
	const [openAddNewLayout, setOpenAddNewLayout] = useState(false)
	const [selectedTemplate, setSelectedTemplate] = useState<ILiveViewTemplate | null>(null)
	const { mutateAsync: startStream } = useMutation({
		...monitorControllerStartStreamMutation(),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: monitorControllerFindAllQueryKey({
					query: { page: 1, limit: 1000, company_code: selectedCompany?.company_code },
				}),
			})
		},
	})

	useEffect(() => {
		if (monitors?.data?.length) {
			LiveViewApi.getLiveViewLayoutById(layout).then((res) => {
				setDetailLayout({
					...res,
					layout: {
						...res.layout,
						positions: res.layout.positions.map((e, index) => {
							const monitor = monitors?.data[index]
							return {
								...e,
								monitor: {
									id: monitor?.id,
									name: monitor?.name,
									hls_uri: monitor?.hls_uri,
									snapshot: monitor?.snapshot,
									company_code: monitor?.company_code,
									connection_uri: monitor?.connection_uri,
								},
								has_monitor: !!monitor,
							}
						}),
					},
				})
			})
		}
	}, [layout, monitors])

	useEffect(() => {
		if (layouts?.length && !layout) {
			setLayout(layouts[0].id)
			const template = data?.find((item) => item.id === layouts[0].configuration_id)
			setSelectedTemplate(template || null)
		}
	}, [layouts, layout, data])

	useEffect(() => {
		if (detailLayout) {
			const cameraIds = detailLayout.layout.positions
				.map((e) => e.has_monitor && e.monitor?.id)
				.filter(Boolean) as string[]
			startStream({ body: { monitor_ids: cameraIds } })
		}
	}, [detailLayout, startStream])

	const handleFullscreen = () => {
		if (isFullscreen) {
			setIsFullscreen(false)
			document.exitFullscreen()
		} else {
			setIsFullscreen(true)
			containerRef.current?.requestFullscreen()
		}
	}

	const getCameraStreamInfo = (col: ILiveViewGridCol): IStreamingCamera => {
		const camera = detailLayout?.layout?.positions?.find((e) => e?.grid_settings?.col === col?.col && e?.has_monitor)
		if (camera) {
			return {
				url: camera?.monitor?.connection_uri,
				hls_uri: camera?.monitor?.hls_uri,
				snapshot: camera?.monitor?.snapshot,
				cameraId: camera?.monitor?.id,
				cameraName: camera?.monitor?.name,
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
					<div className="flex flex-1">
						<LayoutSelection
							layouts={layouts || []}
							selected={layout}
							isLoading={isLoadingLayouts}
							onSelect={(layoutId) => (layoutId === "add-new-layout" ? setOpenAddNewLayout(true) : setLayout(layoutId))}
						/>
					</div>

					<h3 className="text-xl text-dark-700 font-semibold">Live View</h3>

					<div className="flex flex-1 items-center gap-4 justify-end">
						<Button variant="outline" size="icon">
							<EllipsisVertical className="size-5 text-dark-700" />
						</Button>
						<Button onClick={handleFullscreen} variant="outline" size="icon">
							<Maximize className="size-5 text-dark-700" />
						</Button>
					</div>
				</div>
			)}
			{isLoadingLayouts && (
				<div className="w-full h-full flex items-center justify-center">
					<Loader2 className="size-5 text-dark-700 animate-spin" />
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
									streamingInfo={getCameraStreamInfo(col)}
								/>
							</div>
						)
					})}
				</div>
			)}

			<AddCameraDialog open={openAddNewCamera} cameras={monitors?.data || []} onOpenChange={setOpenAddNewCamera} />
			<AddLayoutDialog open={openAddNewLayout} templates={data || []} onOpenChange={setOpenAddNewLayout} />
		</div>
	)
}

export default memo(LiveViewPage)
