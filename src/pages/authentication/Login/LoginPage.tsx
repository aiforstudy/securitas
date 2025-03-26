import React from "react"

import wavyLines from "@/assets/images/wavy-lines.svg"
import { Button } from "@/components/ui/button"

import { LoginForm } from "./_components/LoginForm"

const LoginPage: React.FC = () => {
	return (
		<div className="relative h-full w-full overflow-hidden">
			<div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/10 to-primary/5" />

			<div className="absolute -top-50 -left-50 h-100 w-100 rounded-full bg-primary/30 blur-3xl" />
			<div className="absolute -bottom-50 -right-50 h-100 w-100 rounded-full bg-primary/20 blur-3xl" />

			<div className="absolute inset-0 z-3">
				<img src={wavyLines} alt="Background" className="w-full h-full object-cover opacity-20" />
			</div>

			<div className="relative z-10 h-full w-full p-6 flex items-center justify-center">
				<div className="w-full max-w-lg space-y-6 rounded-lg border border-border bg-background/90 backdrop-blur-md p-8 shadow-sm">
					<div className="space-y-2 text-center">
						<h1 className="text-3xl font-bold">Welcome back</h1>
						<p className="text-muted-foreground">Enter your credentials to sign in to your account</p>
					</div>

					<LoginForm />

					<div className="text-center">
						Don't have an account?{" "}
						<Button type="button" variant="link" className="px-1.5 py-0 h-auto">
							Create account
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginPage
