import { useNavigate } from "react-router-dom"

import { FileQuestion } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const NotFoundPage = () => {
	const navigate = useNavigate()

	return (
		<div className="flex items-center justify-center min-h-[80vh]">
			<Card className="w-full max-w-[500px] p-8">
				<div className="flex flex-col items-center text-center space-y-6">
					<div className="rounded-full bg-muted p-4">
						<FileQuestion className="size-12 text-muted-foreground" />
					</div>

					<div className="space-y-3">
						<h1 className="text-3xl font-semibold tracking-tight">Page Not Found</h1>
						<p className="text-lg">Oops! The page you're looking for doesn't exist.</p>
						<p className="text-md text-muted-foreground/80">
							The page might have been moved, deleted, or never existed. Please check the URL and try again.
						</p>
					</div>

					<div className="flex gap-3">
						<Button variant="outline" onClick={() => navigate(-1)} className="mt-6">
							Go Back
						</Button>
						<Button variant="default" onClick={() => navigate("/")} className="mt-6">
							Go to Home
						</Button>
					</div>
				</div>
			</Card>
		</div>
	)
}

export default NotFoundPage
