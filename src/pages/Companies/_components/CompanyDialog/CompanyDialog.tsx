import React, { useState } from "react"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { ControlPosition, Map, MapControl } from "@vis.gl/react-google-maps"
import { Loader2 } from "lucide-react"
import moment from "moment"
import * as z from "zod"

import { Company, CreateCompanyDto, UpdateCompanyDto } from "@/api-generated/types.gen"
import { DatePicker } from "@/components/DatePicker"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import AutocompletePlaces, { AutocompleteResult } from "../AutocompletePlaces"

const companyFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	company_code: z.string().min(1, "Company code is required"),
	expires_on: z.string().min(1, "Expires on is required"),
	location: z.object({ latitude: z.number(), longitude: z.number() }),
})

type CompanyDialogFormValues = z.infer<typeof companyFormSchema>

const defaultValues: Partial<CompanyDialogFormValues> = {
	name: "",
	expires_on: moment().add(1, "year").toISOString(),
	company_code: "",
}

type CompanyDialogProps = {
	open: boolean
	onSubmit: (values: CreateCompanyDto | UpdateCompanyDto) => Promise<void>
	isLoading: boolean
	editCompany: Company | null
	onOpenChange: (open: boolean) => void
}

const CompanyDialog: React.FC<CompanyDialogProps> = ({ open, onSubmit, isLoading, editCompany, onOpenChange }) => {
	const defaultLocation =
		typeof editCompany?.location === "string" ? JSON.parse(editCompany?.location ?? "[]") : editCompany?.location
	const form = useForm<CompanyDialogFormValues>({
		resolver: zodResolver(companyFormSchema),
		defaultValues,
		...(editCompany
			? {
					values: {
						name: editCompany.name,
						location: { latitude: defaultLocation[0], longitude: defaultLocation[1] },
						expires_on: editCompany.expires_on ?? "",
						company_code: editCompany.company_code ?? "",
					},
				}
			: {}),
	})
	const [selectedPlace, setSelectedPlace] = useState<google.maps.places.Place | null>(null)
	const handleSubmit = async (values: CompanyDialogFormValues) => {
		try {
			if (editCompany) {
				await onSubmit({
					name: values.name,
					location: JSON.stringify([values.location.latitude, values.location.longitude]),
					expires_on: values.expires_on,
					company_code: values.company_code,
				} as UpdateCompanyDto)
			} else {
				const newCompany: CreateCompanyDto = {
					name: values.name,
					location: JSON.stringify([values.location.latitude, values.location.longitude]),
					expires_on: values.expires_on,
					company_code: values.company_code,
				}

				await onSubmit(newCompany)
			}
		} catch (error) {
			console.error("Error in company operation:", error)
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
					<DialogTitle>{editCompany ? "Edit Company" : "Add New Company"}</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit, (err) => console.log(err))} className="mt-5 space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="gap-0">
										Name<span className="text-red-500">*</span>
									</FormLabel>
									<FormControl>
										<Input placeholder="Company name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="company_code"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="gap-0">
										Code<span className="text-red-500">*</span>
									</FormLabel>
									<FormControl>
										<Input placeholder="Company code" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="expires_on"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="gap-0">
										Expires on<span className="text-red-500">*</span>
									</FormLabel>
									<FormControl>
										<DatePicker
											id="dropdown-select"
											mode="single"
											captionLayout="dropdown"
											selected={moment(field.value).toDate()}
											onSelect={(date) => field.onChange(moment(date).toISOString())}
											disabled={(date) => date < new Date()}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="location"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="gap-0">Location</FormLabel>
									<FormControl>
										<div className="h-[300px] w-full">
											<Map
												mapId="DEMO_MAP_ID"
												defaultZoom={1}
												defaultCenter={{
													lat: field.value?.latitude ?? 10.8300923,
													lng: field.value?.longitude ?? 106.6291799,
												}}
												gestureHandling={"greedy"}
												disableDefaultUI
											>
												<MapControl position={ControlPosition.TOP_LEFT}>
													<AutocompletePlaces
														onSelect={(place) => {
															setSelectedPlace(place)
															field.onChange({
																latitude: place?.location?.lat() ?? 0,
																longitude: place?.location?.lng() ?? 0,
															})
														}}
													/>
												</MapControl>

												<AutocompleteResult place={selectedPlace} />
											</Map>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button type="submit" disabled={isLoading}>
								{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
								{editCompany ? "Update" : "Create"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

export default CompanyDialog
