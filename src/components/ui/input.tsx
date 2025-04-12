import * as React from "react"

import { cva, type VariantProps } from "class-variance-authority"
import { Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"

import { Label } from "./label"

const inputVariants = cva(
	cn(
		"file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-md",
		"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-md focus-visible:outline-none focus-visible:box-shadow-none",
		"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
		"placeholder:font-normal",
	),
	{
		variants: {
			sizeVariant: {
				xs: "h-7 text-xs",
				sm: "h-9 text-sm",
				md: "h-11 text-md",
				lg: "h-13 text-lg",
			},
		},
		defaultVariants: {
			sizeVariant: "md",
		},
	},
)

export type InputVariants = VariantProps<typeof inputVariants>

type IInputProps = React.ComponentProps<"input"> &
	InputVariants & {
		label?: string
		error?: boolean
		helperText?: string
		endAdornment?: React.ReactElement<{ className?: string }>
		startAdornment?: React.ReactElement<{ className?: string }>
	}

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
	({ className, type, startAdornment, endAdornment, error, helperText, label, sizeVariant, ...props }, ref) => {
		const [showPassword, setShowPassword] = React.useState(false)

		const handleClickShowPassword = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
			event.stopPropagation()
			setShowPassword(!showPassword)
		}

		const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
			event.preventDefault()
		}

		const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
			event.preventDefault()
		}

		return (
			<div>
				{label && (
					<div
						className={cn("mb-2 text-md", {
							"mb-1 text-sm": sizeVariant === "sm",
						})}
					>
						<Label>{label}</Label>
					</div>
				)}
				<div
					className={cn("relative flex items-center overflow-hidden", {
						"bg-disabled cursor-not-allowed opacity-50": props.disabled,
						"border-error": error,
					})}
				>
					{startAdornment && (
						<div className="px-3 h-full flex items-center absolute left-1 top-1/2 -translate-y-1/2">
							{React.cloneElement(startAdornment, {
								className: cn(startAdornment.props.className),
							})}
						</div>
					)}

					<input
						ref={ref}
						type={type === "password" ? (showPassword ? "text" : "password") : type}
						data-slot="input"
						className={cn(inputVariants({ sizeVariant }), className, {
							"pl-13": !!startAdornment,
							"pr-10": !!endAdornment,
						})}
						{...props}
					/>

					{endAdornment && (
						<div className="px-3 h-full flex items-center absolute right-1 top-1/2 -translate-y-1/2">
							{React.isValidElement(endAdornment)
								? React.cloneElement(endAdornment, {
										className: cn(endAdornment.props.className),
									})
								: endAdornment}
						</div>
					)}
					{type === "password" && (
						<div className={cn("px-3 h-full flex items-center absolute right-1 top-1/2 -translate-y-1/2")}>
							{showPassword ? (
								<span
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									onMouseUp={handleMouseUpPassword}
									className="cursor-pointer"
								>
									<EyeOff className="h-5 w-5 text-muted-foreground" />
								</span>
							) : (
								<span
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									onMouseUp={handleMouseUpPassword}
									className="cursor-pointer"
								>
									<Eye className="h-5 w-5 text-muted-foreground" />
								</span>
							)}
						</div>
					)}
				</div>
				{helperText && (
					<p
						className={cn("text-xs text-muted-foreground pl-3 py-1", {
							"text-error": error,
						})}
					>
						{helperText}
					</p>
				)}
			</div>
		)
	},
)

Input.displayName = "Input"

export { Input }
