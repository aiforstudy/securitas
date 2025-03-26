import React from "react"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { Lock, Mail } from "lucide-react"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ICurrentUser, useAuth } from "@/contexts/auth.context"

const loginSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
	password: z.string(),
})

type LoginFormValues = z.infer<typeof loginSchema>

const LoginForm: React.FC = () => {
	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	})
	const { login: loginContext } = useAuth()

	const onSubmit = (data: LoginFormValues) => {
		// Validate email is "admin@gmail.com"
		if (data.email === "admin@gmail.com" && data.password === "Abc@123456") {
			const mockUser: ICurrentUser = {
				id: "1",
				role: "SUPER_ADMIN",
				name: "Root",
				email: data.email,
				token: "1234567890",
				company_id: "1",
			}
			loginContext(mockUser)
		} else {
			toast.error("Invalid email or password")
		}
	}

	return (
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
	)
}

export default LoginForm
