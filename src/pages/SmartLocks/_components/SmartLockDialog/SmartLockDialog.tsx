import React from "react"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import * as z from "zod"

import { CreateSmartLockDto, SmartLock } from "@/api-generated/types.gen"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const smartLockFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	sn: z.string().min(1, "SN is required"),
	lat: z.number().min(1, "Latitude is required"),
	lng: z.number().min(1, "Longitude is required"),
})

type SmartLockFormValues = z.infer<typeof smartLockFormSchema>

const defaultValues: Partial<SmartLockFormValues> = {
	name: "",
	sn: "",
	lat: 0,
	lng: 0,
}

type SmartLockDialogProps = {
	open: boolean
	onSubmit: (values: CreateSmartLockDto) => Promise<void>
	isLoading: boolean
	companyCode: string
	onOpenChange: (open: boolean) => void
	editSmartLock: SmartLock | null
}

const SmartLockDialog: React.FC<SmartLockDialogProps> = ({
	open,
	onSubmit,
	isLoading,
	editSmartLock,
	companyCode,
	onOpenChange,
}) => {
	const form = useForm<SmartLockFormValues>({
		resolver: zodResolver(smartLockFormSchema),
		defaultValues,
		...(editSmartLock
			? {
					values: {
						sn: editSmartLock.sn,
						lat: editSmartLock.lat,
						lng: editSmartLock.lng,
						name: editSmartLock.name,
					},
				}
			: {}),
	})

	const handleSubmit = async (values: SmartLockFormValues) => {
		if (!companyCode) {
			return
		}

		try {
			if (editSmartLock) {
				await onSubmit({
					name: values.name,
					company_code: companyCode,
					sn: values.sn,
					lat: values.lat,
					lng: values.lng,
				} as CreateSmartLockDto)
			} else {
				const newSmartLock: CreateSmartLockDto = {
					name: values.name,
					company_code: companyCode,
					sn: values.sn,
					lat: values.lat,
					lng: values.lng,
				}

				await onSubmit(newSmartLock)
			}
		} catch (error) {
			console.error("Error in camera operation:", error)
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
					<DialogTitle>{editSmartLock ? "Edit Smart Lock" : "Add New Smart Lock"}</DialogTitle>
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
										<Input placeholder="Smart Lock name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="sn"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Serial Number<span className="text-red-500">*</span>
									</FormLabel>
									<FormControl>
										<Input placeholder="Smart lock serial number" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button type="submit" disabled={isLoading}>
								{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
								{editSmartLock ? "Update" : "Create"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

export default SmartLockDialog
