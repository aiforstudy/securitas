import { useNavigate } from "react-router-dom"

import { Construction } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const ComingSoonPage = () => {
	const navigate = useNavigate()

	return (
		<div className="flex items-center justify-center min-h-[80vh]">
			<Card className="w-full max-w-[500px] p-8">
				<div className="flex flex-col items-center text-center space-y-6">
					<div className="rounded-full bg-primary/10 p-4">
						<Construction className="size-12 text-primary" />
					</div>

					<div className="space-y-3">
						<h1 className="text-3xl font-semibold tracking-tight">Coming Soon</h1>
						<p className="text-lg">We're working hard to bring you something amazing.</p>
						<p className="text-md text-muted-foreground/80">
							This feature is currently in development and will be available soon. Please check back later for updates.
						</p>
					</div>

					<Button variant="outline" size="lg" onClick={() => navigate(-1)} className="mt-6">
						Go Back
					</Button>
				</div>
			</Card>
		</div>
	)
}

export default ComingSoonPage
