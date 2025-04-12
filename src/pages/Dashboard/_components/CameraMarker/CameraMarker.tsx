import React, { useCallback, useMemo } from "react"

import { AdvancedMarker } from "@vis.gl/react-google-maps"
import { Cctv } from "lucide-react"

import { Monitor } from "@/api-generated/types.gen"

export type CameraMarkerProps = {
	camera: Monitor
	onClick: (camera: Monitor) => void
	setMarkerRef: (marker: google.maps.marker.AdvancedMarkerElement | null, key: string) => void
}

const CameraMarker: React.FC<CameraMarkerProps> = (props) => {
	const { camera, onClick, setMarkerRef } = props

	const position = useMemo(() => {
		const location = JSON.parse(camera.location || "[]")
		return { lat: location[0], lng: location[1] }
	}, [camera.location])

	const handleClick = useCallback(() => onClick(camera), [onClick, camera])
	const ref = useCallback(
		(marker: google.maps.marker.AdvancedMarkerElement) => setMarkerRef(marker, camera.id),
		[setMarkerRef, camera.id],
	)

	return (
		<AdvancedMarker position={position} ref={ref} onClick={handleClick}>
			<div className="bg-primary rounded-full p-2 shadow-2xl">
				<Cctv className="w-8 h-8 text-white" />
			</div>
		</AdvancedMarker>
	)
}

export default CameraMarker
