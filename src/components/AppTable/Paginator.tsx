import { useTranslation } from "react-i18next"

import { Table } from "@tanstack/react-table"
import { ArrowLeft, ArrowRight } from "lucide-react"

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
} from "@/components/ui/pagination"
import { ROWS_PER_PAGE_OPTIONS } from "@/constants/table"
import { cn } from "@/lib/utils"

import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

type PaginatorProps<T> = {
	className?: string
	currentPage: number
	totalPages: number
	onPageChange: (pageNumber: number) => void
	showPreviousNext: boolean
	table: Table<T>
	disabled?: boolean
}

const PAGINATION_BUTTONS = {
	NUMBER_OF_LEFT: 2,
	NUMBER_OF_RIGHT: 2,
}
const generatePaginationLinks = (currentPage: number, totalPages: number, onPageChange: (page: number) => void) => {
	const pages: React.ReactNode[] = []
	if (totalPages <= 6) {
		for (let i = 1; i <= totalPages; i++) {
			pages.push(
				<PaginationItem key={i}>
					<PaginationLink onClick={() => onPageChange(i)} isActive={i === currentPage}>
						{i}
					</PaginationLink>
				</PaginationItem>,
			)
		}
	} else {
		// * Show default visible page buttons
		for (let i = 1; i <= PAGINATION_BUTTONS.NUMBER_OF_LEFT; i++) {
			pages.push(
				<PaginationItem key={i}>
					<PaginationLink onClick={() => onPageChange(i)} isActive={i === currentPage}>
						{i}
					</PaginationLink>
				</PaginationItem>,
			)
		}
		if (2 < currentPage && currentPage < totalPages - 1) {
			pages.push(<PaginationEllipsis key="ellipsis-prev" />)
			pages.push(
				<PaginationItem key={currentPage}>
					<PaginationLink onClick={() => onPageChange(currentPage)} isActive={true}>
						{currentPage}
					</PaginationLink>
				</PaginationItem>,
			)

			if (currentPage < totalPages - PAGINATION_BUTTONS.NUMBER_OF_RIGHT) {
				pages.push(
					<PaginationItem key={currentPage + 1}>
						<PaginationLink onClick={() => onPageChange(currentPage + 1)} isActive={false}>
							{currentPage + 1}
						</PaginationLink>
					</PaginationItem>,
				)
			}
		}
		pages.push(<PaginationEllipsis key="ellipsis-next" />)
		for (let i = totalPages - 1; i <= totalPages; i++) {
			pages.push(
				<PaginationItem key={i}>
					<PaginationLink onClick={() => onPageChange(i)} isActive={i === currentPage}>
						{i}
					</PaginationLink>
				</PaginationItem>,
			)
		}
	}
	return pages
}

export default function Paginator<T>({
	className,
	currentPage,
	totalPages,
	onPageChange,
	showPreviousNext,
	table,
	disabled,
}: PaginatorProps<T>) {
	const { t } = useTranslation()

	return (
		<div className={cn("p-4 flex flex-row justify-between border-t", className)}>
			{/* left section */}
			<div className="w-full flex flex-row items-center gap-2">
				{/* label */}
				<p>{t("common.resultPerPage")}</p>

				{/* dropdown */}
				<Select
					defaultValue={table.getState().pagination.pageSize.toString()}
					onValueChange={(value: string) => {
						table.setPageSize(Number(value))
					}}
				>
					<SelectTrigger disabled={disabled} className="w-20 text-sm" size="sm">
						<SelectValue placeholder="Page Size" />
					</SelectTrigger>
					<SelectContent>
						{ROWS_PER_PAGE_OPTIONS.map((pageSize) => (
							<SelectItem key={pageSize} value={pageSize.toString()}>
								{pageSize}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<Pagination className="w-full items-center justify-end">
				{showPreviousNext && totalPages ? (
					<Button
						size="sm"
						variant="ghost"
						onClick={() => onPageChange(currentPage - 1)}
						disabled={currentPage - 1 < 1}
						className="text-sm text-gray-6"
					>
						<ArrowLeft className="transition-transform group-data-[state=open]/collapsible:rotate-180" />
						{t("button.previous")}
					</Button>
				) : null}

				{/* number */}
				<PaginationContent className="gap-2">
					{generatePaginationLinks(currentPage, totalPages, onPageChange)}
				</PaginationContent>

				{showPreviousNext && totalPages ? (
					<Button
						size="sm"
						variant="ghost"
						onClick={() => onPageChange(currentPage + 1)}
						disabled={currentPage > totalPages - 1}
						className="text-sm text-gray-6"
					>
						{t("button.next")}
						<ArrowRight className="transition-transform group-data-[state=open]/collapsible:rotate-180" />
					</Button>
				) : null}
			</Pagination>
		</div>
	)
}
