import React, { useMemo, useState } from "react"

import { AdvancedMarker } from "@vis.gl/react-google-maps"

import { Monitor } from "@/api-generated/types.gen"
import markerCamera from "@/assets/images/marker-camera.png"
import { ICamera } from "@/types/camera"

interface ICameraMarkerProps {
	camera: ICamera | Monitor
	onClick?: () => void
	setMarkerRef?: (marker: google.maps.marker.AdvancedMarkerElement | null) => void
}

const CameraMarker2: React.FC<ICameraMarkerProps> = ({ camera, onClick, setMarkerRef }) => {
	const [showTooltip, setShowTooltip] = useState(false)
	const position = useMemo(() => {
		const location = typeof camera.location === "string" ? JSON.parse(camera.location ?? "[]") : camera.location
		return { lat: location[0], lng: location[1] }
	}, [camera.location])

	return (
		<div className="relative">
			<div onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)} className="relative">
				<AdvancedMarker
					position={new google.maps.LatLng(position.lat, position.lng)}
					onClick={onClick}
					ref={setMarkerRef}
				>
					<img
						src={markerCamera}
						alt="Camera"
						className={`w-12 h-12 ${camera.status === "DISCONNECTED" ? "grayscale" : ""}`}
					/>
				</AdvancedMarker>
			</div>
			{showTooltip && (
				<div
					className="absolute bg-white p-2 rounded shadow-lg text-sm min-w-[200px] z-50"
					style={{
						top: "-100px",
						left: "50%",
						transform: "translateX(-50%)",
					}}
				>
					<div className="font-semibold">{camera.name}</div>
					<div className="text-gray-600">ID: {camera.id}</div>
					<div className={`${camera.status === "CONNECTED" ? "text-green-500" : "text-red-500"}`}>
						Status: {camera.status}
					</div>
					<div className="text-gray-600">Type: {camera.type}</div>
					{camera.description && <div className="text-gray-600">Description: {camera.description}</div>}
				</div>
			)}
		</div>
	)
}

export default CameraMarker2
