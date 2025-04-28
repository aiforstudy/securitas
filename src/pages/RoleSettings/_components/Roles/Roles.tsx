import React, { useCallback, useMemo, useState } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { Plus } from "lucide-react"
import { toast } from "sonner"

// import { toast } from "sonner"

import { CreateRoleDto, Role, UpdateRoleDto } from "@/api-generated/types.gen"
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
import { IPermissions } from "@/contexts/auth.context"
import useRoleApi from "@/hooks/api/useRoleApi"
import { useGlobalStore } from "@/stores/global"
import queryClient from "@/utils/query"

import PermissionBar from "./_components/PermissionBar"
import RoleDialog from "./_components/RoleDialog"
import RoleHeader from "./_components/RoleHeader"

type IRolePermission = {
	name: string
	actions: string[]
	resource: string
}

const columnHelper = createColumnHelper<IRolePermission>()

const Roles: React.FC = () => {
	const { selectedCompany } = useGlobalStore()
	const [editRole, setEditRole] = useState<Role | null>(null)
	const [cloneRole, setCloneRole] = useState<Role | null>(null)
	const [selectedDelete, setSelectedDelete] = useState<Role | null>(null)
	const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false)
	const { roles, permissions, createRole, updateRole, deleteRole } = useRoleApi({})

	const handleRoleSubmit = async (values: CreateRoleDto | UpdateRoleDto) => {
		if (editRole) {
			try {
				const response = await updateRole.mutateAsync({
					path: { id: editRole.id },
					body: values as UpdateRoleDto,
				})
				if (response) {
					toast.success("Camera updated successfully")
					handleCloseDialog()
					queryClient.invalidateQueries({ queryKey: roles.queryKey })
				}
			} catch (e) {
				const error = e as Error
				toast.error(`Failed to update camera: ${error.message}`)
			}
		} else {
			try {
				const response = await createRole.mutateAsync({
					body: values as CreateRoleDto,
				})
				if (response) {
					toast.success("Role created successfully")
					handleCloseDialog()
					queryClient.invalidateQueries({ queryKey: roles.queryKey })
				}
			} catch (e) {
				const error = e as Error
				toast.error(`Failed to create role: ${error.message}`)
			}
		}
	}

	const handleOpenEditDialog = useCallback(
		(role: Role) => {
			setEditRole(role)
		},
		[setEditRole],
	)

	const handleOpenCloneDialog = useCallback(
		(role: Role) => {
			setCloneRole(role)
		},
		[setCloneRole],
	)

	const handleCloseDialog = () => {
		setOpenCreateDialog(false)
		setEditRole(null)
		setCloneRole(null)
	}

	const handleDeleteRole = async (role: Role) => {
		try {
			await deleteRole.mutateAsync({ path: { id: role.id } })
			toast.success("Role deleted successfully")
			queryClient.invalidateQueries({ queryKey: roles.queryKey })
		} catch (e) {
			const error = e as Error
			toast.error(`Failed to delete role: ${error.message}`)
		}
	}

	const columns = useMemo(() => {
		const result = [
			columnHelper.accessor("name", {
				cell: (info) => <div className="relative">{info.getValue()}</div>,
				header: () => <div className="relative">Permission</div>,
			}),
		]
		if (roles.data) {
			roles.data.forEach((role) => {
				result.push(
					columnHelper.accessor("resource", {
						cell: (info) => (
							<div className="relative">
								<PermissionBar
									actions={
										(role.permissions as unknown as IPermissions[]).find((_) => _.resource === info.getValue())
											?.actions || []
									}
								/>
							</div>
						),
						header: () => (
							<div className="relative">
								<RoleHeader
									data={role}
									isDefault={false}
									onCloneRole={() => handleOpenCloneDialog(role)}
									onDeleteRole={() => setSelectedDelete(role)}
									onSelectRole={() => handleOpenEditDialog(role)}
								/>
							</div>
						),
					}),
				)
			})
		}

		return result
	}, [roles.data, handleOpenEditDialog, handleOpenCloneDialog])

	return (
		<div className="w-full h-full pb-5">
			<div className="w-full mt-3 mb-5 flex gap-4 items-center justify-between">
				<h3 className="text-xl text-dark-700 font-semibold">List of roles</h3>
				<PermissionCheck allowPermission={[PERMISSIONS.ROLE.CREATE]}>
					<Button onClick={() => setOpenCreateDialog(true)}>
						<Plus className="h-4 w-4" /> Add Role
					</Button>
				</PermissionCheck>
			</div>

			<AppTable<IRolePermission>
				options={{
					data: (permissions?.data as IRolePermission[]) || [],
					columns,
					getRowId: (row) => row.name,
				}}
				loading={{ spinning: roles.isLoading }}
				pagination={false}
			/>

			<RoleDialog
				open={openCreateDialog || !!editRole || !!cloneRole}
				onSubmit={handleRoleSubmit}
				editRole={editRole as (Omit<Role, "permissions"> & { permissions: IPermissions[] }) | null}
				cloneRole={cloneRole as (Omit<Role, "permissions"> & { permissions: IPermissions[] }) | null}
				isLoading={createRole.isPending || updateRole.isPending}
				permissions={permissions?.data as IPermissions[]}
				companyCode={selectedCompany?.company_code ?? ""}
				onOpenChange={handleCloseDialog}
			/>

			<AlertDialog open={!!selectedDelete} onOpenChange={() => setSelectedDelete(null)}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete the user and remove it from our servers.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel className="h-10">Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => selectedDelete && handleDeleteRole(selectedDelete)}
							disabled={deleteRole.isPending}
							className="bg-red-500 hover:bg-red-600 h-10"
						>
							{deleteRole.isPending ? "Deleting..." : "Delete"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	)
}

export default Roles
