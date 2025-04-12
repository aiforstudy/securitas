import React, { useCallback, useMemo, useState } from "react"

import { useMutation, useQuery } from "@tanstack/react-query"
import { createColumnHelper, PaginationState } from "@tanstack/react-table"
import { Edit, Plus, Trash2 } from "lucide-react"
import moment from "moment"
import { toast } from "sonner"

import {
	companyControllerCreateMutation,
	companyControllerFindAllOptions,
	companyControllerFindAllQueryKey,
	companyControllerRemoveMutation,
	companyControllerUpdateMutation,
} from "@/api-generated/@tanstack/react-query.gen"
import { Company, CreateCompanyDto, UpdateCompanyDto } from "@/api-generated/types.gen"
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
import queryClient from "@/utils/query"

import CompanyDialog from "./_components/CompanyDialog"

const columnHelper = createColumnHelper<Company>()

const CompaniesPage: React.FC = () => {
	const [editCompany, setEditCompany] = useState<Company | null>(null)
	const [pagination, setPagination] = useState<PaginationState>(DEFAULT_PAGINATION)
	const [selectedDelete, setSelectedDelete] = useState<Company | null>(null)
	const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false)

	const queryOptions = useMemo(() => {
		return {
			query: {
				page: pagination.pageIndex + 1,
				limit: pagination.pageSize,
			},
		}
	}, [pagination])

	const { data, isLoading } = useQuery({
		...companyControllerFindAllOptions({ query: queryOptions.query }),
	})

	const { mutateAsync: createCompany, isPending: isCreating } = useMutation({
		...companyControllerCreateMutation(),
		onSuccess: () => {
			toast.success("Company created successfully")
			setOpenCreateDialog(false)
			queryClient.invalidateQueries({
				queryKey: companyControllerFindAllQueryKey({ query: queryOptions.query }),
			})
		},
		onError: () => {
			toast.error("Failed to create company")
		},
	})

	const { mutateAsync: updateCompany, isPending: isUpdating } = useMutation({
		...companyControllerUpdateMutation(),
		onSuccess: () => {
			toast.success("Company updated successfully")
			setEditCompany(null)
			queryClient.invalidateQueries({
				queryKey: companyControllerFindAllQueryKey({ query: queryOptions.query }),
			})
		},
		onError: () => {
			toast.error("Failed to update company")
		},
	})

	const { mutateAsync: deleteCompany, isPending: isDeleting } = useMutation({
		...companyControllerRemoveMutation(),
		onSuccess: () => {
			toast.success("Company deleted successfully")
			setSelectedDelete(null)
			queryClient.invalidateQueries({ queryKey: companyControllerFindAllQueryKey({ query: queryOptions.query }) })
		},
		onError: () => {
			toast.error("Failed to delete company")
		},
	})

	const handleCompanySubmit = async (values: CreateCompanyDto | UpdateCompanyDto) => {
		if (editCompany) {
			await updateCompany({
				path: { code: editCompany.company_code },
				body: values as UpdateCompanyDto,
			})
		} else {
			await createCompany({
				body: values as CreateCompanyDto,
			})
		}
	}

	const handleOpenEditDialog = useCallback(
		(company: Company) => {
			setEditCompany(company)
		},
		[setEditCompany],
	)

	const handleCloseDialog = () => {
		setOpenCreateDialog(false)
		setEditCompany(null)
	}

	const columns = useMemo(
		() => [
			columnHelper.accessor("name", {
				cell: (info) => <div className="relative">{info.getValue()}</div>,
				header: () => <span>Name</span>,
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
						<PermissionCheck allowPermission={PERMISSIONS.COMPANY.EDIT}>
							<Button size="icon" onClick={() => handleOpenEditDialog(info.row.original)} variant="outline">
								<Edit className="h-4 w-4" />
							</Button>
						</PermissionCheck>
						<PermissionCheck allowPermission={PERMISSIONS.COMPANY.DELETE}>
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
				<h3 className="text-xl text-dark-700 font-semibold">List of companies</h3>
				<PermissionCheck allowPermission={PERMISSIONS.COMPANY.CREATE}>
					<Button onClick={() => setOpenCreateDialog(true)}>
						<Plus className="h-4 w-4" /> Add Company
					</Button>
				</PermissionCheck>
			</div>

			<AppTable<Company>
				options={{
					data: data?.data || [],
					state: { pagination },
					columns,
					getRowId: (row) => row.company_code,
					pageCount: data?.total_pages ?? 0,
					manualPagination: true,
					onPaginationChange: setPagination,
				}}
				loading={{ spinning: isLoading }}
				className="h-[calc(100%-44px-69px-16px)]"
				pagination
			/>

			<CompanyDialog
				open={openCreateDialog || !!editCompany}
				onSubmit={handleCompanySubmit}
				isLoading={isCreating || isUpdating}
				editCompany={editCompany}
				onOpenChange={handleCloseDialog}
			/>

			<AlertDialog open={!!selectedDelete} onOpenChange={() => setSelectedDelete(null)}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete the company and remove it from our servers.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel className="h-10">Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => selectedDelete && deleteCompany({ path: { code: selectedDelete.company_code } })}
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

export default CompaniesPage
