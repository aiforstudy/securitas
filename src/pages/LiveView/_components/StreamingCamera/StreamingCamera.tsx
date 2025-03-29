import { memo, useEffect } from "react"

import { Cctv, Info, LoaderCircle, X } from "lucide-react"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { useStreaming } from "@/hooks/useStreaming"
import { IStreamingCamera } from "@/types/liveView"

type IStreamingCameraProps = {
	viewOnly?: boolean
	onAddCamera: () => void
	streamingInfo: IStreamingCamera
}

const StreamingCamera: React.FC<IStreamingCameraProps> = ({ viewOnly, onAddCamera, streamingInfo }) => {
	const {
		hlsRef,
		loading,
		streaming,
		hlsPlayer,
		videoPlayer,
		cancelSourceRef,
		loadStreamError,
		retry,
		// setLoading,
		startPlayHLS,
		// setStreaming,
		setVideoPlayer,
	} = useStreaming()

	useEffect(() => {
		return () => {
			cancelSourceRef.current?.cancel()
			hlsRef.current?.stopLoad()
			hlsRef.current?.destroy()
		}
	}, [cancelSourceRef, hlsRef])

	useEffect(() => {
		if (videoPlayer && streamingInfo.url) {
			startPlayHLS(streamingInfo.cameraId ?? "", streamingInfo.url)
		} else {
			if (hlsPlayer) {
				hlsPlayer.stopLoad()
				hlsPlayer.destroy()
			}
		}
	}, [streamingInfo.cameraId, streamingInfo.url, videoPlayer])

	return (
		<div className="w-full h-full flex items-center justify-center relative">
			{streamingInfo.cameraId && !viewOnly && (
				<Button variant="outline" size="xs" className="absolute top-0 right-0">
					<X className="w-5 h-5" />
				</Button>
			)}
			{!streamingInfo.cameraId && !loading && !streaming && (
				<div>
					<Button onClick={onAddCamera} variant="ghost">
						<Cctv className="w-5 h-5" /> Add camera
					</Button>
				</div>
			)}
			{streamingInfo.cameraId && (
				<div className="flex w-full h-full relative items-center justify-center p-2">
					{loadStreamError && !loading && (
						<div className="bg-gray-300 flex flex-col justify-center w-full h-full absolute top-0 left-0 z-20">
							<div className="flex flex-col items-center">
								<Info className="w-10 h-10 text-white" />
								<div className="mt-2 text-white">Failed to load media</div>
								{!viewOnly && (
									<Button
										onClick={() => retry(streamingInfo)}
										variant="outline"
										className="border-white text-white w-28"
									>
										Retry
									</Button>
								)}
							</div>
						</div>
					)}

					{loading && (
						<div className="flex items-center justify-center absolute w-full h-full bg-gray-300">
							<LoaderCircle className="w-10 h-10 text-white animate-spin" />
						</div>
					)}
					<AspectRatio ratio={16 / 9}>
						<video ref={(el) => setVideoPlayer(el)} muted autoPlay playsInline />
					</AspectRatio>
				</div>
			)}
		</div>
	)
}

export default memo(StreamingCamera)
