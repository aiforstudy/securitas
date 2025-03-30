"use client"

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [{ engine1: 1260, engine2: 570, engine3: 1000, engine4: 800 }]

const chartConfig = {
	engine1: {
		label: "Engine 1",
		color: "var(--chart-1)",
	},
	engine2: {
		label: "Engine 2",
		color: "var(--chart-2)",
	},
	engine3: {
		label: "Engine 3",
		color: "var(--chart-3)",
	},
	engine4: {
		label: "Engine 4",
		color: "var(--chart-4)",
	},
} satisfies ChartConfig

const AlertsChartCard = () => {
	const totalVisitors = chartData[0].engine1 + chartData[0].engine2 + chartData[0].engine3 + chartData[0].engine4

	return (
		<Card className="flex gap-2 py-2 flex-col">
			<CardHeader className="p-2 pr-4 items-center flex justify-between">
				<CardTitle>Alerts</CardTitle>
				<CardDescription></CardDescription>
			</CardHeader>
			<CardContent className="p-2 pr-4 w-[400px] max-h-[300px]">
				<ChartContainer config={chartConfig} className="mx-auto aspect-square w-full h-[250px]">
					<RadialBarChart data={chartData} endAngle={180} innerRadius={80} outerRadius={130}>
						<ChartLegend content={<ChartLegendContent nameKey="engine1" />} />
						<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
						<PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
												<tspan x={viewBox.cx} y={(viewBox.cy || 0) - 16} className="fill-foreground text-2xl font-bold">
													{totalVisitors.toLocaleString()}
												</tspan>
												<tspan x={viewBox.cx} y={(viewBox.cy || 0) + 4} className="fill-muted-foreground">
													Alerts
												</tspan>
											</text>
										)
									}
								}}
							/>
						</PolarRadiusAxis>
						<RadialBar
							dataKey="engine1"
							stackId="a"
							fill="var(--color-chart-1)"
							className="stroke-transparent stroke-2"
						/>
						<RadialBar
							dataKey="engine2"
							fill="var(--color-chart-2)"
							stackId="a"
							className="stroke-transparent stroke-2"
						/>
						<RadialBar
							dataKey="engine3"
							fill="var(--color-chart-3)"
							stackId="a"
							className="stroke-transparent stroke-2"
						/>
						<RadialBar
							dataKey="engine4"
							fill="var(--color-chart-4)"
							stackId="a"
							className="stroke-transparent stroke-2"
						/>
					</RadialBarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}

export default AlertsChartCard
