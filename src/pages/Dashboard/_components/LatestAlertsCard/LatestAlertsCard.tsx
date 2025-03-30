import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

import { createColumnHelper } from "@tanstack/react-table"
import { Image, Play } from "lucide-react"
import moment from "moment"

import { Detection } from "@/api-generated/types.gen"
import { AppTable } from "@/components/AppTable"
import ImagePreview from "@/components/ImagePreview"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DialogContent } from "@/components/ui/dialog"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import VideoPreview from "@/components/VideoPreview"
import { PATH } from "@/constants/path"

const columnHelper = createColumnHelper<Detection>()

const LatestAlertsCard: React.FC<{ data: Detection[]; isLoading: boolean }> = ({ data, isLoading }) => {
	const navigate = useNavigate()
	const [openVideo, setOpenVideo] = useState("")
	const [openImage, setOpenImage] = useState("")

	const columns = useMemo(
		() => [
			columnHelper.accessor("engineDetail.name", {
				cell: (info) => <div className="w-[50px] whitespace-normal">{info.getValue()}</div>,
				header: () => <span>Engine</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("monitor.name", {
				cell: (info) => <div className="w-[50px] whitespace-normal">{info.getValue()}</div>,
				header: () => <span>Camera</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("created_at", {
				cell: (info) => (
					<div className="w-[50px] whitespace-normal">{moment(info.getValue()).format("DD/MM/YYYY HH:mm")}</div>
				),
				header: () => <span>Date</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("video_url", {
				cell: (info) => (
					<div className="max-w-[25px]">
						<Play className="w-4 h-4 cursor-pointer" onClick={() => setOpenVideo(info.getValue() as string)} />
					</div>
				),
				header: () => <span></span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("image_url", {
				cell: (info) => (
					<div className="max-w-[25px]">
						<Image className="w-4 h-4 cursor-pointer" onClick={() => setOpenImage(info.getValue() as string)} />
					</div>
				),
				header: () => <span></span>,
				footer: (info) => info.column.id,
			}),
		],
		[],
	)

	return (
		<Card className="flex gap-3 py-3 flex-col">
			<CardHeader className="p-3 pr-4 items-center pb-0 flex justify-between">
				<CardTitle>Latest Alerts</CardTitle>
				<CardDescription>
					<div
						onClick={() => navigate(PATH.OPERATIONS.DETECTIONS)}
						className="text-primary font-normal text-sm ml-4 cursor-pointer underline"
					>
						View all
					</div>
				</CardDescription>
			</CardHeader>
			<ScrollArea className="h-full">
				<CardContent className="p-3 pr-4 w-[400px] max-h-[300px]">
					<AppTable<Detection> options={{ data, columns }} loading={{ spinning: isLoading }} pagination={false} />

					<Dialog open={!!openVideo} onOpenChange={() => setOpenVideo("")}>
						<DialogContent className="pt-12 !max-w-[800px]">
							<DialogHeader>
								<DialogTitle>Video Preview</DialogTitle>
							</DialogHeader>
							<div className="mt-5">
								<VideoPreview url={openVideo} />
							</div>
						</DialogContent>
					</Dialog>

					<Dialog open={!!openImage} onOpenChange={() => setOpenImage("")}>
						<DialogContent className="pt-12 !max-w-[800px]">
							<DialogHeader>
								<DialogTitle>Image Preview</DialogTitle>
							</DialogHeader>
							<div className="mt-5">
								<ImagePreview url={openImage} />
							</div>
						</DialogContent>
					</Dialog>
				</CardContent>
				<ScrollBar orientation="vertical" />
			</ScrollArea>
		</Card>
	)
}

export default LatestAlertsCard
