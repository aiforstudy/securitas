import React from "react"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

import AlertsChartCard from "../AlertsChartCard"
import LatestAlertsCard from "../LatestAlertsCard"
import OverviewChartCard from "../OverviewChartCard"

const GroupCardsLeft: React.FC = () => {
	return (
		<div className="absolute top-[10px] left-[10px] h-full w-[350px]">
			<ScrollArea className="h-full">
				<div className="flex flex-col gap-[10px] overflow-y-auto max-h-[calc(100%)] mb-[10px]">
					<AlertsChartCard />
					<LatestAlertsCard />
					<OverviewChartCard />
				</div>
				<ScrollBar orientation="vertical" />
			</ScrollArea>
		</div>
	)
}

export default GroupCardsLeft
