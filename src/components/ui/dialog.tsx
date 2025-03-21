"use client"

import * as React from "react"

import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
	return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
	return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
	return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
	return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

const DialogOverlay = React.forwardRef<
	React.ComponentRef<typeof DialogPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => {
	return (
		<DialogPrimitive.Overlay
			ref={ref}
			data-slot="dialog-overlay"
			className={cn(
				"data-[state=open]:ezai-animate-in data-[state=closed]:ezai-animate-out data-[state=closed]:ezai-fade-out-0 data-[state=open]:ezai-fade-in-0 ezai-fixed ezai-inset-0 ezai-z-50 ezai-bg-black/50",
				className,
			)}
			{...props}
		/>
	)
})

const DialogContent = React.forwardRef<
	React.ComponentRef<typeof DialogPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
		disableClose?: boolean
		hideCloseButton?: boolean
		onIconCloseClick?: () => void
	}
>(({ className, children, hideCloseButton, disableClose, onIconCloseClick, ...props }, ref) => {
	return (
		<DialogPortal data-slot="dialog-portal">
			<DialogOverlay />
			<DialogPrimitive.Content
				ref={ref}
				data-slot="dialog-content"
				className={cn(
					"ezai-bg-background data-[state=open]:ezai-animate-in data-[state=closed]:ezai-animate-out data-[state=closed]:ezai-fade-out-0 data-[state=open]:ezai-fade-in-0 data-[state=closed]:ezai-zoom-out-95 data-[state=open]:ezai-zoom-in-95 ezai-fixed ezai-top-[50%] ezai-left-[50%] ezai-z-50 ezai-grid ezai-w-full ezai-max-w-[calc(100%-2rem)] ezai-translate-x-[-50%] ezai-translate-y-[-50%] ezai-gap-4 ezai-rounded-lg ezai-border ezai-p-6 ezai-shadow-lg ezai-duration-200 sm:ezai-max-w-lg",
					className,
				)}
				{...props}
			>
				{children}
				{!hideCloseButton && !disableClose && (
					<DialogPrimitive.Close className="ezai-ring-offset-background focus:ezai-ring-ring data-[state=open]:ezai-bg-accent data-[state=open]:ezai-text-muted-foreground ezai-absolute ezai-top-4 ezai-right-4 ezai-rounded-xs ezai-opacity-70 ezai-transition-opacity hover:ezai-opacity-100 focus:ezai-ring-2 focus:ezai-ring-offset-2 focus:ezai-outline-hidden disabled:ezai-pointer-events-none [&_svg]:ezai-pointer-events-none [&_svg]:ezai-shrink-0 [&_svg:not([class*=size-])]:ezai-size-4">
						<XIcon />
						<span className="ezai-sr-only">Close</span>
					</DialogPrimitive.Close>
				)}
				{disableClose && (
					<div
						style={{ boxShadow: "0px 2px 4px 0px #00000026" }}
						onClick={onIconCloseClick}
						className="absolute right-4 top-4  opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground cursor-pointer w-6 h-6 flex items-center justify-center rounded-[5px]"
					>
						<XIcon className="h-5 w-5" />
					</div>
				)}
			</DialogPrimitive.Content>
		</DialogPortal>
	)
})

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="dialog-header"
			className={cn("ezai-flex ezai-flex-col ezai-gap-2 ezai-text-center sm:ezai-text-left", className)}
			{...props}
		/>
	)
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="dialog-footer"
			className={cn("ezai-flex ezai-flex-col-reverse ezai-gap-2 sm:ezai-flex-row sm:ezai-justify-end", className)}
			{...props}
		/>
	)
}

const DialogTitle = React.forwardRef<
	React.ComponentRef<typeof DialogPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => {
	return (
		<DialogPrimitive.Title
			ref={ref}
			data-slot="dialog-title"
			className={cn("ezai-text-lg ezai-leading-none ezai-font-semibold", className)}
			{...props}
		/>
	)
})

const DialogDescription = React.forwardRef<
	React.ComponentRef<typeof DialogPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => {
	return (
		<DialogPrimitive.Description
			ref={ref}
			data-slot="dialog-description"
			className={cn("ezai-text-muted-foreground ezai-text-sm", className)}
			{...props}
		/>
	)
})

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
}
