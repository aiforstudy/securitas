export const hexToRgba = (hex: string, opacity: number = 1) => {
	const hexValue = hex.replace("#", "")
	const r = parseInt(hexValue.substring(0, 2), 16)
	const g = parseInt(hexValue.substring(2, 4), 16)
	const b = parseInt(hexValue.substring(4, 6), 16)
	return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

export const rgbaToHex = (rgba: string) => {
	const rgbaValue = rgba.replace("rgba(", "").replace(")", "")
	const rgbaArray = rgbaValue.split(",").map(Number)
	const hex = rgbaArray.map((value) => value.toString(16).padStart(2, "0")).join("")
	return `#${hex}`
}
