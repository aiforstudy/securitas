import React from "react"

import { useQuery } from "@tanstack/react-query"

import { detectionControllerFindAllOptions } from "@/api-generated/@tanstack/react-query.gen"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

import AlertsChartCard from "../AlertsChartCard"
import LatestAlertsCard from "../LatestAlertsCard"
import OverviewChartCard from "../OverviewChartCard"

const GroupCardsLeft: React.FC = () => {
	const { data, isLoading } = useQuery({ ...detectionControllerFindAllOptions({ query: { page: 1, limit: 5 } }) })

	return (
		<div className="absolute top-[10px] left-[10px] h-full w-[400px]">
			<ScrollArea className="h-full">
				<div className="flex flex-col gap-[10px] overflow-y-auto max-h-[calc(100%)] mb-[10px]">
					<AlertsChartCard />
					<LatestAlertsCard data={data?.data || []} isLoading={isLoading} />
					<OverviewChartCard />
				</div>
				<ScrollBar orientation="vertical" />
			</ScrollArea>
		</div>
	)
}

export default GroupCardsLeft
