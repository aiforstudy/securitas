import React, { useCallback, useMemo, useState } from "react"

import { useMutation, useQuery } from "@tanstack/react-query"
import { createColumnHelper, PaginationState } from "@tanstack/react-table"
import { Edit, Plus, Trash2 } from "lucide-react"
import moment from "moment"
import { toast } from "sonner"

import {
	smartLockControllerCreateMutation,
	smartLockControllerFindAllQueryKey,
	smartLockControllerRemoveMutation,
	smartLockControllerSearchAndPaginateOptions,
	smartLockControllerUpdateMutation,
} from "@/api-generated/@tanstack/react-query.gen"
import { CreateSmartLockDto, SmartLock } from "@/api-generated/types.gen"
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

import SmartLockDialog from "../SmartLockDialog"

const columnHelper = createColumnHelper<SmartLock>()

const SmartLocks: React.FC = () => {
	const { selectedCompany } = useGlobalStore()
	const [pagination, setPagination] = useState<PaginationState>(DEFAULT_PAGINATION)
	const [editSmartLock, setEditSmartLock] = useState<SmartLock | null>(null)
	const [selectedDelete, setSelectedDelete] = useState<SmartLock | null>(null)
	const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false)

	const queryOptions = useMemo(() => {
		return {
			query: {
				company_code: selectedCompany?.company_code ?? "",
			},
		}
	}, [selectedCompany?.company_code])

	const { data, isLoading } = useQuery({
		...smartLockControllerSearchAndPaginateOptions({ query: queryOptions.query }),
		enabled: !!selectedCompany?.company_code,
	})

	const { mutateAsync: createSmartLock, isPending: isCreating } = useMutation({
		...smartLockControllerCreateMutation(),
		onSuccess: () => {
			toast.success("Smart lock created successfully")
			setOpenCreateDialog(false)
			queryClient.invalidateQueries({
				queryKey: smartLockControllerFindAllQueryKey({ query: queryOptions.query }),
			})
		},
		onError: () => {
			toast.error("Failed to create smart lock")
		},
	})

	const { mutateAsync: updateSmartLock, isPending: isUpdating } = useMutation({
		...smartLockControllerUpdateMutation(),
		onSuccess: () => {
			toast.success("Smart lock updated successfully")
			setEditSmartLock(null)
			queryClient.invalidateQueries({
				queryKey: smartLockControllerFindAllQueryKey({ query: queryOptions.query }),
			})
		},
		onError: () => {
			toast.error("Failed to update smart lock")
		},
	})

	const { mutateAsync: deleteSmartLock, isPending: isDeleting } = useMutation({
		...smartLockControllerRemoveMutation(),
		onSuccess: () => {
			toast.success("Smart lock deleted successfully")
			setSelectedDelete(null)
			queryClient.invalidateQueries({ queryKey: smartLockControllerFindAllQueryKey({ query: queryOptions.query }) })
		},
		onError: () => {
			toast.error("Failed to delete smart lock")
		},
	})

	const handleSmartLockSubmit = async (values: CreateSmartLockDto) => {
		if (editSmartLock) {
			await updateSmartLock({
				path: { id: editSmartLock.id },
				body: values as unknown as never,
			})
		} else {
			await createSmartLock({ body: values })
		}
	}

	const handleOpenEditDialog = useCallback(
		(smartLock: SmartLock) => {
			setEditSmartLock(smartLock)
		},
		[setEditSmartLock],
	)

	const handleCloseDialog = () => {
		setOpenCreateDialog(false)
		setEditSmartLock(null)
	}

	const columns = useMemo(
		() => [
			columnHelper.accessor("name", {
				cell: (info) => <div className="relative">{info.getValue()}</div>,
				header: () => <span>Name</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("sn", {
				cell: (info) => <div className="relative">{info.getValue()}</div>,
				header: () => <span>Serial Number</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("status", {
				cell: (info) => {
					const statusValue = info.getValue()
					let statusClass = "text-red-600" // Default for UNAVAILABLE

					if (statusValue === "connected") {
						statusClass = "text-green-600"
					} else if (statusValue === "disconnected") {
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
						<PermissionCheck allowPermission={PERMISSIONS.SMART_LOCKS.EDIT}>
							<Button size="icon" onClick={() => handleOpenEditDialog(info.row.original)} variant="outline">
								<Edit className="h-4 w-4" />
							</Button>
						</PermissionCheck>
						<PermissionCheck allowPermission={PERMISSIONS.SMART_LOCKS.DELETE}>
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
		<div className="w-full h-full pb-5">
			<div className="w-full mt-3 mb-5 flex gap-4 items-center justify-between">
				<h3 className="text-xl text-dark-700 font-semibold">List of smart locks</h3>
				<PermissionCheck allowPermission={PERMISSIONS.SMART_LOCKS.CREATE}>
					<Button onClick={() => setOpenCreateDialog(true)}>
						<Plus className="h-4 w-4" /> Add Smart Lock
					</Button>
				</PermissionCheck>
			</div>

			<AppTable<SmartLock>
				options={{
					data: (data?.items as unknown as SmartLock[]) || [],
					state: { pagination },
					columns,
					getRowId: (row) => row.id,
					pageCount: data?.totalPages ?? 0,
					manualPagination: true,
					onPaginationChange: (pagination) => {
						setPagination(pagination)
					},
				}}
				loading={{ spinning: isLoading }}
				pagination
			/>

			<SmartLockDialog
				open={openCreateDialog || !!editSmartLock}
				onSubmit={handleSmartLockSubmit}
				isLoading={isCreating || isUpdating}
				companyCode={selectedCompany?.company_code ?? ""}
				onOpenChange={handleCloseDialog}
				editSmartLock={editSmartLock}
			/>

			<AlertDialog open={!!selectedDelete} onOpenChange={() => setSelectedDelete(null)}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete the smart lock and remove it from our servers.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel className="h-10">Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => selectedDelete && deleteSmartLock({ path: { id: selectedDelete.id } })}
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

export default SmartLocks
