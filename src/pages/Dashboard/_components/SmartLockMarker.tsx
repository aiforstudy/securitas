import React, { memo, useCallback, useState } from "react"

import {
	AdvancedMarker,
	AdvancedMarkerAnchorPoint,
	AdvancedMarkerProps,
	InfoWindow,
	useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps"

import { SmartLock } from "@/api-generated/types.gen"
import smartLockOn from "@/assets/images/marker-smartlock.png"

interface ISmartLockMarkerProps {
	index: number
	smartLock: SmartLock
	selectedId: string | null
	selectedMarker: google.maps.marker.AdvancedMarkerElement | null
	infoWindowShown: boolean
	setSelectedId: React.Dispatch<React.SetStateAction<string | null>>
	setSelectedMarker: React.Dispatch<React.SetStateAction<google.maps.marker.AdvancedMarkerElement | null>>
	setInfoWindowShown: React.Dispatch<React.SetStateAction<boolean>>
}

export const AdvancedMarkerWithRef = (
	props: AdvancedMarkerProps & {
		onMarkerClick: (marker: google.maps.marker.AdvancedMarkerElement) => void
	},
) => {
	const { children, onMarkerClick, ...advancedMarkerProps } = props
	const [markerRef, marker] = useAdvancedMarkerRef()

	return (
		<AdvancedMarker
			onClick={() => {
				if (marker) {
					onMarkerClick(marker)
				}
			}}
			ref={markerRef}
			{...advancedMarkerProps}
		>
			{children}
		</AdvancedMarker>
	)
}

const SmartLockMarker: React.FC<ISmartLockMarkerProps> = ({
	index,
	smartLock,
	selectedId,
	selectedMarker,
	infoWindowShown,
	setSelectedId,
	setSelectedMarker,
	setInfoWindowShown,
}) => {
	const [hoverId, setHoverId] = useState<string | null>(null)

	const _onMouseEnter = useCallback((id: string | null) => setHoverId(id), [])
	const _onMouseLeave = useCallback(() => setHoverId(null), [])
	const _onMarkerClick = useCallback(
		(id: string | null, marker?: google.maps.marker.AdvancedMarkerElement) => {
			setSelectedId(id)

			if (marker) {
				setSelectedMarker(marker)
			}

			if (id !== selectedId) {
				setInfoWindowShown(true)
			} else {
				setInfoWindowShown((isShown) => !isShown)
			}
		},
		[selectedId, setInfoWindowShown, setSelectedId, setSelectedMarker],
	)

	const handleInfoWindowCloseClick = useCallback(() => setInfoWindowShown(false), [])

	return (
		<div className="relative">
			<AdvancedMarkerWithRef
				key={smartLock.id}
				style={{
					transform: `scale(${[hoverId, selectedId].includes(smartLock.id) ? 1.3 : 1})`,
					transformOrigin: AdvancedMarkerAnchorPoint.CENTER.join(" "),
				}}
				zIndex={index}
				position={new google.maps.LatLng(smartLock.lat, smartLock.lng)}
				anchorPoint={AdvancedMarkerAnchorPoint.CENTER}
				onMouseEnter={() => _onMouseEnter(smartLock.id)}
				onMouseLeave={_onMouseLeave}
				onMarkerClick={(marker: google.maps.marker.AdvancedMarkerElement) => _onMarkerClick(smartLock.id, marker)}
			>
				<img
					src={smartLockOn}
					alt="Smart Lock"
					className={`w-12 h-12 ${smartLock.status === "disconnected" ? "grayscale" : ""}`}
				/>
			</AdvancedMarkerWithRef>
			{infoWindowShown && selectedMarker && selectedId === smartLock.id && (
				<InfoWindow
					anchor={selectedMarker}
					pixelOffset={[0, -2]}
					onCloseClick={handleInfoWindowCloseClick}
					headerContent={<div className="font-semibold">{smartLock.name}</div>}
				>
					<div className="text-gray-600">SN: {smartLock.sn}</div>
					<div className={`${smartLock.status === "connected" ? "text-green-500" : "text-red-500"}`}>
						Status: {smartLock.status}
					</div>
					<div className="text-gray-600">Last Update: {new Date(smartLock.latest_time).toLocaleString()}</div>
				</InfoWindow>
			)}
		</div>
	)
}

export default memo(SmartLockMarker)
