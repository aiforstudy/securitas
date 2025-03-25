import React, { useRef, useState } from "react"

import { Play } from "lucide-react"

import { cn } from "@/lib/utils"

import useResizeObserver from "../../hooks/useResizeObserver"

type VideoPresentProps = React.HTMLProps<HTMLVideoElement> & {
	src: string
	getDuration?: (value: number) => void
	onClickPlay?: () => void
}

const VideoPresent: React.FC<VideoPresentProps> = ({ src, width, getDuration, onClickPlay, ...rest }) => {
	const videoRef = useRef<HTMLVideoElement>(null)
	const { ref, dimensions } = useResizeObserver()
	const [isLoading, setIsLoading] = useState<boolean>(true)

	return (
		<div
			ref={ref}
			onClick={onClickPlay}
			className={cn(
				`relative w-[${width}px] h-[${(dimensions.width * 6) / 9}px] bg-[rgba(0,0,0,0.1)] flex justify-center items-center`,
				{
					"cursor-pointer": !!onClickPlay,
				},
			)}
		>
			{src && (
				<video
					ref={videoRef}
					preload="metadata"
					className={cn("p-0 m-0 w-full h-full object-cover", {
						display: isLoading ? "none" : "block",
					})}
					onLoadedData={() => {
						setIsLoading(false)
						getDuration?.(videoRef?.current?.duration || 0)
					}}
					{...rest}
				>
					<source src={src} />
				</video>
			)}
			{onClickPlay && (
				<div className={`absolute w-full h-full flex justify-center items-center bg-black/50`}>
					<Play className={`text-white w-[${dimensions.height / 3}px] h-[${dimensions.height / 3}px]`} />
				</div>
			)}
		</div>
	)
}

export default React.memo(VideoPresent)
