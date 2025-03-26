import DefaultMapPng from "@/assets/images/default-map.png"
import SateLitePng from "@/assets/images/satellite-map.png"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { EMapTypeId } from "@/enums/map"

const mapTypes = {
	[EMapTypeId.SATELLITE]: {
		id: EMapTypeId.SATELLITE,
		img: SateLitePng,
		label: "Satellite",
	},
	[EMapTypeId.ROADMAP]: {
		id: EMapTypeId.ROADMAP,
		img: DefaultMapPng,
		label: "Roadmap",
	},
}

const getNewType = (type: EMapTypeId) => {
	if (type === EMapTypeId.SATELLITE) {
		return EMapTypeId.ROADMAP
	} else {
		return EMapTypeId.SATELLITE
	}
}

type ISwitchMapTypeProps = {
	typeMap: EMapTypeId
	onChangeType: (id: EMapTypeId) => void
}
const SwitchMapType: React.FC<ISwitchMapTypeProps> = ({ typeMap, onChangeType }) => {
	const nextType = mapTypes[getNewType(typeMap) as keyof typeof mapTypes]

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button onClick={() => onChangeType(nextType?.id)} variant="outline" size="icon" className="w-10 h-10">
						<img src={nextType.img} alt={nextType.label} className="w-8 h-8 object-cover" />
					</Button>
				</TooltipTrigger>
				<TooltipContent side="left" align="center">
					<p className="text-md font-medium">{nextType?.label}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

export default SwitchMapType
