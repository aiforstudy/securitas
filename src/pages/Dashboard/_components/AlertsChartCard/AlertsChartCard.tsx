import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

import { DetectionStatisticsResponseDto } from "@/api-generated"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"

type AlertsChartCardProps = {
	data?: DetectionStatisticsResponseDto
	isLoading: boolean
}
const AlertsChartCard: React.FC<AlertsChartCardProps> = ({ data, isLoading }) => {
	const config: Record<string, { label: string; color: string }> = {} satisfies ChartConfig
	const allData = Object.keys(data?.engines || {}).map((key, index) => {
		const engine = data?.engines[key] as { name: string } | undefined
		const byEngine = data?.data?.reduce((acc, item) => {
			const value = item[key as keyof typeof item]
			return acc + (typeof value === "number" ? value : 0)
		}, 0)

		config[key as string] = {
			label: engine?.name || key,
			color: `var(--chart-${index + 1})`,
		}

		return { ...engine, key, total: byEngine || 0, [key]: byEngine || 0 }
	})
	const totalAlerts = allData.reduce((sum, item) => sum + item.total, 0)

	return (
		<Card className="flex gap-2 py-2 flex-col">
			<CardHeader className="p-2 pr-4 items-center flex justify-between">
				<CardTitle>Alerts</CardTitle>
				<CardDescription></CardDescription>
			</CardHeader>
			<CardContent className="p-2 pr-4 w-[400px] max-h-[300px]">
				{isLoading ? (
					<Skeleton className="w-full h-[250px]" />
				) : (
					<ChartContainer config={config} className="mx-auto aspect-square h-[250px] w-full">
						<RadialBarChart data={allData} endAngle={180} innerRadius={60} outerRadius={150}>
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
							{allData.map((item, index) => {
								return (
									<RadialBar
										key={index}
										fill={`var(--color-${item.key})`}
										dataKey={item.key}
										stackId="a"
										className="stroke-transparent stroke-2"
									/>
								)
							})}
							<ChartLegend content={<ChartLegendContent nameKey="key" />} />
							<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel className="w-[180px]" />} />
						</RadialBarChart>
					</ChartContainer>
				)}
			</CardContent>
		</Card>
	)
}

export default AlertsChartCard
