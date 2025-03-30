"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
	{ month: "January", desktop: 186, mobile: 80 },
	{ month: "February", desktop: 305, mobile: 200 },
	{ month: "March", desktop: 237, mobile: 120 },
	{ month: "April", desktop: 73, mobile: 190 },
	{ month: "May", desktop: 209, mobile: 130 },
	{ month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "var(--chart-1)",
	},
	mobile: {
		label: "Mobile",
		color: "var(--chart-2)",
	},
} satisfies ChartConfig

const OverviewChartCard: React.FC = () => {
	return (
		<Card className="flex gap-2 py-3 flex-col">
			<CardHeader className="p-3 pr-4 items-center pb-0 flex justify-between">
				<CardTitle>Overview</CardTitle>
				<CardDescription></CardDescription>
			</CardHeader>
			<CardContent className="p-3 pr-4 w-[400px] max-h-[300px]">
				<ChartContainer config={chartConfig} className="mx-auto aspect-square w-full max-w-[400px] max-h-[250px]">
					<BarChart accessibilityLayer data={chartData}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip content={<ChartTooltipContent hideLabel />} />
						<ChartLegend content={<ChartLegendContent />} />
						<Bar dataKey="desktop" stackId="a" fill="var(--color-desktop)" radius={[0, 0, 4, 4]} />
						<Bar dataKey="mobile" stackId="a" fill="var(--color-mobile)" radius={[4, 4, 0, 0]} />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}

export default OverviewChartCard
