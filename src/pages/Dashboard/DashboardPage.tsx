import React from "react"

import { AdvancedMarker, Map } from "@vis.gl/react-google-maps"

const DashboardPage: React.FC = () => {
	const position = { lat: 53.54992, lng: 10.00678 }

	return (
		<div className="w-full h-full bg-amber-600">
			<Map defaultCenter={position} defaultZoom={10} mapId="DEMO_MAP_ID">
				<AdvancedMarker position={position} />
			</Map>
		</div>
	)
}

export default DashboardPage
