import React, { useState } from "react"

import { AdvancedMarker } from "@vis.gl/react-google-maps"

import { SmartLock } from "@/api-generated/types.gen"
import smartLockOn from "@/assets/images/marker-smartlock.png"

interface ISmartLockMarkerProps {
	smartLock: SmartLock
	onClick?: () => void
	setMarkerRef?: (marker: google.maps.marker.AdvancedMarkerElement | null) => void
}

const SmartLockMarker: React.FC<ISmartLockMarkerProps> = ({ smartLock, onClick, setMarkerRef }) => {
	const [showTooltip, setShowTooltip] = useState(false)

	return (
		<div onMouseOver={() => setShowTooltip(true)} onMouseOut={() => setShowTooltip(false)} className="relative">
			<AdvancedMarker
				position={new google.maps.LatLng(smartLock.lat, smartLock.lng)}
				onClick={onClick}
				ref={setMarkerRef}
			>
				<img
					src={smartLockOn}
					alt="Smart Lock"
					className={`w-12 h-12 ${smartLock.status === "disconnected" ? "grayscale" : ""}`}
				/>
			</AdvancedMarker>
			{showTooltip && (
				<div
					className="absolute bg-white p-2 rounded shadow-lg text-sm min-w-[200px] z-50"
					style={{
						top: "-100px",
						left: "50%",
						transform: "translateX(-50%)",
					}}
				>
					<div className="font-semibold">{smartLock.name}</div>
					<div className="text-gray-600">SN: {smartLock.sn}</div>
					<div className={`${smartLock.status === "connected" ? "text-green-500" : "text-red-500"}`}>
						Status: {smartLock.status}
					</div>
					<div className="text-gray-600">Last Update: {new Date(smartLock.latest_time).toLocaleString()}</div>
				</div>
			)}
		</div>
	)
}

export default SmartLockMarker
