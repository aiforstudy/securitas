import React, { memo, useEffect, useRef, useState } from "react"

import moment from "moment"
import { toast } from "sonner"

import { DetectionControllerGetStatisticsData } from "@/api-generated/types.gen"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useGetDetections, useGetDetectionsStatistics } from "@/hooks/api/useDetectionApi"
import { useGlobalStore } from "@/stores/global"

import AlertsChartCard from "../AlertsChartCard"
import LatestAlertsCard from "../LatestAlertsCard"
import OverviewChartCard from "../OverviewChartCard"

const GroupCardsLeft: React.FC = () => {
	const previousDataCountRef = useRef<number>(0)
	const { selectedCompany } = useGlobalStore()
	const [filters] = useState<DetectionControllerGetStatisticsData["query"]>({
		from: moment().subtract(7, "day").startOf("day").toISOString(),
		to: moment().endOf("day").toISOString(),
		group_by: "day",
		timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		company_code: selectedCompany?.company_code ?? "",
	})
	const detections = useGetDetections(
		{
			query: { page: 1, limit: 5, company_code: selectedCompany?.company_code ?? "" },
		},
		{
			enabled: !!selectedCompany?.company_code,
			refetchInterval: 5000,
		},
	)
	const statistics = useGetDetectionsStatistics(
		{
			query: { ...filters, company_code: selectedCompany?.company_code ?? "" },
		},
		{
			enabled: !!selectedCompany?.company_code,
			refetchInterval: 5000,
		},
	)

	useEffect(() => {
		if (!detections.isLoading && detections.data) {
			const totalItems = detections.data.total || 0

			if (previousDataCountRef.current > 0 && totalItems > previousDataCountRef.current) {
				const newItemsCount = totalItems - previousDataCountRef.current
				toast.info(`${newItemsCount} new alert${newItemsCount > 1 ? "s" : ""} detected`, {
					description: "New security alerts have been received",
					duration: 4000,
				})
			}

			previousDataCountRef.current = totalItems
		}
	}, [detections.data, detections.isLoading])

	return (
		<div className="absolute top-[10px] left-[10px] h-full w-[400px]">
			<ScrollArea className="h-full">
				<div className="flex flex-col gap-[10px] overflow-y-auto max-h-[calc(100%)] mb-[10px]">
					<AlertsChartCard data={statistics.data} isLoading={statistics.isLoading} />
					<LatestAlertsCard data={detections.data?.data || []} isLoading={detections.isLoading} />
					<OverviewChartCard data={statistics.data} isLoading={statistics.isLoading} />
				</div>
				<ScrollBar orientation="vertical" />
			</ScrollArea>
		</div>
	)
}

export default memo(GroupCardsLeft)
