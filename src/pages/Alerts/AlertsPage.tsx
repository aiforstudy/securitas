import React, { useMemo, useState } from "react"

import { useQuery } from "@tanstack/react-query"
import { createColumnHelper, PaginationState } from "@tanstack/react-table"

import { detectionControllerFindAllOptions } from "@/api-generated/@tanstack/react-query.gen"
import { AppTable } from "@/components/AppTable"
import ImagePresent from "@/components/ImagePresent"
import ImagePreview from "@/components/ImagePreview"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import VideoPresent from "@/components/VideoPresent"
import VideoPreview from "@/components/VideoPreview"
import { DEFAULT_PAGINATION } from "@/constants/table"
import { IAlert } from "@/types/alert"

const columnHelper = createColumnHelper<IAlert>()

const AlertsPage: React.FC = () => {
	const [openVideo, setOpenVideo] = useState<string>("")
	const [openImage, setOpenImage] = useState<string>("")
	const [pagination, setPagination] = useState<PaginationState>(DEFAULT_PAGINATION)
	const [rowSelection, setRowSelection] = useState({})

	const { data, isLoading } = useQuery({
		...detectionControllerFindAllOptions({
			query: {
				page: pagination.pageIndex + 1,
				limit: pagination.pageSize,
			},
		}),
	})

	console.log("🚀 ~ AlertsPage ~ data:", data)

	const columns = useMemo(
		() => [
			columnHelper.accessor("id", {
				meta: {
					disableFlexCheckbox: true,
				},
				cell: ({ row }) => (
					<div className="flex items-center justify-start">
						<Checkbox id={row.id} checked={row.getIsSelected()} onCheckedChange={row.getToggleSelectedHandler()} />
					</div>
				),
				header: ({ table }) => (
					<Checkbox
						checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
						onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
						aria-label="Select all"
					/>
				),
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("video_url", {
				cell: (info) => {
					const videoUrl = info.getValue()
					const imageUrl = info.row.original.image_url
					if (videoUrl) {
						return <VideoPresent src={videoUrl} width={100} onClickPlay={() => setOpenVideo(videoUrl)} />
					}
					return <ImagePresent src={imageUrl} width={100} onClickPlay={() => setOpenImage(imageUrl)} />
				},
				header: () => <span>Alert</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("company.name", {
				cell: (info) => <div className="relative text-left">{info.getValue()}</div>,
				header: () => <span>Company Name</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("camera.name", {
				cell: (info) => <div className="relative text-left">{info.getValue()}</div>,
				header: () => <span>Camera Name</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("engine", {
				cell: (info) => <div className="relative text-left">{info.getValue()}</div>,
				header: () => <span>Engine</span>,
				footer: (info) => info.column.id,
			}),

			columnHelper.accessor("status", {
				cell: (info) => <div className="relative text-left">{info.getValue()}</div>,
				header: () => <span>Status</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("approved_by", {
				cell: (info) => <div className="relative text-left">{info.getValue()}</div>,
				header: () => <span>Approved By</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("created_at", {
				cell: (info) => <div className="relative text-left">{info.getValue()}</div>,
				header: () => <span>Created Date</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("seq_no", {
				cell: () => <div className="relative text-left">Action</div>,
				header: () => <span>Action</span>,
				footer: (info) => info.column.id,
			}),
		],
		[],
	)

	return (
		<div className="p-5 h-full space-y-4">
			<div className="flex items-center justify-between">
				<h3 className="text-xl text-dark-700 font-semibold">List of alerts</h3>
			</div>

			<AppTable<IAlert>
				options={{
					data: data?.data || [],
					state: { pagination, rowSelection },
					columns,
					pageCount: Math.ceil((data?.count || 0) / pagination.pageSize),
					manualPagination: true,
					onPaginationChange: (pagination) => {
						setPagination(pagination)
						setRowSelection({})
					},
					enableRowSelection: true,
					onRowSelectionChange: setRowSelection,
				}}
				loading={{ spinning: isLoading }}
				className="h-[calc(100%-44px-69px-16px)]"
				pagination
			/>

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
		</div>
	)
}

export default AlertsPage
