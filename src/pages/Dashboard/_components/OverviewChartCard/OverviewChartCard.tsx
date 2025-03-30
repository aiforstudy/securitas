import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

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

type OverviewChartCardProps = {
	data?: DetectionStatisticsResponseDto
	isLoading: boolean
}

const OverviewChartCard: React.FC<OverviewChartCardProps> = ({ data, isLoading }) => {
	const config: Record<string, { label: string; color: string }> = {} satisfies ChartConfig
	Object.keys(data?.engines || {}).forEach((key, index) => {
		const engine = data?.engines[key] as { name: string } | undefined
		config[key] = {
			label: engine?.name || key,
			color: `var(--chart-${index + 1})`,
		}
	})

	console.log(config)

	return (
		<Card className="flex gap-2 py-3 flex-col">
			<CardHeader className="p-3 pr-4 items-center pb-0 flex justify-between">
				<CardTitle>Overview</CardTitle>
				<CardDescription></CardDescription>
			</CardHeader>
			<CardContent className="p-3 pr-4 w-[400px] max-h-[300px]">
				{isLoading ? (
					<Skeleton className="w-full h-[250px]" />
				) : (
					<ChartContainer config={config} className="mx-auto w-full h-[250px]">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={data?.data || []} margin={{ left: -25 }} accessibilityLayer>
								<XAxis dataKey="timestamp" axisLine={false} tickLine={false} />
								<CartesianGrid vertical={false} />
								<YAxis axisLine={false} tickLine={false} />
								<ChartLegend content={<ChartLegendContent />} />
								<ChartTooltip content={<ChartTooltipContent className="w-[180px]" />} />
								{Object.keys(config).map((key) => (
									<Bar key={key} dataKey={key} stackId="a" fill={config[key].color} radius={[4, 4, 0, 0]} />
								))}
							</BarChart>
						</ResponsiveContainer>
					</ChartContainer>
				)}
			</CardContent>
		</Card>
	)
}

export default OverviewChartCard
