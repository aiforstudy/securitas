import { memo } from "react"

import { Cctv, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DEFAULT_STREAM } from "@/constants/stream"

type IStreamingCameraProps = {
	viewOnly?: boolean
	onAddCamera: () => void
	streamingInfo: typeof DEFAULT_STREAM
}

const StreamingCamera: React.FC<IStreamingCameraProps> = ({ viewOnly, onAddCamera, streamingInfo }) => {
	return (
		<div className="w-full h-full flex items-center justify-center relative">
			{streamingInfo.streamID && !viewOnly && (
				<Button variant="outline" size="xs" className="absolute top-0 right-0">
					<X className="w-5 h-5" />
				</Button>
			)}
			<div>
				<Button onClick={onAddCamera} variant="ghost">
					<Cctv className="w-5 h-5" /> Add camera
				</Button>
			</div>
		</div>
	)
}

export default memo(StreamingCamera)
