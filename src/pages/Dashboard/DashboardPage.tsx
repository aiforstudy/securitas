import React, { useCallback, useEffect, useRef, useState } from "react"

import { useQuery } from "@tanstack/react-query"
import { Map } from "@vis.gl/react-google-maps"

import { monitorControllerFindAllOptions } from "@/api-generated/@tanstack/react-query.gen"
import { EMapTypeId } from "@/enums/map"
import { useGlobalStore } from "@/stores/global"

import CameraMarker from "./_components/CameraMarker"
import GroupButtonsRight from "./_components/GroupButtonsRight"
import GroupCardsLeft from "./_components/GroupCardsLeft"
import SwitchMapType from "./_components/SwitchMapType"

const DashboardPage: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null)
	const [center, setCenter] = useState<{ lat: number; lng: number }>({ lat: 10.8300923, lng: 106.6291799 })
	const [mapType, setMapType] = useState<EMapTypeId>(EMapTypeId.ROADMAP)
	const [isFullscreen, setIsFullscreen] = useState(false)
	const { selectedCompany } = useGlobalStore()
	const { data } = useQuery({
		...monitorControllerFindAllOptions({
			query: { page: 1, limit: 1000, company_code: selectedCompany?.company_code ?? "" },
		}),
		enabled: !!selectedCompany?.company_code,
	})

	useEffect(() => {
		if (selectedCompany?.location) {
			const location =
				typeof selectedCompany?.location === "string"
					? JSON.parse(selectedCompany?.location || "[]")
					: selectedCompany?.location
			setCenter({ lat: location[0], lng: location[1] })
		}
	}, [selectedCompany?.location])

	const handleFullscreen = () => {
		if (isFullscreen) {
			setIsFullscreen(false)
			document.exitFullscreen()
		} else {
			setIsFullscreen(true)
			containerRef.current?.requestFullscreen()
		}
	}

	const renderCameraMakers = useCallback(() => {
		return data?.data?.map((monitor) => {
			return <CameraMarker key={monitor.id} camera={monitor} onClick={() => {}} setMarkerRef={() => {}} />
		})
	}, [data])

	return (
		<div ref={containerRef} className="w-full h-full relative overflow-hidden">
			<Map
				mapId="DEMO_MAP_ID"
				mapTypeId={mapType}
				defaultZoom={12}
				cameraControl
				defaultCenter={center}
				disableDefaultUI
			>
				{renderCameraMakers()}
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
