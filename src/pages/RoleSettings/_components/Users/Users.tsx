import React, { useCallback, useMemo, useState } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { Edit, Plus, Trash2 } from "lucide-react"
import moment from "moment"
import { toast } from "sonner"

import { CreateUserDto, UpdateUserDto, UserResponseDto } from "@/api-generated/types.gen"
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
import useRoleApi from "@/hooks/api/useRoleApi"
import useUserApi from "@/hooks/api/useUserApi"
import { useGlobalStore } from "@/stores/global"
import queryClient from "@/utils/query"

import UserDialog from "./_components/UserDialog"

const columnHelper = createColumnHelper<UserResponseDto>()

const Users: React.FC = () => {
	const { selectedCompany } = useGlobalStore()
	const [editUser, setEditUser] = useState<UserResponseDto | null>(null)
	const [selectedDelete, setSelectedDelete] = useState<UserResponseDto | null>(null)
	const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false)

	const { roles } = useRoleApi()
	const { users, createUser, updateUser, deleteUser } = useUserApi()

	const handleUserSubmit = async (values: CreateUserDto | UpdateUserDto) => {
		if (editUser) {
			try {
				const response = await updateUser.mutateAsync({
					path: { id: editUser.id },
					body: values as UpdateUserDto,
				})
				if (response) {
					toast.success("User updated successfully")
					setEditUser(null)
					queryClient.invalidateQueries({ queryKey: users.queryKey })
				}
			} catch (e) {
				const error = e as Error
				toast.error(`Failed to update user: ${error.message}`)
			}
		} else {
			try {
				const response = await createUser.mutateAsync({
					body: values as CreateUserDto,
				})
				if (response) {
					toast.success("User created successfully")
					setOpenCreateDialog(false)
					queryClient.invalidateQueries({ queryKey: users.queryKey })
				}
			} catch (e) {
				const error = e as Error
				toast.error(`Failed to create user: ${error.message}`)
			}
		}
	}

	const handleOpenEditDialog = useCallback(
		(user: UserResponseDto) => {
			setEditUser(user)
		},
		[setEditUser],
	)

	const handleCloseDialog = () => {
		setOpenCreateDialog(false)
		setEditUser(null)
	}

	const handleDeleteUser = async (user: UserResponseDto) => {
		try {
			await deleteUser.mutateAsync({ path: { id: user.id } })
			toast.success("User deleted successfully")
			queryClient.invalidateQueries({ queryKey: users.queryKey })
		} catch (e) {
			const error = e as Error
			toast.error(`Failed to delete user: ${error.message}`)
		}
	}

	const columns = useMemo(
		() => [
			columnHelper.accessor("name", {
				cell: (info) => <div className="relative">{info.getValue()}</div>,
				header: () => <span>Name</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("email", {
				cell: (info) => <div className="relative">{info.getValue()}</div>,
				header: () => <span>Email</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("role", {
				cell: (info) => <div className="relative capitalize">{info.getValue()}</div>,
				header: () => <span>Role</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("created_at", {
				cell: (info) => <div className="relative">{moment(info.getValue()).format("DD/MM/YYYY")}</div>,
				header: () => <span>Created At</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("updated_at", {
				cell: (info) => <div className="relative">{moment(info.getValue()).format("DD/MM/YYYY")}</div>,
				header: () => <span>Updated At</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.display({
				id: "actions",
				cell: (info) => (
					<div className="flex gap-2 relative justify-end text-right">
						<PermissionCheck allowPermission={[PERMISSIONS.USER.UPDATE]}>
							<Button size="icon" onClick={() => handleOpenEditDialog(info.row.original)} variant="outline">
								<Edit className="h-4 w-4" />
							</Button>
						</PermissionCheck>
						<PermissionCheck allowPermission={[PERMISSIONS.USER.DELETE]}>
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
				<h3 className="text-xl text-dark-700 font-semibold">List of users</h3>
				<PermissionCheck allowPermission={[PERMISSIONS.USER.CREATE]}>
					<Button onClick={() => setOpenCreateDialog(true)}>
						<Plus className="h-4 w-4" /> Add User
					</Button>
				</PermissionCheck>
			</div>

			<AppTable<UserResponseDto>
				options={{
					data: users.data ?? [],
					columns,
					getRowId: (row) => row.id,
				}}
				loading={{ spinning: users.isLoading }}
				pagination={false}
			/>

			<UserDialog
				open={openCreateDialog || !!editUser}
				roles={roles.data ?? []}
				editUser={editUser}
				onSubmit={handleUserSubmit}
				isLoading={createUser.isPending || updateUser.isPending}
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
							onClick={() => selectedDelete && handleDeleteUser(selectedDelete)}
							disabled={deleteUser.isPending}
							className="bg-red-500 hover:bg-red-600 h-10"
						>
							{deleteUser.isPending ? "Deleting..." : "Delete"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	)
}

export default Users
