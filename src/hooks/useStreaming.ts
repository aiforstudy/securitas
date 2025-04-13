import { useRef, useState } from "react"

import Axios, { CancelTokenSource } from "axios"
import Hls from "hls.js"

import { IStreamingCamera } from "@/types/liveView"

export const useStreaming = () => {
	const hlsRef = useRef<Hls | null>(null)
	const cancelSourceRef = useRef<CancelTokenSource | null>(null)
	const [loading, setLoading] = useState(false)
	const [hlsPlayer, setHLSPlayer] = useState<Hls | null>(null)
	const [streaming, setStreaming] = useState(false)
	const [videoPlayer, setVideoPlayer] = useState<HTMLVideoElement | null>(null)
	const [loadStreamError, setLoadStreamError] = useState(false)

	const startPlayHLS = async (url: string) => {
		setLoading(true)
		setLoadStreamError(false)
		if (videoPlayer) {
			const CancelToken = Axios.CancelToken
			const source = CancelToken.source()
			cancelSourceRef.current = source
			try {
				const res = await Axios.get(url, { cancelToken: source.token })
				if (res.data) loadVideoSource(videoPlayer, url)
			} catch (e) {
				console.log("🚀 ~ useStreaming.ts:34 ~ e:", e)
			}
		}
	}

	const loadVideoSource = (videoPlayer: HTMLVideoElement, url: string) => {
		if (videoPlayer.canPlayType("application/vnd.apple.mpegurl")) {
			videoPlayer.src = url
			videoPlayer.load()
			return
		}
		if (Hls.isSupported()) {
			const hls = new Hls({
				manifestLoadingTimeOut: 60000,
			})
			setHLSPlayer(hls)
			hls.loadSource(url)
			hls.attachMedia(videoPlayer)
			setStreaming(true)
			hlsRef.current = hls
			videoPlayer.addEventListener("loadeddata", () => {
				setLoading(false)
			})
			videoPlayer.addEventListener("error", () => {
				setLoadStreamError(true)
				setLoading(false)
			})
		}
	}

	const retry = (monitoring: IStreamingCamera) => {
		if (videoPlayer && monitoring.hls_uri) {
			startPlayHLS(monitoring.hls_uri)
		}
	}

	return {
		cancelSourceRef,
		hlsRef,
		hlsPlayer,
		videoPlayer,
		streaming,
		loading,
		loadStreamError,
		setVideoPlayer,
		startPlayHLS,
		retry,
		setLoading,
		setStreaming,
	}
}
