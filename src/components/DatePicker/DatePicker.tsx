"use client"

import * as React from "react"
import { vi } from "react-day-picker/locale"
import { useTranslation } from "react-i18next"

import { format } from "date-fns"
import { Calendar1 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar, CalendarProps } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useLang } from "@/contexts/lang.context"
import { cn } from "@/lib/utils"

import { Label } from "../ui/label"

export type DatePickerProps = {
	className?: string
	placeholder?: string
	formatDate?: string // view
	formatDateSave?: string // api
	classNameBtn?: string
	sizing?: "sm" | "lg" | "default"
	error?: boolean
	label?: string
	modal?: boolean
	helperText?: string
	onClosePopover?: (isOpen: boolean) => void
} & CalendarProps

const DatePicker: React.FC<DatePickerProps> = React.memo(
	({
		className,
		placeholder,
		selected,
		formatDate = "dd/MM/yyyy",
		classNameBtn,
		sizing,
		error,
		onClosePopover,
		label,
		modal = false,
		helperText,
		...props
	}) => {
		const [calendarOpen, setCalendarOpen] = React.useState(false)

		const { t } = useTranslation()
		const { currentLang } = useLang()

		const locale = React.useMemo(() => {
			if (currentLang === "vi") return vi
			return undefined
		}, [currentLang])

		const dateView = React.useMemo(() => {
			if (!selected) return <span>{placeholder || t("Select date")}</span>

			if (props.mode === "single" && selected instanceof Date) {
				setCalendarOpen(false)
				return <span>{format(selected, formatDate)}</span>
			}

			if (props.mode === "multiple" && Array.isArray(selected)) {
				// show default 2 dates
				const dateShow = selected
					.slice(0, 2)
					.map((date) => format(date, formatDate))
					.join(", ")

				// more date count => +(1)
				const moreDateCount = selected.slice(2).length

				return (
					<span>
						{dateShow} {moreDateCount > 0 ? `(+${moreDateCount})` : ""}
					</span>
				)
			}

			if (props.mode === "range" && typeof selected === "object" && selected !== null && "from" in selected) {
				return selected?.from ? (
					selected.to ? (
						<span>
							{format(selected.from, formatDate)} - {format(selected.to, formatDate)}
						</span>
					) : (
						<span>{format(selected.from, formatDate)}</span>
					)
				) : (
					<span>{placeholder || t("date.datePlaceholder")}</span>
				)
			}
			return null
		}, [selected, placeholder, props.mode, t, formatDate])

		const getButtonSizeClasses = React.useMemo(() => {
			const buttonSizeClasses = {
				default: "h-12 px-4 py-2",
				sm: "h-10 rounded-xl px-2",
				lg: "h-11 rounded-md px-8",
			}
			return buttonSizeClasses[sizing || "default"]
		}, [sizing])

		return (
			<Popover
				open={calendarOpen}
				onOpenChange={(isOpen) => {
					setCalendarOpen(isOpen)
					onClosePopover?.(isOpen)
				}}
				modal={modal}
			>
				{label && <Label>{label}</Label>}
				<PopoverTrigger asChild>
					<Button
						variant={"outline"}
						className={cn(
							"w-full justify-between text-left font-normal text-sm",
							label && "mt-2",
							!selected && "text-muted-foreground",
							getButtonSizeClasses,
							className,
							{
								"border-error": error,
							},
							classNameBtn,
						)}
					>
						{dateView}
						<Calendar1 className="ml-2 h-4 w-4 text-gray-2" />
					</Button>
				</PopoverTrigger>
				<div
					className={cn({
						"min-h-6": typeof error === "boolean",
					})}
				>
					<div className="h-auto">
						<p
							className={cn("text-xs text-muted-foreground pl-3 transition-opacity duration-300", {
								"text-error": error,
								"opacity-0": !helperText,
								"opacity-100": helperText,
							})}
						>
							{helperText}
						</p>
					</div>
				</div>
				<PopoverContent align="start" sideOffset={8} className="w-auto p-0 border-none  shadow-dropdown !rounded-2xl ">
					<Calendar locale={locale} selected={selected as any} {...props} />
				</PopoverContent>
			</Popover>
		)
	},
)

export default DatePicker
