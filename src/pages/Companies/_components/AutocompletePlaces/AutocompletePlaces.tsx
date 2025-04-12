import React, { FormEvent, useCallback, useState } from "react"

import { useMapsLibrary } from "@vis.gl/react-google-maps"

import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

import { useAutocompleteSuggestions } from "./useAutocompleteSuggestions"

type AutocompletePlacesProps = {
	onSelect: (place: google.maps.places.Place | null) => void
}

const AutocompletePlaces: React.FC<AutocompletePlacesProps> = ({ onSelect }) => {
	const places = useMapsLibrary("places")
	const [inputValue, setInputValue] = useState("")
	const { suggestions, resetSession } = useAutocompleteSuggestions(inputValue)

	const handleInput = useCallback((event: FormEvent<HTMLInputElement>) => {
		setInputValue((event.target as HTMLInputElement).value)
	}, [])

	const handleSuggestionClick = useCallback(
		async (suggestion: google.maps.places.AutocompleteSuggestion) => {
			if (!places) return
			if (!suggestion.placePrediction) return

			const place = suggestion.placePrediction.toPlace()

			await place.fetchFields({
				fields: ["viewport", "location", "svgIconMaskURI", "iconBackgroundColor"],
			})

			setInputValue("")

			// calling fetchFields invalidates the session-token, so we now have to call
			// resetSession() so a new one gets created for further search
			resetSession()

			onSelect(place)
		},
		[onSelect, places, resetSession],
	)

	return (
		<div className="m-2 w-[200px]">
			<Input
				value={inputValue}
				onChange={handleInput}
				className="w-[200px] bg-white"
				sizeVariant="sm"
				placeholder="Search for a place"
			/>
			{suggestions.length > 0 && (
				<ul className="bg-white rounded-md">
					<ScrollArea className="h-[200px]">
						{suggestions.map((suggestion, index) => {
							return (
								<li
									key={index}
									className="p-2 hover:bg-gray-100 cursor-pointer"
									onClick={() => handleSuggestionClick(suggestion)}
								>
									{suggestion.placePrediction?.text.text}
								</li>
							)
						})}
					</ScrollArea>
				</ul>
			)}
		</div>
	)
}

export default AutocompletePlaces
