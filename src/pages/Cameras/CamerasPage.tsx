import React, { useCallback, useMemo, useState } from "react"

import { useMutation, useQuery } from "@tanstack/react-query"
import { createColumnHelper, PaginationState } from "@tanstack/react-table"
import { Edit, Plus, Trash2 } from "lucide-react"
import moment from "moment"
import { toast } from "sonner"

import {
	engineControllerFindAllOptions,
	monitorControllerCreateMutation,
	monitorControllerFindAllOptions,
	monitorControllerFindAllQueryKey,
	monitorControllerRemoveMutation,
	monitorControllerUpdateMutation,
} from "@/api-generated/@tanstack/react-query.gen"
import { CreateMonitorDto, Monitor, MonitorStatus, UpdateMonitorDto } from "@/api-generated/types.gen"
import { AppTable } from "@/components/AppTable"
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
import PERMISSIONS from "@/constants/permissions"
import { DEFAULT_PAGINATION } from "@/constants/table"
import { useGlobalStore } from "@/stores/global"
import queryClient from "@/utils/query"

import CameraDialog from "./_components/CameraDialog"

const columnHelper = createColumnHelper<Monitor>()

const CamerasPage: React.FC = () => {
	const { selectedCompany } = useGlobalStore()
	const [editCamera, setEditCamera] = useState<Monitor | null>(null)
	const [pagination, setPagination] = useState<PaginationState>(DEFAULT_PAGINATION)
	const [selectedDelete, setSelectedDelete] = useState<Monitor | null>(null)
	const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false)

	const queryOptions = useMemo(() => {
		return {
			query: {
				page: pagination.pageIndex + 1,
				limit: pagination.pageSize,
				company_code: selectedCompany?.company_code ?? "",
			},
		}
	}, [pagination, selectedCompany?.company_code])

	const { data, isLoading } = useQuery({
		...monitorControllerFindAllOptions({ query: queryOptions.query }),
		enabled: !!selectedCompany?.company_code,
	})

	const { data: engines } = useQuery({
		...engineControllerFindAllOptions({ query: { page: 1, limit: 100 } }),
	})

	const { mutateAsync: createCamera, isPending: isCreating } = useMutation({
		...monitorControllerCreateMutation(),
		onSuccess: () => {
			toast.success("Camera created successfully")
			setOpenCreateDialog(false)
			queryClient.invalidateQueries({
				queryKey: monitorControllerFindAllQueryKey({ query: queryOptions.query }),
			})
		},
		onError: () => {
			toast.error("Failed to create camera")
		},
	})

	const { mutateAsync: updateCamera, isPending: isUpdating } = useMutation({
		...monitorControllerUpdateMutation(),
		onSuccess: () => {
			toast.success("Camera updated successfully")
			setEditCamera(null)
			queryClient.invalidateQueries({
				queryKey: monitorControllerFindAllQueryKey({ query: queryOptions.query }),
			})
		},
		onError: () => {
			toast.error("Failed to update camera")
		},
	})

	const { mutateAsync: deleteCamera, isPending: isDeleting } = useMutation({
		...monitorControllerRemoveMutation(),
		onSuccess: () => {
			toast.success("Camera deleted successfully")
			setSelectedDelete(null)
			queryClient.invalidateQueries({ queryKey: monitorControllerFindAllQueryKey({ query: queryOptions.query }) })
		},
		onError: () => {
			toast.error("Failed to delete camera")
		},
	})

	const handleCameraSubmit = async (values: CreateMonitorDto | UpdateMonitorDto) => {
		if (editCamera) {
			await updateCamera({
				path: { id: editCamera.id },
				body: values as UpdateMonitorDto,
			})
		} else {
			await createCamera({
				body: values as CreateMonitorDto,
			})
		}
	}

	const handleOpenEditDialog = useCallback(
		(camera: Monitor) => {
			setEditCamera(camera)
		},
		[setEditCamera],
	)

	const handleCloseDialog = () => {
		setOpenCreateDialog(false)
		setEditCamera(null)
	}

	const columns = useMemo(
		() => [
			columnHelper.accessor("name", {
				cell: (info) => <div className="relative">{info.getValue()}</div>,
				header: () => <span>Name</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("connection_uri", {
				cell: (info) => <div className="relative ">{info.getValue()}</div>,
				header: () => <span>Connection URI</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("status", {
				cell: (info) => {
					const statusValue = info.getValue()
					let statusClass = "text-red-600" // Default for UNAVAILABLE

					if (statusValue === MonitorStatus.CONNECTED) {
						statusClass = "text-green-600"
					} else if (statusValue === MonitorStatus.DISCONNECTED) {
						statusClass = "text-orange-600"
					}

					return <div className={`relative capitalize ${statusClass}`}>{statusValue.toLowerCase()}</div>
				},
				header: () => <span>Status</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("created_at", {
				cell: (info) => <div className="relative">{moment(info.getValue()).format("DD/MM/YYYY HH:mm")}</div>,
				header: () => <span>Created Date</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.display({
				id: "actions",
				cell: (info) => (
					<div className="flex gap-2 relative justify-end text-right">
						<PermissionCheck allowPermission={PERMISSIONS.MONITOR.EDIT}>
							<Button size="icon" onClick={() => handleOpenEditDialog(info.row.original)} variant="outline">
								<Edit className="h-4 w-4" />
							</Button>
						</PermissionCheck>
						<PermissionCheck allowPermission={PERMISSIONS.MONITOR.DELETE}>
							<Button size="icon" onClick={() => setSelectedDelete(info.row.original)} variant="outline">
								<Trash2 className="h-4 w-4" />
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
		[handleOpenEditDialog],
	)

	return (
		<div className="p-5 h-full space-y-4">
			<div className="w-full flex gap-4 items-center justify-between">
				<h3 className="text-xl text-dark-700 font-semibold">List of cameras</h3>
				<PermissionCheck allowPermission={PERMISSIONS.MONITOR.CREATE}>
					<Button onClick={() => setOpenCreateDialog(true)}>
						<Plus className="h-4 w-4" /> Add Camera
					</Button>
				</PermissionCheck>
			</div>

			<AppTable<Monitor>
				options={{
					data: data?.data || [],
					state: { pagination },
					columns,
					getRowId: (row) => row.id,
					pageCount: data?.total_pages ?? 0,
					manualPagination: true,
					onPaginationChange: setPagination,
				}}
				loading={{ spinning: isLoading }}
				className="h-[calc(100%-44px-69px-16px)]"
				pagination
			/>

			<CameraDialog
				open={openCreateDialog || !!editCamera}
				engines={engines?.data}
				onSubmit={handleCameraSubmit}
				isLoading={isCreating || isUpdating}
				editCamera={editCamera}
				companyCode={selectedCompany?.company_code ?? ""}
				onOpenChange={handleCloseDialog}
			/>

			<AlertDialog open={!!selectedDelete} onOpenChange={() => setSelectedDelete(null)}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete the camera and remove it from our servers.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel className="h-10">Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => selectedDelete && deleteCamera({ path: { id: selectedDelete.id } })}
							disabled={isDeleting}
							className="bg-red-500 hover:bg-red-600 h-10"
						>
							{isDeleting ? "Deleting..." : "Delete"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	)
}

export default CamerasPage
