import React, { useEffect } from "react"

import { Marker, useMap } from "@vis.gl/react-google-maps"

type AutocompleteResultProps = {
	place: google.maps.places.Place | null
}

const AutocompleteResult: React.FC<AutocompleteResultProps> = ({ place }) => {
	const map = useMap()

	useEffect(() => {
		if (!map || !place) return
		if (place.viewport) map.fitBounds(place.viewport)
	}, [map, place])

	if (!place) return null

	return <Marker position={place.location} />
}

export default React.memo(AutocompleteResult)
