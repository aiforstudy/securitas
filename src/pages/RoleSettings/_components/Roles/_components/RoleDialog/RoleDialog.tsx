import React from "react"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import * as z from "zod"

import { CreateRoleDto, Role, UpdateRoleDto } from "@/api-generated/types.gen"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { IPermissions } from "@/contexts/auth.context"

import PermissionBar from "../PermissionBar"

const roleFormSchema = z.object({
	id: z.string().min(1, "Id is required"),
	name: z.string().min(1, "Name is required"),
	permissions: z
		.array(
			z.object({
				actions: z.array(z.string()),
				resource: z.string(),
			}),
		)
		.min(1, "Permissions are required"),
})

type RoleFormValues = z.infer<typeof roleFormSchema>

const defaultValues: Partial<RoleFormValues> = {
	id: "",
	name: "",
	permissions: [],
}

type RoleDialogProps = {
	open: boolean
	editRole: (Omit<Role, "permissions"> & { permissions: IPermissions[] }) | null
	onSubmit: (values: CreateRoleDto | UpdateRoleDto) => Promise<void>
	cloneRole: (Omit<Role, "permissions"> & { permissions: IPermissions[] }) | null
	isLoading: boolean
	companyCode: string
	permissions: IPermissions[]
	onOpenChange: (open: boolean) => void
}

const RoleDialog: React.FC<RoleDialogProps> = ({
	open,
	onSubmit,
	editRole,
	cloneRole,
	isLoading,
	companyCode,
	permissions,
	onOpenChange,
}) => {
	const form = useForm<RoleFormValues>({
		resolver: zodResolver(roleFormSchema),
		defaultValues,
		...(editRole
			? {
					values: {
						id: editRole.id,
						name: editRole.name,
						permissions: editRole.permissions,
					},
				}
			: {
					values: {
						id: cloneRole?.id ?? "",
						name: cloneRole?.name ?? "",
						permissions: cloneRole?.permissions ?? [],
					},
				}),
	})

	const handleSubmit = async (values: RoleFormValues) => {
		if (!companyCode) {
			return
		}

		try {
			if (editRole) {
				await onSubmit({
					id: values.id,
					name: values.name,
					permissions: values.permissions,
				} as unknown as UpdateRoleDto)
			} else {
				const newRole = {
					id: values.id,
					name: values.name,
					permissions: values.permissions,
				} as unknown as CreateRoleDto

				await onSubmit(newRole)
			}
		} catch (e) {
			const error = e as Error
			toast.error(`Error in role operation: ${error.message}`)
		}
	}

	const handleClose = () => {
		form.reset(defaultValues)
		onOpenChange(false)
	}

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="pt-12">
				<DialogHeader>
					<DialogTitle>{editRole ? "Edit Role" : "Add New Role"}</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)} className="mt-5 space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Name<span className="text-red-500">*</span>
									</FormLabel>
									<FormControl>
										<Input placeholder="User name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="id"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Id<span className="text-red-500">*</span>
									</FormLabel>
									<FormControl>
										<Input placeholder="Role id" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="permissions"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Permissions</FormLabel>
									<div className="mt-4 grid grid-cols-2 gap-8">
										{permissions.map((permission) => (
											<div key={permission.resource} className="flex gap-4 items-center justify-between">
												<div className="font-medium capitalize">{permission.resource}</div>
												<PermissionBar
													actions={field.value.find((p) => p.resource === permission.resource)?.actions ?? []}
													onChange={(actions) => {
														const updatedPermissions = field.value.map((p) =>
															p.resource === permission.resource ? { ...p, actions } : p,
														)
														field.onChange(updatedPermissions)
													}}
												/>
											</div>
										))}
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button type="submit" disabled={isLoading}>
								{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
								{editRole ? "Update" : "Create"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

export default RoleDialog
