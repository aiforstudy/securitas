import React, { HTMLAttributes, memo } from "react"

import {
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	PartialKeys,
	ColumnMeta as ReactTableColumnMeta,
	Row,
	TableOptions,
	useReactTable,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

import EmptyData from "../EmptyData"
import ErrorMessage from "../ErrorMessage"
import LoadingIndicator from "../LoadingIndicator"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import Paginator from "./Paginator"

// Extend the ColumnMeta type to include our custom properties
type CustomColumnMeta<T> = ReactTableColumnMeta<T, unknown> & {
	align?: "left" | "right" | "center"
	classNameCell?: string
	disableFlexCheckbox?: boolean
	onClick?: React.MouseEventHandler
}

type IAppTableProps<T> = {
	className?: string
	options: PartialKeys<TableOptions<T>, "getCoreRowModel">
	pagination?: boolean
	sorting?: boolean
	loading?: {
		spinning?: boolean
		indicator?: React.ReactNode
	}
	classNameTHead?: HTMLAttributes<HTMLElement>["className"]
	classNameColumn?: HTMLAttributes<HTMLElement>["className"]
	error?: Error
	onRowClick?: (row: T) => void
	tableClassName?: string
	renderSubComponent?: (props: { row: Row<T> }) => React.ReactElement
}
type Alignment = "left" | "right" | "center"
const alignments = (align?: Alignment) => {
	switch (align) {
		case "right":
			return "text-right"
		case "center":
			return "text-center"
		case "left":
			return "text-left"
		default:
			return ""
	}
}

function AppTable<T>({
	className,
	options,
	pagination = true,
	sorting = true,
	loading,
	error,
	classNameTHead,
	onRowClick,
	tableClassName,
	renderSubComponent,
}: IAppTableProps<T>) {
	const table = useReactTable({
		...options,
		defaultColumn: { size: undefined },
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
		...(sorting && { manualSorting: false, getSortedRowModel: getSortedRowModel() }),
	})

	const columns = table.getAllColumns()

	return (
		<div className={cn("rounded-lg border", className)}>
			<ScrollArea className="w-full h-full">
				<Table className={cn("pb-6", columns.length === 0 ? "border-separate" : "border-collapse", tableClassName)}>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header, index) => {
									return (
										<TableHead
											key={header.id}
											style={header.column.columnDef.size ? { width: `${header.column.columnDef.size}px` } : {}}
											className={cn(
												"bg-gray-100 text-label p-4",
												index === 0 && "rounded-tl-base",
												index === headerGroup.headers.length - 1 && "rounded-tr-base",
												classNameTHead,
											)}
										>
											{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{/* Loading state  */}
						{loading?.spinning ? (
							<TableRow>
								{table.getHeaderGroups().map((headerGroup) => (
									<TableCell key={headerGroup.id} colSpan={headerGroup.headers.length} className="px-3 py-2">
										{loading?.indicator || <LoadingIndicator />}
									</TableCell>
								))}
							</TableRow>
						) : (
							<>
								{/* Error state */}
								{error ? (
									<TableRow>
										{table.getHeaderGroups().map((headerGroup) => (
											<TableCell key={headerGroup.id} colSpan={headerGroup.headers.length} className="px-3 py-2">
												<ErrorMessage error={error} />
											</TableCell>
										))}
									</TableRow>
								) : (
									<>
										{/* Data state */}
										{table.getRowModel().rows?.length ? (
											table.getRowModel().rows.map((row) => {
												return (
													<React.Fragment key={row.id}>
														<TableRow
															key={row.id}
															data-state={row.getIsSelected() && "selected"}
															{...(onRowClick ? { onClick: () => onRowClick(row.original) } : {})}
															className={cn(" hover:bg-gray-100", {
																"cursor-pointer": onRowClick,
															})}
														>
															{row.getVisibleCells().map((cell) => {
																const meta = cell.column.columnDef.meta as CustomColumnMeta<T> | undefined
																return (
																	<TableCell
																		key={cell.id}
																		style={
																			cell.column.columnDef.size ? { width: `${cell.column.columnDef.size}px` } : {}
																		}
																		className={cn(
																			"font-normal p-4",
																			alignments(meta?.align),
																			meta?.classNameCell ?? "",
																		)}
																		disableFlexCheckbox={meta?.disableFlexCheckbox}
																		{...(meta?.onClick && {
																			onClick: meta.onClick,
																		})}
																	>
																		{flexRender(cell.column.columnDef.cell, cell.getContext())}
																	</TableCell>
																)
															})}
														</TableRow>

														{row.getIsExpanded() && (
															<TableRow key={row.id + "_children"}>
																<TableCell colSpan={row.getVisibleCells().length} className="py-0">
																	{renderSubComponent?.({ row })}
																</TableCell>
															</TableRow>
														)}
													</React.Fragment>
												)
											})
										) : (
											<TableRow>
												{table.getHeaderGroups().map((headerGroup) => (
													<TableCell key={headerGroup.id} colSpan={headerGroup.headers.length} className="px-3 py-2">
														<EmptyData />
													</TableCell>
												))}
											</TableRow>
										)}
									</>
								)}
							</>
						)}
					</TableBody>
				</Table>

				<ScrollBar orientation="vertical" />
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
			{pagination && table.getRowModel().rows?.length > 0 && (
				<Paginator<T>
					currentPage={table.getState().pagination.pageIndex + 1}
					totalPages={table.getPageCount()}
					onPageChange={(pageNumber) => table.setPageIndex(pageNumber - 1)}
					showPreviousNext
					table={table}
					disabled={!!loading?.spinning}
				/>
			)}
		</div>
	)
}

export default memo(AppTable) as typeof AppTable
