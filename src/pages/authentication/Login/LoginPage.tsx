import React from "react"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { Lock, Mail } from "lucide-react"
import { z } from "zod"

import wavyLines from "@/assets/images/wavy-lines.svg"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ICurrentUser, useAuth } from "@/contexts/auth.context"

const loginSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
	password: z.string().min(8, "Password must be at least 8 characters"),
})

type LoginFormValues = z.infer<typeof loginSchema>

const LoginPage: React.FC = () => {
	const { login: loginContext } = useAuth()
	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	})

	const onSubmit = (data: LoginFormValues) => {
		const mockUser: ICurrentUser = {
			id: "1",
			name: "John Doe",
			email: data.email,
			token: "1234567890",
			company_id: "1",
		}
		loginContext(mockUser)
	}

	return (
		<div className="relative h-full w-full overflow-hidden">
			<div className="absolute inset-0 z-0 bg-primary/15 w-full h-full">
				<img src={wavyLines} alt="Background" className="w-full h-full object-contain" />
			</div>

			<div className="relative z-10 h-full w-full flex items-center justify-center">
				<div className="w-full max-w-lg space-y-6 rounded-lg border border-border bg-background/80 backdrop-blur-sm p-8 shadow-sm">
					<div className="space-y-2 text-center">
						<h1 className="text-3xl font-bold">Welcome back</h1>
						<p className="text-muted-foreground">Enter your credentials to sign in to your account</p>
					</div>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem className="mb-5">
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												startAdornment={<Mail className="h-5 w-5 text-muted-foreground" />}
												placeholder="your.email@example.com"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem className="mb-4">
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												startAdornment={<Lock className="h-5 w-5 text-muted-foreground" />}
												type="password"
												placeholder="••••••••"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="flex justify-end">
								<Button type="button" variant="link" className="px-0">
									Forgot your password?
								</Button>
							</div>

							<Button type="submit" className="w-full">
								Sign In
							</Button>
						</form>
					</Form>

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
