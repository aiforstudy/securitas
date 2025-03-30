import React, { useRef, useState } from "react"

import { Map } from "@vis.gl/react-google-maps"

import { EMapTypeId } from "@/enums/map"

import GroupButtonsRight from "./_components/GroupButtonsRight"
import GroupCardsLeft from "./_components/GroupCardsLeft"
import SwitchMapType from "./_components/SwitchMapType"

const DashboardPage: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null)
	const position = { lat: 10.8300923, lng: 106.6291799 }
	const [mapType, setMapType] = useState<EMapTypeId>(EMapTypeId.ROADMAP)
	const [isFullscreen, setIsFullscreen] = useState(false)

	const handleFullscreen = () => {
		if (isFullscreen) {
			setIsFullscreen(false)
			document.exitFullscreen()
		} else {
			setIsFullscreen(true)
			containerRef.current?.requestFullscreen()
		}
	}

	return (
		<div ref={containerRef} className="w-full h-full relative overflow-hidden">
			<Map
				mapId="DEMO_MAP_ID"
				mapTypeId={mapType}
				defaultZoom={12}
				defaultCenter={position}
				cameraControl
				disableDefaultUI
			></Map>
			<GroupCardsLeft />
			<GroupButtonsRight isFullscreen={isFullscreen} toggleFullscreen={handleFullscreen} />
			<div className="absolute bottom-20 right-[10px]">
				<SwitchMapType typeMap={mapType} onChangeType={setMapType} />
			</div>
		</div>
	)
}

export default DashboardPage
