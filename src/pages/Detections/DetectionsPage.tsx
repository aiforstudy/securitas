import React, { useMemo, useState } from "react"
import { DateRange } from "react-day-picker"

import { useMutation, useQuery } from "@tanstack/react-query"
import { createColumnHelper, PaginationState } from "@tanstack/react-table"
import { CheckCheck, Image, Loader2, Play, Trash2, X } from "lucide-react"
import moment from "moment"
import { toast } from "sonner"

import { Approved, Detection } from "@/api-generated"
import {
	detectionControllerBulkApproveDetectionsMutation,
	detectionControllerRemoveMutation,
	detectionControllerSearchDetectionsOptions,
} from "@/api-generated/@tanstack/react-query.gen"
import { AppTable } from "@/components/AppTable"
import { DatePicker } from "@/components/DatePicker"
import ImagePreview from "@/components/ImagePreview"
import PermissionCheck from "@/components/PermissionCheck"
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
import VideoPreview from "@/components/VideoPreview"
import PERMISSIONS from "@/constants/permissions"
import { DEFAULT_PAGINATION } from "@/constants/table"
import queryClient from "@/utils/query"

import ApprovalSelection from "./_component/ApprovalSelection/ApprovalSelection"

const columnHelper = createColumnHelper<Detection>()

const DetectionsPage: React.FC = () => {
	const [range, setRange] = useState<DateRange | undefined>(undefined)
	const [openVideo, setOpenVideo] = useState("")
	const [openImage, setOpenImage] = useState("")
	const [pagination, setPagination] = useState<PaginationState>(DEFAULT_PAGINATION)
	const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})
	const [approveAction, setApproveAction] = useState<Approved | null>(null)
	const [selectedDelete, setSelectedDelete] = useState<Detection | null>(null)
	const [openApproveDialog, setOpenApproveDialog] = useState<boolean>(false)
	const [selectedApproval, setSelectedApproval] = useState<Approved | "all">("all")

	const queryOptions = useMemo(() => {
		return detectionControllerSearchDetectionsOptions({
			query: {
				page: pagination.pageIndex + 1,
				limit: pagination.pageSize,
				from: range?.from ? moment(range.from).startOf("day").toISOString() : undefined,
				to: range?.to ? moment(range.to).endOf("day").toISOString() : undefined,
				approved: selectedApproval === "all" ? undefined : selectedApproval,
			},
		})
	}, [range, pagination, selectedApproval])

	const { data, isLoading } = useQuery({ ...queryOptions, refetchInterval: 10000 })
	const { mutateAsync: deleteDetection, isPending: isDeleting } = useMutation({
		...detectionControllerRemoveMutation(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryOptions.queryKey })
			toast.success("Delete detection successfully")
		},
		onError: () => {
			toast.error("Delete detection failed")
		},
	})
	const { mutateAsync: bulkApproveDetection, isPending: isBulkApproving } = useMutation({
		...detectionControllerBulkApproveDetectionsMutation(),
		onSuccess: async (data) => {
			if (data.length > 0) {
				setApproveAction(null)
				setOpenApproveDialog(false)
				let message = "Detections processed successfully"
				if (approveAction === Approved.YES) {
					message = "Detections approved successfully"
				} else if (approveAction === Approved.NO) {
					message = "Detections rejected successfully"
				}
				toast.success(message)
				queryClient.invalidateQueries({ queryKey: queryOptions.queryKey })
			}
		},
		onError: () => {
			let message = "Failed to process detections"
			if (approveAction === Approved.YES) {
				message = "Failed to approve detections"
			} else if (approveAction === Approved.NO) {
				message = "Failed to reject detections"
			}
			toast.error(message)
		},
	})

	const selectedDetections = useMemo(() => {
		return Object.keys(rowSelection).filter((key) => rowSelection[key])
	}, [rowSelection])

	const handleApproveDetections = async (action: Approved) => {
		await bulkApproveDetection({
			body: { approved: action, detection_ids: selectedDetections },
		})
	}

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
					const videoUrl = info.getValue() ?? ""
					const imageUrl = info.row.original.image_url ?? ""
					return (
						<div className="flex gap-5 max-w-[80px]">
							<Play className="w-5 h-5 cursor-pointer" onClick={() => setOpenVideo(videoUrl)} />
							<Image className="w-5 h-5 cursor-pointer" onClick={() => setOpenImage(imageUrl)} />
						</div>
					)
				},
				header: () => <span>Alert</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("monitor.name", {
				cell: (info) => <div className="relative">{info.getValue()}</div>,
				header: () => <span>Camera Name</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("engineDetail.name", {
				cell: (info) => {
					const engine = info.row.original.engineDetail
					return (
						<div className="relative flex">
							<div>{engine?.name || "N/A"}</div>
						</div>
					)
				},
				header: () => <span>Engine</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("approved", {
				cell: (info) => <div className="flex capitalize">{info.getValue()}</div>,
				header: () => <span>Approved</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("approved_by", {
				cell: (info) => <div className="relative text-left">{info.getValue() || "System"}</div>,
				header: () => <span>Approved By</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("timestamp", {
				cell: (info) => <div className="relative text-left">{moment(info.getValue()).format("DD/MM/YYYY HH:mm")}</div>,
				header: () => <span>Created Date</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("updated_at", {
				cell: (info) => <div className="relative text-left">{moment(info.getValue()).format("DD/MM/YYYY HH:mm")}</div>,
				header: () => <span>Updated Date</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("created_at", {
				cell: (info) => (
					<div className="flex gap-2 relative justify-end text-right">
						<PermissionCheck allowPermission={PERMISSIONS.DETECTION.DELETE}>
							<Button
								size="icon"
								onClick={() => setSelectedDelete(info.row.original)}
								variant="outline"
								disabled={selectedDetections.includes(info.row.original.id)}
							>
								<Trash2 />
							</Button>
						</PermissionCheck>
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
		[selectedDetections],
	)

	return (
		<div className="p-5 h-full space-y-4">
			<div className="w-full flex gap-4 items-center">
				<h3 className="text-xl text-dark-700 font-semibold">List of alerts</h3>
				<div className="w-[200px]">
					<DatePicker id="range" sizing="lg" mode="range" selected={range} onSelect={setRange} />
				</div>
				<div>
					<ApprovalSelection
						selectedApproval={selectedApproval}
						setSelectedApproval={setSelectedApproval}
						loading={isLoading}
					/>
				</div>
				{selectedDetections.length > 0 && (
					<div className="w-[200px]">
						<PermissionCheck allowPermission={PERMISSIONS.DETECTION.EDIT}>
							<Button onClick={() => setOpenApproveDialog(true)}>
								<CheckCheck /> Approve {selectedDetections.length} detection(s)
							</Button>
						</PermissionCheck>
					</div>
				)}
			</div>

			<AppTable<Detection>
				options={{
					data: data?.data || [],
					state: { pagination, rowSelection },
					columns,
					getRowId: (row) => row.id,
					pageCount: data?.total_pages ?? 0,
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

			<AlertDialog open={!!openApproveDialog}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Approve this selection of detections?</AlertDialogTitle>
						<AlertDialogDescription>
							This action will mark the detections as approved. Approved detections are considered valid detections and
							will be included in reports and analytics. Are you sure you want to approve this selection of detections?
						</AlertDialogDescription>
						<Button
							className="absolute top-4 right-4"
							size="icon"
							variant="ghost"
							onClick={() => setOpenApproveDialog(false)}
						>
							<X />
						</Button>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel
							onClick={() => {
								setApproveAction(Approved.NO)
								handleApproveDetections(Approved.NO)
							}}
							disabled={isBulkApproving && approveAction === Approved.NO}
							className="h-10"
						>
							{isBulkApproving && approveAction === Approved.NO ? <Loader2 className="w-4 h-4 animate-spin" /> : "No"}
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => {
								setApproveAction(Approved.YES)
								handleApproveDetections(Approved.YES)
							}}
							disabled={isBulkApproving && approveAction === Approved.YES}
							className=" h-10"
						>
							{isBulkApproving && approveAction === Approved.YES ? <Loader2 className="w-4 h-4 animate-spin" /> : "Yes"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			<AlertDialog open={!!selectedDelete} onOpenChange={() => setSelectedDelete(null)}>
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
							onClick={() => deleteDetection({ path: { id: selectedDelete?.id || "" } })}
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
