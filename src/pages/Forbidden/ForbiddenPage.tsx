import { useNavigate } from "react-router-dom"

import { ShieldX } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const ForbiddenPage = () => {
	const navigate = useNavigate()

	return (
		<div className="flex items-center justify-center min-h-[80vh]">
			<Card className="w-full max-w-[500px] p-8">
				<div className="flex flex-col items-center text-center space-y-6">
					<div className="rounded-full bg-destructive/10 p-4">
						<ShieldX className="size-12 text-destructive" />
					</div>

					<div className="space-y-3">
						<h1 className="text-3xl font-semibold tracking-tight">Access Denied</h1>
						<p className="text-lg">You don't have permission to access this page.</p>
						<p className="text-md text-muted-foreground/80">
							Please contact your administrator if you believe this is a mistake or need additional access rights.
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

export default ForbiddenPage
