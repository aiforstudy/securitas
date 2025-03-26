import React, { useRef, useState } from "react"

import { AdvancedMarker, Map } from "@vis.gl/react-google-maps"

import { EMapTypeId } from "@/enums/map"

import GroupButtonsRight from "./_components/GroupButtonsRight"
import GroupCardsLeft from "./_components/GroupCardsLeft"
import SwitchMapType from "./_components/SwitchMapType"

const DashboardPage: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null)
	const position = { lat: 10.762622, lng: 106.660172 }
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
				mapId="49ae42fed52588c3"
				mapTypeId={mapType}
				defaultZoom={15}
				defaultCenter={position}
				cameraControl
				disableDefaultUI
			>
				<AdvancedMarker position={position} />
			</Map>
			<GroupCardsLeft />
			<GroupButtonsRight isFullscreen={isFullscreen} toggleFullscreen={handleFullscreen} />
			<div className="absolute bottom-20 right-[10px]">
				<SwitchMapType typeMap={mapType} onChangeType={setMapType} />
			</div>
		</div>
	)
}

export default DashboardPage
