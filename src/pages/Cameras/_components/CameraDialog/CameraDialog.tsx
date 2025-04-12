import React from "react"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import * as z from "zod"

import { CreateMonitorDto, Engine, Monitor, UpdateMonitorDto } from "@/api-generated/types.gen"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { MultiSelect } from "@/components/ui/multiple-select"

const notOnlySpaces = (value?: string) => !/^\s*$/.test(value ?? "")
const validRTSPLink = (rtspLink?: string) => /^rtsp:\/\/([^:]+):([^@]+)@([^:]+)(:\d+)?\/(.+)$/.test(rtspLink ?? "")

const cameraFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	hls_uri: z.string().optional(),
	connection_uri: z
		.string()
		.min(1, "Connection URI is required")
		.refine(notOnlySpaces, "Connection URI cannot be only spaces")
		.refine(validRTSPLink, "Invalid RTSP link"),
	engines_require_approval: z.array(z.string()).default([]),
})

type CameraFormValues = z.infer<typeof cameraFormSchema>

const defaultValues: Partial<CameraFormValues> = {
	name: "",
	connection_uri: "",
	engines_require_approval: [],
}

type CameraDialogProps = {
	open: boolean
	engines?: Engine[]
	onSubmit: (values: CreateMonitorDto | UpdateMonitorDto) => Promise<void>
	isLoading: boolean
	editCamera: Monitor | null
	companyCode: string
	onOpenChange: (open: boolean) => void
}

const CameraDialog: React.FC<CameraDialogProps> = ({
	open,
	engines = [],
	onSubmit,
	isLoading,
	editCamera,
	companyCode,
	onOpenChange,
}) => {
	const form = useForm<CameraFormValues>({
		resolver: zodResolver(cameraFormSchema),
		defaultValues,
		...(editCamera
			? {
					values: {
						name: editCamera.name,
						connection_uri: editCamera.connection_uri,
						engines_require_approval: editCamera.engines_require_approval
							? JSON.parse(editCamera.engines_require_approval)
							: [],
					},
				}
			: {}),
	})

	const handleSubmit = async (values: CameraFormValues) => {
		if (!companyCode) {
			return
		}

		try {
			if (editCamera) {
				await onSubmit({
					name: values.name,
					connection_uri: values.connection_uri,
					engines_require_approval: JSON.stringify(values.engines_require_approval),
				} as UpdateMonitorDto)
			} else {
				const newCamera: CreateMonitorDto = {
					name: values.name,
					company_code: companyCode,
					connection_uri: values.connection_uri,
					engines_require_approval: JSON.stringify(values.engines_require_approval),
				}

				await onSubmit(newCamera)
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
					<DialogTitle>{editCamera ? "Edit Camera" : "Add New Camera"}</DialogTitle>
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
										<Input placeholder="Camera name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="connection_uri"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Connection URI<span className="text-red-500">*</span>
									</FormLabel>
									<FormControl>
										<Input placeholder="Camera connection URI" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="hls_uri"
							render={({ field }) => (
								<FormItem>
									<FormLabel>HLS URI</FormLabel>
									<FormControl>
										<Input placeholder="Camera HLS URI" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="engines_require_approval"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Engines Requiring Approval</FormLabel>
									<FormControl>
										<MultiSelect
											options={engines.map((engine) => ({ label: engine.name, value: engine.id }))}
											variant="inverted"
											placeholder="Select engines"
											defaultValue={field.value}
											onValueChange={field.onChange}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type="submit" disabled={isLoading}>
								{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
								{editCamera ? "Update" : "Create"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

export default CameraDialog
