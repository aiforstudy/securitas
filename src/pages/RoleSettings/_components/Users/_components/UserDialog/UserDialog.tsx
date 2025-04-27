import React from "react"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import * as z from "zod"

import { CreateUserDto, Role, UpdateUserDto, UserResponseDto } from "@/api-generated/types.gen"
import RoleSelection from "@/components/RoleSelection"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const userFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().email("Invalid email"),
	role: z.string().min(1, "Role is required"),
	password: z.string(),
	company_code: z.string(),
})

type UserFormValues = z.infer<typeof userFormSchema>

const defaultValues: Partial<UserFormValues> = {
	name: "",
	email: "",
	role: "",
	password: "",
	company_code: "",
}

type UserDialogProps = {
	open: boolean
	roles?: Role[]
	editUser: UserResponseDto | null
	onSubmit: (values: CreateUserDto | UpdateUserDto) => Promise<void>
	isLoading: boolean
	companyCode: string
	onOpenChange: (open: boolean) => void
}

const UserDialog: React.FC<UserDialogProps> = ({ open, onSubmit, isLoading, editUser, onOpenChange, companyCode }) => {
	const form = useForm<UserFormValues>({
		resolver: zodResolver(userFormSchema),
		defaultValues,
		...(editUser
			? {
					values: {
						name: editUser.name,
						email: editUser.email,
						role: editUser.role,
						password: "",
						company_code: companyCode,
					},
				}
			: {}),
	})

	const handleSubmit = async (values: UserFormValues) => {
		if (!companyCode) {
			return
		}

		try {
			if (editUser) {
				await onSubmit({
					name: values.name,
					email: values.email,
					role: values.role,
				} as UpdateUserDto)
			} else {
				const newUser: CreateUserDto = {
					role: values.role as CreateUserDto["role"],
					name: values.name,
					email: values.email,
					password: values.password,
					company_code: values.company_code ?? companyCode,
				}

				await onSubmit(newUser)
			}
		} catch (e) {
			const error = e as Error
			toast.error(`Error in user operation: ${error.message}`)
		}
	}

	const handleClose = () => {
		form.reset(defaultValues)
		onOpenChange(false)
	}

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="pt-12 !max-w-[500px]">
				<DialogHeader>
					<DialogTitle>{editUser ? "Edit User" : "Add New User"}</DialogTitle>
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
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Email<span className="text-red-500">*</span>
									</FormLabel>
									<FormControl>
										<Input placeholder="User email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="role"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Role</FormLabel>
									<FormControl>
										<RoleSelection
											className="w-full !h-[44px]"
											selectedRole={field.value}
											onSelectRole={field.onChange}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{!editUser && (
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input placeholder="Password" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
						)}

						<DialogFooter>
							<Button type="submit" disabled={isLoading}>
								{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
								{editUser ? "Update" : "Create"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

export default UserDialog
