import { useLayoutEffect, useState } from "react"

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

import { DetectionStatisticsResponseDto } from "@/api-generated"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"

type AlertsChartCardProps = {
	data?: DetectionStatisticsResponseDto
	isLoading: boolean
}

const AlertsChartCard: React.FC<AlertsChartCardProps> = ({ data, isLoading }) => {
	const [chartData, setChartData] = useState<Record<string, number>>({})
	const [chartConfig, setChartConfig] = useState<Record<string, { label: string; color: string }>>({})

	// const allData = Object.keys(data?.engines || {}).map((key) => {
	// 	const engine = data?.engines[key] as { name: string } | undefined
	// 	const byEngine = data?.data?.reduce((acc, item) => {
	// 		const value = item[key as keyof typeof item]
	// 		return acc + (typeof value === "number" ? value : 0)
	// 	}, 0)

	// 	return { ...engine, key, total: byEngine || 0, [key]: byEngine || 0 }
	// })

	// console.log("allData", allData)

	useLayoutEffect(() => {
		const newChartData: Record<string, number> = {}
		const newChartConfig: Record<string, { label: string; color: string }> = {}
		Object.keys(data?.engines || {}).forEach((key, index) => {
			const engine = data?.engines[key] as { name: string } | undefined
			const byEngine = data?.data?.reduce((acc, item) => {
				const value = item[key as keyof typeof item]
				return acc + (typeof value === "number" ? value : 0)
			}, 0)
			newChartData[key] = byEngine || 0
			newChartConfig[key] = {
				label: engine?.name || key,
				color: `var(--chart-${index + 1})`,
			}
		})
		setChartData(newChartData)
		setChartConfig(newChartConfig)
	}, [data])

	const totalAlerts = Object.values(chartData).reduce((acc, value) => acc + value, 0)

	return (
		<Card className="flex gap-2 py-3 flex-col">
			<CardHeader className="p-3 pr-4 items-center flex justify-between">
				<CardTitle>Alerts</CardTitle>
				<CardDescription></CardDescription>
			</CardHeader>
			<CardContent className="p-3 pr-0 w-[400px] max-h-[300px] overflow-hidden">
				{isLoading ? (
					<Skeleton className="w-full h-[250px]" />
				) : (
					<div className="flex w-full">
						<ChartContainer config={chartConfig} className="w-[50%] h-[250px]">
							<RadialBarChart data={[chartData]} startAngle={-20} endAngle={200} innerRadius={60} outerRadius={150}>
								<PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
									<Label
										content={({ viewBox }) => {
											if (viewBox && "cx" in viewBox && "cy" in viewBox) {
												return (
													<text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
														<tspan
															x={viewBox.cx}
															y={(viewBox.cy || 0) - 16}
															className="fill-foreground text-2xl font-bold"
														>
															{totalAlerts.toLocaleString()}
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
								{Object.keys(chartConfig).map((key) => {
									return (
										<RadialBar
											key={key}
											fill={`var(--color-${key})`}
											dataKey={key}
											stackId="a"
											className="stroke-transparent stroke-2"
										/>
									)
								})}
								<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel className="w-[180px]" />} />
							</RadialBarChart>
						</ChartContainer>
						<div className="overflow-y-auto w-[50%] h-[250px] border-l-1 pl-2">
							<ScrollArea className="h-full w-full max-w-[100%]">
								{Object.keys(chartConfig).map((key) => {
									return (
										<div key={key} className="flex gap-2 items-center justify-between pr-4">
											<div className="flex items-center gap-2">
												<div style={{ background: chartConfig[key].color }} className={`w-2 h-2`} />
												<div className="w-[130px] text-sm truncate">{chartConfig[key].label} asdasdasdas</div>
											</div>
											<p className="text-sm">{chartData[key]}</p>
										</div>
									)
								})}

								<ScrollBar orientation="vertical" />
							</ScrollArea>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	)
}

export default AlertsChartCard
