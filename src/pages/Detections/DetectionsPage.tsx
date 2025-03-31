import React, { useMemo, useState } from "react"
import { DateRange } from "react-day-picker"

import { useMutation, useQuery } from "@tanstack/react-query"
import { createColumnHelper, PaginationState } from "@tanstack/react-table"
import { Loader2, Trash2 } from "lucide-react"
import moment from "moment"
import { toast } from "sonner"

import { Detection } from "@/api-generated"
import {
	detectionControllerRemoveMutation,
	detectionControllerSearchDetectionsOptions,
	detectionControllerSearchDetectionsQueryKey,
} from "@/api-generated/@tanstack/react-query.gen"
import { AppTable } from "@/components/AppTable"
import { DatePicker } from "@/components/DatePicker"
import ImagePresent from "@/components/ImagePresent"
import ImagePreview from "@/components/ImagePreview"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import VideoPresent from "@/components/VideoPresent"
import VideoPreview from "@/components/VideoPreview"
import { DEFAULT_PAGINATION } from "@/constants/table"
import queryClient from "@/utils/query"

const columnHelper = createColumnHelper<Detection>()

const DetectionsPage: React.FC = () => {
	const [range, setRange] = useState<DateRange | undefined>(undefined)
	const [openVideo, setOpenVideo] = useState("")
	const [openImage, setOpenImage] = useState("")
	const [pagination, setPagination] = useState<PaginationState>(DEFAULT_PAGINATION)
	const [rowSelection, setRowSelection] = useState({})
	const [selectedDetection, setSelectedDetection] = useState<Detection | null>(null)

	const { data, isLoading } = useQuery({
		...detectionControllerSearchDetectionsOptions({
			query: {
				page: pagination.pageIndex + 1,
				limit: pagination.pageSize,
				from: range?.from ? moment(range.from).startOf("day").toISOString() : undefined,
				to: range?.to ? moment(range.to).endOf("day").toISOString() : undefined,
			},
		}),
		refetchInterval: 10000,
	})
	const { mutateAsync: deleteDetection, isPending: isDeleting } = useMutation({
		...detectionControllerRemoveMutation(),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: detectionControllerSearchDetectionsQueryKey({
					query: {
						page: pagination.pageIndex + 1,
						limit: pagination.pageSize,
						from: range?.from ? moment(range.from).toISOString() : undefined,
						to: range?.to ? moment(range.to).toISOString() : undefined,
					},
				}),
			})
			toast.success("Delete detection successfully")
		},
		onError: () => {
			toast.error("Delete detection failed")
		},
	})

	const columns = useMemo(
		() => [
			columnHelper.accessor("id", {
				meta: { disableFlexCheckbox: true },
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
					const imageUrl = info.row.original.image_url || ""
					if (videoUrl) {
						return <VideoPresent src={videoUrl} width={100} onClickPlay={() => setOpenVideo(videoUrl)} />
					}
					return <ImagePresent src={imageUrl} width={100} onClickPlay={() => setOpenImage(imageUrl)} />
				},
				header: () => <span>Alert</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("monitor.name", {
				cell: (info) => <div className="relative text-left">{info.getValue()}</div>,
				header: () => <span>Camera Name</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("engineDetail.name", {
				cell: (info) => {
					const engine = info.row.original.engineDetail
					return (
						<div className="relative flex">
							<div className="ml-2">{engine?.name || "N/A"}</div>
						</div>
					)
				},
				header: () => <span>Engine</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("approved", {
				cell: (info) => (
					<div className="flex capitalize">
						{info.getValue()}
						{/* <StatusSelection
							loading={isUpdating}
							selectedStatus={info.getValue()}
							setSelectedStatus={(status) => updateDetection({ body: { status }, path: { id: info.row.original.id } })}
						/> */}
					</div>
				),
				header: () => <span>Approved</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("approved_by", {
				cell: (info) => <div className="relative text-left">{info.getValue()}</div>,
				header: () => <span>Approved By</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("timestamp", {
				cell: (info) => <div className="relative text-left">{moment(info.getValue()).format("DD/MM/YYYY HH:mm")}</div>,
				header: () => <span>Created Date</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("created_at", {
				cell: (info) => (
					<div className="relative text-right">
						<Button size="icon" onClick={() => setSelectedDetection(info.row.original)} variant="outline">
							<Trash2 />
						</Button>
					</div>
				),
				header: () => (
					<div className="relative text-right">
						<span>Action</span>
					</div>
				),
				footer: (info) => info.column.id,
			}),
		],
		[],
	)

	return (
		<div className="p-5 h-full space-y-4">
			<div className="w-full flex gap-4 items-center">
				<h3 className="text-xl text-dark-700 font-semibold">List of alerts</h3>
				<div className="w-[200px]">
					<DatePicker id="range" mode="range" selected={range} onSelect={setRange} />
				</div>
			</div>

			<AppTable<Detection>
				options={{
					data: data?.data || [],
					state: { pagination, rowSelection },
					columns,
					pageCount: data?.total_pages || 0,
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

			<AlertDialog open={!!selectedDetection} onOpenChange={() => setSelectedDetection(null)}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete your account and remove your data from our
							servers.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel className="h-10">Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => deleteDetection({ path: { id: selectedDetection?.id || "" } })}
							disabled={isDeleting}
							className="bg-red-500 hover:bg-red-600 h-10"
						>
							{isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	)
}

export default DetectionsPage
