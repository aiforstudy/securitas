import React, { memo, useCallback, useMemo, useState } from "react"

import {
	AdvancedMarker,
	AdvancedMarkerAnchorPoint,
	AdvancedMarkerProps,
	InfoWindow,
	useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps"

import { Monitor } from "@/api-generated/types.gen"
import markerCamera from "@/assets/images/marker-camera.png"
import { ICamera } from "@/types/camera"

interface ICameraMarkerProps {
	index: number
	camera: ICamera | Monitor
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

const CameraMarker2: React.FC<ICameraMarkerProps> = ({
	index,
	camera,
	selectedId,
	selectedMarker,
	infoWindowShown,
	setSelectedId,
	setSelectedMarker,
	setInfoWindowShown,
}) => {
	const position = useMemo(() => {
		const location = typeof camera.location === "string" ? JSON.parse(camera.location ?? "[]") : camera.location
		return { lat: location[0], lng: location[1] }
	}, [camera.location])

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
				key={camera.id}
				style={{
					transform: `scale(${[hoverId, selectedId].includes(camera.id) ? 1.3 : 1})`,
					transformOrigin: AdvancedMarkerAnchorPoint.CENTER.join(" "),
				}}
				zIndex={index}
				position={new google.maps.LatLng(position.lat, position.lng)}
				anchorPoint={AdvancedMarkerAnchorPoint.CENTER}
				onMouseEnter={() => _onMouseEnter(camera.id)}
				onMouseLeave={_onMouseLeave}
				onMarkerClick={(marker: google.maps.marker.AdvancedMarkerElement) => _onMarkerClick(camera.id, marker)}
			>
				<img
					src={markerCamera}
					alt="Camera"
					className={`w-12 h-12 ${camera.status === "DISCONNECTED" ? "grayscale" : ""}`}
				/>
			</AdvancedMarkerWithRef>
			{infoWindowShown && selectedMarker && selectedId === camera.id && (
				<InfoWindow
					anchor={selectedMarker}
					pixelOffset={[0, -2]}
					onCloseClick={handleInfoWindowCloseClick}
					headerContent={<div className="font-semibold">{camera.name}</div>}
				>
					<div className="text-gray-600">ID: {camera.id}</div>
					<div className={`${camera.status === "CONNECTED" ? "text-green-500" : "text-red-500"}`}>
						Status: {camera.status}
					</div>
					<div className="text-gray-600">Type: {camera.type}</div>
					{camera.description && <div className="text-gray-600">Description: {camera.description}</div>}
				</InfoWindow>
			)}
		</div>
	)
}

export default memo(CameraMarker2)
