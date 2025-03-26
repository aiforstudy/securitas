import { Download } from "lucide-react"

import { AspectRatio } from "../ui/aspect-ratio"
import { Button } from "../ui/button"

type IImagePreviewProps = {
	url: string
}

const ImagePreview: React.FC<IImagePreviewProps> = ({ url }) => {
	return (
		<div className="min-w-[400px] min-h-[400px] max-w-[60vw] max-h-[60vh]">
			<AspectRatio ratio={16 / 9}>
				<img src={url} />
			</AspectRatio>
			<div className="flex justify-end">
				<Button variant="link" color="primary" className="mt-4">
					<Download />
					<a style={{ textDecoration: "none !important" }} href={url} target="_blank" rel="noopener noreferrer">
						Download
					</a>
				</Button>
			</div>
		</div>
	)
}

export default ImagePreview
