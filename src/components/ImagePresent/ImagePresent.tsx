import React from "react"

import { cn } from "@/lib/utils"

import useResizeObserver from "../../hooks/useResizeObserver"

type IImagePresentProps = React.HTMLProps<HTMLImageElement> & {
	src: string
	onClickPlay?: () => void
}

const ImagePresent: React.FC<IImagePresentProps> = ({ src, onClickPlay, width, ...rest }) => {
	const { ref, dimensions } = useResizeObserver()

	return (
		<div
			ref={ref}
			onClick={onClickPlay}
			className={cn(`relative w-[${width}px] h-[${(dimensions.width * 6) / 9}px]`, {
				"cursor-pointer": !!onClickPlay,
			})}
		>
			{!src ? (
				<div className="w-full h-full bg-gray-100" />
			) : (
				<img src={src} style={{ width: "100%", height: "100%", objectFit: "cover" }} {...rest} />
			)}
		</div>
	)
}

export default React.memo(ImagePresent)
