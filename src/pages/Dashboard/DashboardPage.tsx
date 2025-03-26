import React from "react"

import { AdvancedMarker, Map } from "@vis.gl/react-google-maps"

const DashboardPage: React.FC = () => {
	const position = { lat: 10.762622, lng: 106.660172 }

	return (
		<div className="w-full h-full">
			<Map defaultCenter={position} defaultZoom={10} mapId="DEMO_MAP_ID">
				<AdvancedMarker position={position} />
			</Map>
		</div>
	)
}

export default DashboardPage
