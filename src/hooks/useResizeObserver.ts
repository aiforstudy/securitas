import { useEffect, useRef, useState } from "react"

const useResizeObserver = () => {
	const ref = useRef(null)
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

	useEffect(() => {
		const observeTarget = ref.current
		const resizeObserver = new ResizeObserver((entries) => {
			entries.forEach((entry) => {
				setDimensions({
					width: Math.ceil(entry.contentRect.width + entry.contentRect.x * 2),
					height: entry.contentRect.height,
				})
			})
		})

		if (observeTarget) {
			resizeObserver.observe(observeTarget)
		}

		return () => {
			if (observeTarget) {
				resizeObserver.unobserve(observeTarget)
			}
		}
	}, [ref])

	return { ref, dimensions }
}

export default useResizeObserver
