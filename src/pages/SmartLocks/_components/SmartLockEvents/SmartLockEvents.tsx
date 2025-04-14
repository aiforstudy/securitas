import React, { useMemo, useState } from "react"
import { DateRange } from "react-day-picker"

import { useQuery } from "@tanstack/react-query"
import { createColumnHelper, PaginationState } from "@tanstack/react-table"
import moment from "moment"

import { smartLockEventControllerFindAllOptions } from "@/api-generated/@tanstack/react-query.gen"
import { PaginatedResponseDto, SmartLockEvent } from "@/api-generated/types.gen"
import { AppTable } from "@/components/AppTable"
import { DatePicker } from "@/components/DatePicker"
import { DEFAULT_PAGINATION } from "@/constants/table"

const columnHelper = createColumnHelper<SmartLockEvent>()

const SmartLocks: React.FC = () => {
	const [range, setRange] = useState<DateRange | undefined>(undefined)
	const [pagination, setPagination] = useState<PaginationState>(DEFAULT_PAGINATION)

	const queryOptions = useMemo(() => {
		return {
			query: {
				page: pagination.pageIndex + 1,
				limit: pagination.pageSize,
				from: range?.from ? moment(range.from).startOf("day").toISOString() : undefined,
				to: range?.to ? moment(range.to).endOf("day").toISOString() : undefined,
			},
		}
	}, [range, pagination])

	const { data, isLoading } = useQuery({
		...smartLockEventControllerFindAllOptions({ query: queryOptions.query }),
	})

	const columns = useMemo(
		() => [
			columnHelper.accessor("sn", {
				cell: (info) => <div className="relative">{info.getValue()}</div>,
				header: () => <span>Serial Number</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("lat", {
				cell: (info) => (
					<div className="relative">
						{info.getValue()} - {info.row.original.lng}
					</div>
				),
				header: () => <span>Location</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("temperature", {
				cell: (info) => <div className="relative">{info.getValue()}</div>,
				header: () => <span>Temperature</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("humidity", {
				cell: (info) => <div className="relative">{info.getValue()}</div>,
				header: () => <span>Humidity</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("battery_level", {
				cell: (info) => <div className="relative">{info.getValue()}%</div>,
				header: () => <span>Battery</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("created_at", {
				cell: (info) => <div className="relative">{moment(info.getValue()).format("DD/MM/YYYY HH:mm")}</div>,
				header: () => <span>Created Date</span>,
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("updated_at", {
				cell: (info) => <div className="relative">{moment(info.getValue()).format("DD/MM/YYYY HH:mm")}</div>,
				header: () => <span>Updated Date</span>,
				footer: (info) => info.column.id,
			}),
		],
		[],
	)

	return (
		<div className="w-full h-full pb-5">
			<div className="w-full mt-3 mb-5 flex gap-4 items-center">
				<h3 className="text-xl text-dark-700 font-semibold">List of events</h3>
				<div className="w-[200px]">
					<DatePicker id="range" sizing="lg" mode="range" selected={range} onSelect={setRange} />
				</div>
			</div>

			<AppTable<SmartLockEvent>
				options={{
					data: ((data as unknown as PaginatedResponseDto)?.items as unknown as SmartLockEvent[]) || [],
					state: { pagination },
					columns,
					getRowId: (row) => row.id,
					onPaginationChange: (pagination) => setPagination(pagination),
					manualPagination: true,
				}}
				loading={{ spinning: isLoading }}
				pagination
			/>
		</div>
	)
}

export default SmartLocks
