import React, { useCallback, useMemo, useState } from "react"

import { createColumnHelper, PaginationState } from "@tanstack/react-table"
import { Edit, Plus, Trash2 } from "lucide-react"
import moment from "moment"
import { toast } from "sonner"

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
import useEngineApi from "@/hooks/api/useEngineApi"
import useMonitorApi from "@/hooks/api/useMonitorApi"
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

	const { monitors, createMonitor, updateMonitor, deleteMonitor } = useMonitorApi({
		query: {
			page: pagination.pageIndex + 1,
			limit: pagination.pageSize,
			company_code: selectedCompany?.company_code ?? "",
		},
	})
	const { engines } = useEngineApi({ query: { page: 1, limit: 100 } })

	const handleCameraSubmit = async (values: CreateMonitorDto | UpdateMonitorDto) => {
		if (editCamera) {
			try {
				const response = await updateMonitor.mutateAsync({
					path: { id: editCamera.id },
					body: values as UpdateMonitorDto,
				})
				if (response) {
					toast.success("Camera updated successfully")
					setEditCamera(null)
					queryClient.invalidateQueries({ queryKey: monitors.queryKey })
				}
			} catch (e) {
				const error = e as Error
				toast.error(`Failed to update camera: ${error.message}`)
			}
		} else {
			try {
				const response = await createMonitor.mutateAsync({
					body: values as CreateMonitorDto,
				})
				if (response) {
					toast.success("Camera created successfully")
					setOpenCreateDialog(false)
					queryClient.invalidateQueries({ queryKey: monitors.queryKey })
				}
			} catch (e) {
				const error = e as Error
				toast.error(`Failed to create camera: ${error.message}`)
			}
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

	const handleDeleteCamera = async (camera: Monitor) => {
		try {
			await deleteMonitor.mutateAsync({ path: { id: camera.id } })
			toast.success("Camera deleted successfully")
			setSelectedDelete(null)
			queryClient.invalidateQueries({ queryKey: monitors.queryKey })
		} catch (e) {
			const error = e as Error
			toast.error(`Failed to delete camera: ${error.message}`)
		}
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
			columnHelper.accessor("updated_at", {
				cell: (info) => <div className="relative">{moment(info.getValue()).format("DD/MM/YYYY HH:mm")}</div>,
				header: () => <span>Updated Date</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.display({
				id: "actions",
				cell: (info) => (
					<div className="flex gap-2 relative justify-end text-right">
						<PermissionCheck allowPermission={[PERMISSIONS.MONITOR.UPDATE]}>
							<Button size="icon" onClick={() => handleOpenEditDialog(info.row.original)} variant="outline">
								<Edit className="h-4 w-4" />
							</Button>
						</PermissionCheck>
						<PermissionCheck allowPermission={[PERMISSIONS.MONITOR.DELETE]}>
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
		<div className="p-5 flex flex-col gap-5 h-full">
			<div className="w-full flex gap-4 items-center justify-between">
				<h3 className="text-xl text-dark-700 font-semibold">List of cameras</h3>
				<PermissionCheck allowPermission={[PERMISSIONS.MONITOR.CREATE]}>
					<Button onClick={() => setOpenCreateDialog(true)}>
						<Plus className="h-4 w-4" /> Add Camera
					</Button>
				</PermissionCheck>
			</div>

			<div className="pb-5">
				<AppTable<Monitor>
					options={{
						data: monitors?.data?.data || [],
						state: { pagination },
						columns,
						getRowId: (row) => row.id,
						pageCount: monitors?.data?.total_pages ?? 0,
						manualPagination: true,
						onPaginationChange: setPagination,
					}}
					loading={{ spinning: monitors?.isLoading }}
					pagination
				/>
			</div>

			<CameraDialog
				open={openCreateDialog || !!editCamera}
				engines={engines?.data?.data}
				onSubmit={handleCameraSubmit}
				isLoading={createMonitor.isPending || updateMonitor.isPending}
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
							onClick={() => selectedDelete && handleDeleteCamera(selectedDelete)}
							disabled={deleteMonitor.isPending}
							className="bg-red-500 hover:bg-red-600 h-10"
						>
							{deleteMonitor.isPending ? "Deleting..." : "Delete"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	)
}

export default CamerasPage
