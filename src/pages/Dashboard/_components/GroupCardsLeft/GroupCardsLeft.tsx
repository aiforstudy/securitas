import React, { memo, useState } from "react"

import { useQuery } from "@tanstack/react-query"
import moment from "moment"

import {
	detectionControllerGetStatisticsOptions,
	detectionControllerSearchDetectionsOptions,
} from "@/api-generated/@tanstack/react-query.gen"
import { DetectionControllerGetStatisticsData, PaginatedDetectionDto } from "@/api-generated/types.gen"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useGlobalStore } from "@/stores/global"

import AlertsChartCard from "../AlertsChartCard"
import LatestAlertsCard from "../LatestAlertsCard"
import OverviewChartCard from "../OverviewChartCard"

const GroupCardsLeft: React.FC = () => {
	const { selectedCompany } = useGlobalStore()
	const [filters] = useState<DetectionControllerGetStatisticsData["query"]>({
		from: moment().subtract(7, "day").toISOString(),
		to: moment().toISOString(),
		group_by: "day",
		timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		company_code: selectedCompany?.company_code || "",
	})
	const { data: alerts, isLoading: isLoadingAlerts } = useQuery({
		...detectionControllerSearchDetectionsOptions({
			query: { page: 1, limit: 5, company_code: selectedCompany?.company_code || "" },
		}),
		enabled: !!selectedCompany?.company_code,
	})
	const { data: statistics, isLoading: isLoadingStatistics } = useQuery({
		...detectionControllerGetStatisticsOptions({
			query: { ...filters, company_code: selectedCompany?.company_code || "" },
		}),
		enabled: !!selectedCompany?.company_code,
	})

	return (
		<div className="absolute top-[10px] left-[10px] h-full w-[400px]">
			<ScrollArea className="h-full">
				<div className="flex flex-col gap-[10px] overflow-y-auto max-h-[calc(100%)] mb-[10px]">
					<AlertsChartCard data={statistics} isLoading={isLoadingStatistics} />
					<LatestAlertsCard
						data={(alerts as unknown as PaginatedDetectionDto)?.data || []}
						isLoading={isLoadingAlerts}
					/>
					<OverviewChartCard data={statistics} isLoading={isLoadingStatistics} />
				</div>
				<ScrollBar orientation="vertical" />
			</ScrollArea>
		</div>
	)
}

export default memo(GroupCardsLeft)
