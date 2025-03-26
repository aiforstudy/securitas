import React, { useRef, useState } from "react"

import { cn } from "@/lib/utils"

import { AspectRatio } from "../ui/aspect-ratio"
import { Skeleton } from "../ui/skeleton"

type IVideoPreviewProps = {
	url: string
}

const VideoPreview: React.FC<IVideoPreviewProps> = ({ url }) => {
	const videoRef = useRef(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)

	return (
		<div className="min-w-[400px] min-h-[400px] max-w-[60vw] max-h-[60vh]">
			{isLoading && (
				<div className="h-full w-full aspect-video">
					<Skeleton className="w-full h-full" />
				</div>
			)}
			<AspectRatio ratio={16 / 9}>
				<video
					ref={videoRef}
					autoPlay
					controls
					className={cn("p-0 m-0 w-full h-full object-cover", {
						hidden: isLoading,
					})}
					onLoadedData={() => setIsLoading(false)}
				>
					<source src={url} type="video/mp4" />
				</video>
			</AspectRatio>
		</div>
	)
}

export default React.memo(VideoPreview)
