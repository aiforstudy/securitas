import { useRef, useState } from "react"

import Axios, { CancelTokenSource } from "axios"
import Hls from "hls.js"

import { CONFIG } from "@/constants/config"
import { IStreamingCamera } from "@/types/liveView"
import { sha256Hash } from "@/utils/hash"

export const useStreaming = () => {
	const hlsRef = useRef<Hls | null>(null)
	const cancelSourceRef = useRef<CancelTokenSource | null>(null)
	const [loading, setLoading] = useState(false)
	const [hlsPlayer, setHLSPlayer] = useState<Hls | null>(null)
	const [streaming, setStreaming] = useState(false)
	const [videoPlayer, setVideoPlayer] = useState<HTMLVideoElement | null>(null)
	const [loadStreamError, setLoadStreamError] = useState(false)

	const startPlayHLS = async (id: string, link: string) => {
		setLoading(true)
		setLoadStreamError(false)
		const streamRequestHash = id ?? (await sha256Hash(link))
		if (videoPlayer) {
			const url = `${CONFIG.HSL_STREAM_URL}/${streamRequestHash}/index.m3u8`
			const CancelToken = Axios.CancelToken
			const source = CancelToken.source()
			cancelSourceRef.current = source
			try {
				const res = await Axios.get(url, { cancelToken: source.token })
				if (res.data) {
					loadVideoSource(videoPlayer, url)
				}
				console.log("🚀 ~ useStreaming.ts:33 ~ res:", res)
			} catch (e) {
				console.log("🚀 ~ useStreaming.ts:34 ~ e:", e)
				// addStream(streamRequestHash, link)
			} finally {
				// setLoading(false)
			}
		}
	}

	const addStream = async (streamRequestHash: string, url?: string | null) => {
		if (!url) {
			setLoadStreamError(true)
			setLoading(false)
			return
		}
		try {
			const res = await Axios.post(
				`${CONFIG.API_URL}/v3/config/paths/add/${streamRequestHash}`,
				JSON.stringify({ source: url }),
			)
			if (res.data) {
				startPlayHLS(streamRequestHash, url)
			}
		} catch {
			setLoadStreamError(true)
			setTimeout(() => {
				setLoading(false)
			}, 1000)
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
		if (videoPlayer && monitoring.url) {
			startPlayHLS(monitoring.cameraId ?? "", monitoring.url)
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
		addStream,
		startPlayHLS,
		retry,
		setLoading,
		setStreaming,
	}
}
