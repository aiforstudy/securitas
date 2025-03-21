export const getInitials = (name: string): string => {
	const letters = name.split(" ")
	if (letters.length === 1) return letters[0].charAt(0)
	return letters[letters.length - 1].charAt(0)
}

export const capitalizeFirstLetter = (str: string): string => {
	if (!str.trim()) return ""

	return str.replace(/\b\w+/g, (word) => {
		if (word.length === 0) return word
		return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
	})
}

export const slugToHumanReadable = (slug: string): string => {
	return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
}

export const humanReadableToSlug = (str: string): string => {
	return str
		.toLowerCase()
		.replace(/ /g, "-")
		.replace(/[^\w-]+/g, "")
}

export const truncateString = (str: string, maxLength: number): string => {
	if (str.length <= maxLength) return str
	return str.slice(0, maxLength) + "..."
}
