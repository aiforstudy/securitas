import { useCallback, useEffect, useRef } from "react"

type UseIdleTimer = (callback: () => void, timeout?: number) => void

const TIMEOUT = 60 * 30 * 1000 // 30 minutes

const useIdleTimer: UseIdleTimer = (callback, timeout = TIMEOUT) => {
	const timer = useRef<NodeJS.Timeout | null>(null)

	const resetTimer = useCallback(() => {
		if (timer.current) {
			clearTimeout(timer.current)
		}
		timer.current = setTimeout(callback, timeout)
	}, [callback, timeout])

	useEffect(() => {
		const events = ["mousemove", "keydown", "scroll", "click"]

		const eventHandler = () => {
			resetTimer()
		}

		events.forEach((event) => window.addEventListener(event, eventHandler))

		resetTimer()

		return () => {
			events.forEach((event) => window.removeEventListener(event, eventHandler))
			if (timer.current) clearTimeout(timer.current)
		}
	}, [callback, resetTimer, timeout])

	return null
}

export default useIdleTimer
