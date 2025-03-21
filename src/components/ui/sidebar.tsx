import * as React from "react"

import { Slot } from "@radix-ui/react-slot"
import { cva, VariantProps } from "class-variance-authority"
import { PanelLeftIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useIsMobile } from "@/hooks/useMobile"
import { cn } from "@/lib/utils"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContextProps = {
	state: "expanded" | "collapsed"
	open: boolean
	setOpen: (open: boolean) => void
	openMobile: boolean
	setOpenMobile: (open: boolean) => void
	isMobile: boolean
	toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

function useSidebar() {
	const context = React.useContext(SidebarContext)
	if (!context) {
		throw new Error("useSidebar must be used within a SidebarProvider.")
	}

	return context
}

function SidebarProvider({
	defaultOpen = true,
	open: openProp,
	onOpenChange: setOpenProp,
	className,
	style,
	children,
	...props
}: React.ComponentProps<"div"> & {
	defaultOpen?: boolean
	open?: boolean
	onOpenChange?: (open: boolean) => void
}) {
	const isMobile = useIsMobile()
	const [openMobile, setOpenMobile] = React.useState(false)

	// This is the internal state of the sidebar.
	// We use openProp and setOpenProp for control from outside the component.
	const [_open, _setOpen] = React.useState(defaultOpen)
	const open = openProp ?? _open
	const setOpen = React.useCallback(
		(value: boolean | ((value: boolean) => boolean)) => {
			const openState = typeof value === "function" ? value(open) : value
			if (setOpenProp) {
				setOpenProp(openState)
			} else {
				_setOpen(openState)
			}

			// This sets the cookie to keep the sidebar state.
			document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
		},
		[setOpenProp, open],
	)

	// Helper to toggle the sidebar.
	const toggleSidebar = React.useCallback(() => {
		return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
	}, [isMobile, setOpen, setOpenMobile])

	// Adds a keyboard shortcut to toggle the sidebar.
	React.useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
				event.preventDefault()
				toggleSidebar()
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
	}, [toggleSidebar])

	// We add a state so that we can do data-state="expanded" or "collapsed".
	// This makes it easier to style the sidebar with Tailwind classes.
	const state = open ? "expanded" : "collapsed"

	const contextValue = React.useMemo<SidebarContextProps>(
		() => ({
			state,
			open,
			setOpen,
			isMobile,
			openMobile,
			setOpenMobile,
			toggleSidebar,
		}),
		[state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
	)

	return (
		<SidebarContext.Provider value={contextValue}>
			<TooltipProvider delayDuration={0}>
				<div
					data-slot="sidebar-wrapper"
					style={
						{
							"--sidebar-width": SIDEBAR_WIDTH,
							"--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
							...style,
						} as React.CSSProperties
					}
					className={cn(
						"ezai-group/sidebar-wrapper has-data-[variant=inset]:ezai-bg-sidebar ezai-flex ezai-min-h-svh ezai-w-full",
						className,
					)}
					{...props}
				>
					{children}
				</div>
			</TooltipProvider>
		</SidebarContext.Provider>
	)
}

function Sidebar({
	side = "left",
	variant = "sidebar",
	collapsible = "offcanvas",
	className,
	children,
	...props
}: React.ComponentProps<"div"> & {
	side?: "left" | "right"
	variant?: "sidebar" | "floating" | "inset"
	collapsible?: "offcanvas" | "icon" | "none"
}) {
	const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

	if (collapsible === "none") {
		return (
			<div
				data-slot="sidebar"
				className={cn(
					"ezai-bg-sidebar ezai-text-sidebar-foreground ezai-flex ezai-h-full ezai-w-(--sidebar-width) ezai-flex-col",
					className,
				)}
				{...props}
			>
				{children}
			</div>
		)
	}

	if (isMobile) {
		return (
			<Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
				<SheetContent
					data-sidebar="sidebar"
					data-slot="sidebar"
					data-mobile="true"
					className="ezai-bg-sidebar ezai-text-sidebar-foreground ezai-w-(--sidebar-width) ezai-p-0 [&>button]:ezai-hidden"
					style={
						{
							"--sidebar-width": SIDEBAR_WIDTH_MOBILE,
						} as React.CSSProperties
					}
					side={side}
				>
					<SheetHeader className="ezai-sr-only">
						<SheetTitle>Sidebar</SheetTitle>
						<SheetDescription>Displays the mobile sidebar.</SheetDescription>
					</SheetHeader>
					<div className="ezai-flex ezai-h-full ezai-w-full ezai-flex-col">{children}</div>
				</SheetContent>
			</Sheet>
		)
	}

	return (
		<div
			className="ezai-group ezai-peer ezai-text-sidebar-foreground ezai-hidden md:ezai-block"
			data-state={state}
			data-collapsible={state === "collapsed" ? collapsible : ""}
			data-variant={variant}
			data-side={side}
			data-slot="sidebar"
		>
			{/* This is what handles the sidebar gap on desktop */}
			<div
				data-slot="sidebar-gap"
				className={cn(
					"ezai-relative ezai-w-(--sidebar-width) ezai-bg-transparent ezai-transition-[width] ezai-duration-200 ezai-ease-linear",
					"group-data-[collapsible=offcanvas]:ezai-w-0",
					"group-data-[side=right]:ezai-rotate-180",
					variant === "floating" || variant === "inset"
						? "group-data-[collapsible=icon]:ezai-w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
						: "group-data-[collapsible=icon]:ezai-w-(--sidebar-width-icon)",
				)}
			/>
			<div
				data-slot="sidebar-container"
				className={cn(
					"ezai-fixed ezai-inset-y-0 ezai-z-10 ezai-hidden ezai-h-svh ezai-w-(--sidebar-width) ezai-transition-[left,right,width] ezai-duration-200 ezai-ease-linear md:ezai-flex",
					side === "left"
						? "ezai-left-0 group-data-[collapsible=offcanvas]:ezai-left-[calc(var(--sidebar-width)*-1)]"
						: "ezai-right-0 group-data-[collapsible=offcanvas]:ezai-right-[calc(var(--sidebar-width)*-1)]",
					// Adjust the padding for floating and inset variants.
					variant === "floating" || variant === "inset"
						? "ezai-p-2 group-data-[collapsible=icon]:ezai-w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
						: "group-data-[collapsible=icon]:ezai-w-(--sidebar-width-icon) group-data-[side=left]:ezai-border-r group-data-[side=right]:ezai-border-l",
					className,
				)}
				{...props}
			>
				<div
					data-sidebar="sidebar"
					data-slot="sidebar-inner"
					className="ezai-bg-sidebar group-data-[variant=floating]:ezai-border-sidebar-border ezai-flex ezai-h-full ezai-w-full ezai-flex-col group-data-[variant=floating]:ezai-rounded-lg group-data-[variant=floating]:ezai-border group-data-[variant=floating]:ezai-shadow-sm"
				>
					{children}
				</div>
			</div>
		</div>
	)
}

function SidebarTrigger({ className, onClick, ...props }: React.ComponentProps<typeof Button>) {
	const { toggleSidebar } = useSidebar()

	return (
		<Button
			data-sidebar="trigger"
			data-slot="sidebar-trigger"
			variant="ghost"
			size="icon"
			className={cn("ezai-size-7", className)}
			onClick={(event) => {
				onClick?.(event)
				toggleSidebar()
			}}
			{...props}
		>
			<PanelLeftIcon />
			<span className="ezai-sr-only">Toggle Sidebar</span>
		</Button>
	)
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
	const { toggleSidebar } = useSidebar()

	return (
		<button
			data-sidebar="rail"
			data-slot="sidebar-rail"
			aria-label="Toggle Sidebar"
			tabIndex={-1}
			onClick={toggleSidebar}
			title="Toggle Sidebar"
			className={cn(
				"hover:after:ezai-bg-sidebar-border ezai-absolute ezai-inset-y-0 ezai-z-20 ezai-hidden ezai-w-4 ezai--translate-x-1/2 ezai-transition-all ezai-ease-linear group-data-[side=left]:ezai--right-4 group-data-[side=right]:ezai-left-0 after:ezai-absolute after:ezai-inset-y-0 after:ezai-left-1/2 after:ezai-w-[2px] sm:ezai-flex",
				"in-data-[side=left]:ezai-cursor-w-resize in-data-[side=right]:ezai-cursor-e-resize",
				"[[data-side=left][data-state=collapsed]_&]:ezai-cursor-e-resize [[data-side=right][data-state=collapsed]_&]:ezai-cursor-w-resize",
				"hover:group-data-[collapsible=offcanvas]:ezai-bg-sidebar group-data-[collapsible=offcanvas]:ezai-translate-x-0 group-data-[collapsible=offcanvas]:after:ezai-left-full",
				"[[data-side=left][data-collapsible=offcanvas]_&]:ezai--right-2",
				"[[data-side=right][data-collapsible=offcanvas]_&]:ezai--left-2",
				className,
			)}
			{...props}
		/>
	)
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
	return (
		<main
			data-slot="sidebar-inset"
			className={cn(
				"ezai-bg-background ezai-relative ezai-flex ezai-w-full ezai-flex-1 ezai-flex-col",
				"md:peer-data-[variant=inset]:ezai-m-2 md:peer-data-[variant=inset]:ezai-ml-0 md:peer-data-[variant=inset]:ezai-rounded-xl md:peer-data-[variant=inset]:ezai-shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ezai-ml-2",
				className,
			)}
			{...props}
		/>
	)
}

function SidebarInput({ className, ...props }: React.ComponentProps<typeof Input>) {
	return (
		<Input
			data-slot="sidebar-input"
			data-sidebar="input"
			className={cn("ezai-bg-background ezai-h-8 ezai-w-full ezai-shadow-none", className)}
			{...props}
		/>
	)
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-header"
			data-sidebar="header"
			className={cn("ezai-flex ezai-flex-col ezai-gap-2 ezai-p-2", className)}
			{...props}
		/>
	)
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-footer"
			data-sidebar="footer"
			className={cn("ezai-flex ezai-flex-col ezai-gap-2 ezai-p-2", className)}
			{...props}
		/>
	)
}

function SidebarSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
	return (
		<Separator
			data-slot="sidebar-separator"
			data-sidebar="separator"
			className={cn("ezai-bg-sidebar-border ezai-mx-2 ezai-w-auto", className)}
			{...props}
		/>
	)
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-content"
			data-sidebar="content"
			className={cn(
				"ezai-flex ezai-min-h-0 ezai-flex-1 ezai-flex-col ezai-gap-2 ezai-overflow-auto group-data-[collapsible=icon]:ezai-overflow-hidden",
				className,
			)}
			{...props}
		/>
	)
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-group"
			data-sidebar="group"
			className={cn("ezai-relative ezai-flex ezai-w-full ezai-min-w-0 ezai-flex-col ezai-p-2", className)}
			{...props}
		/>
	)
}

function SidebarGroupLabel({
	className,
	asChild = false,
	...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : "div"

	return (
		<Comp
			data-slot="sidebar-group-label"
			data-sidebar="group-label"
			className={cn(
				"ezai-text-sidebar-foreground/70 ezai-ring-sidebar-ring ezai-flex ezai-h-8 ezai-shrink-0 ezai-items-center ezai-rounded-md ezai-px-2 ezai-text-xs ezai-font-medium ezai-outline-hidden ezai-transition-[margin,opacity] ezai-duration-200 ezai-ease-linear focus-visible:ezai-ring-2 [&>svg]:ezai-size-4 [&>svg]:ezai-shrink-0",
				"group-data-[collapsible=icon]:ezai--mt-8 group-data-[collapsible=icon]:ezai-opacity-0",
				className,
			)}
			{...props}
		/>
	)
}

function SidebarGroupAction({
	className,
	asChild = false,
	...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : "button"

	return (
		<Comp
			data-slot="sidebar-group-action"
			data-sidebar="group-action"
			className={cn(
				"ezai-text-sidebar-foreground ezai-ring-sidebar-ring hover:ezai-bg-sidebar-accent hover:ezai-text-sidebar-accent-foreground ezai-absolute ezai-top-3.5 ezai-right-3 ezai-flex ezai-aspect-square ezai-w-5 ezai-items-center ezai-justify-center ezai-rounded-md ezai-p-0 ezai-outline-hidden ezai-transition-transform focus-visible:ezai-ring-2 [&>svg]:ezai-size-4 [&>svg]:ezai-shrink-0",
				// Increases the hit area of the button on mobile.
				"after:ezai-absolute after:ezai--inset-2 md:after:ezai-hidden",
				"group-data-[collapsible=icon]:ezai-hidden",
				className,
			)}
			{...props}
		/>
	)
}

function SidebarGroupContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-group-content"
			data-sidebar="group-content"
			className={cn("ezai-w-full ezai-text-sm", className)}
			{...props}
		/>
	)
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
	return (
		<ul
			data-slot="sidebar-menu"
			data-sidebar="menu"
			className={cn("ezai-flex ezai-w-full ezai-min-w-0 ezai-flex-col ezai-gap-1", className)}
			{...props}
		/>
	)
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
	return (
		<li
			data-slot="sidebar-menu-item"
			data-sidebar="menu-item"
			className={cn("ezai-group/menu-item ezai-relative", className)}
			{...props}
		/>
	)
}

const sidebarMenuButtonVariants = cva(
	"ezai-peer/menu-button ezai-flex ezai-w-full ezai-items-center ezai-gap-2 ezai-overflow-hidden ezai-rounded-md ezai-p-2 ezai-text-left ezai-text-sm ezai-outline-hidden ezai-ring-sidebar-ring ezai-transition-[width,height,padding] hover:ezai-bg-sidebar-accent hover:ezai-text-sidebar-accent-foreground focus-visible:ezai-ring-2 active:ezai-bg-sidebar-accent active:ezai-text-sidebar-accent-foreground disabled:ezai-pointer-events-none disabled:ezai-opacity-50 ezai-group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:ezai-pointer-events-none aria-disabled:ezai-opacity-50 data-[active=true]:ezai-bg-sidebar-accent data-[active=true]:ezai-font-medium data-[active=true]:ezai-text-sidebar-accent-foreground data-[state=open]:hover:ezai-bg-sidebar-accent data-[state=open]:hover:ezai-text-sidebar-accent-foreground group-data-[collapsible=icon]:ezai-size-8! group-data-[collapsible=icon]:ezai-p-2! [&>span:last-child]:ezai-truncate [&>svg]:ezai-size-4 [&>svg]:ezai-shrink-0",
	{
		variants: {
			variant: {
				default: "hover:ezai-bg-sidebar-accent hover:ezai-text-sidebar-accent-foreground",
				outline:
					"ezai-bg-background ezai-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:ezai-bg-sidebar-accent hover:ezai-text-sidebar-accent-foreground hover:ezai-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
			},
			size: {
				default: "ezai-h-8 ezai-text-sm",
				sm: "ezai-h-7 ezai-text-xs",
				lg: "ezai-h-12 ezai-text-sm group-data-[collapsible=icon]:ezai-p-0!",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
)

function SidebarMenuButton({
	asChild = false,
	isActive = false,
	variant = "default",
	size = "default",
	tooltip,
	className,
	...props
}: React.ComponentProps<"button"> & {
	asChild?: boolean
	isActive?: boolean
	tooltip?: string | React.ComponentProps<typeof TooltipContent>
} & VariantProps<typeof sidebarMenuButtonVariants>) {
	const Comp = asChild ? Slot : "button"
	const { isMobile, state } = useSidebar()

	const button = (
		<Comp
			data-slot="sidebar-menu-button"
			data-sidebar="menu-button"
			data-size={size}
			data-active={isActive}
			className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
			{...props}
		/>
	)

	if (!tooltip) {
		return button
	}

	if (typeof tooltip === "string") {
		tooltip = {
			children: tooltip,
		}
	}

	return (
		<Tooltip>
			<TooltipTrigger asChild>{button}</TooltipTrigger>
			<TooltipContent side="right" align="center" hidden={state !== "collapsed" || isMobile} {...tooltip} />
		</Tooltip>
	)
}

function SidebarMenuAction({
	className,
	asChild = false,
	showOnHover = false,
	...props
}: React.ComponentProps<"button"> & {
	asChild?: boolean
	showOnHover?: boolean
}) {
	const Comp = asChild ? Slot : "button"

	return (
		<Comp
			data-slot="sidebar-menu-action"
			data-sidebar="menu-action"
			className={cn(
				"ezai-text-sidebar-foreground ezai-ring-sidebar-ring hover:ezai-bg-sidebar-accent hover:ezai-text-sidebar-accent-foreground ezai-peer-hover/menu-button:text-sidebar-accent-foreground ezai-absolute ezai-top-1.5 ezai-right-1 ezai-flex ezai-aspect-square ezai-w-5 ezai-items-center ezai-justify-center ezai-rounded-md ezai-p-0 ezai-outline-hidden ezai-transition-transform focus-visible:ezai-ring-2 [&>svg]:ezai-size-4 [&>svg]:ezai-shrink-0",
				// Increases the hit area of the button on mobile.
				"after:ezai-absolute after:ezai--inset-2 md:after:ezai-hidden",
				"ezai-peer-data-[size=sm]/menu-button:top-1",
				"ezai-peer-data-[size=default]/menu-button:top-1.5",
				"ezai-peer-data-[size=lg]/menu-button:top-2.5",
				"group-data-[collapsible=icon]:ezai-hidden",
				showOnHover &&
					"ezai-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground ezai-group-focus-within/menu-item:opacity-100 ezai-group-hover/menu-item:opacity-100 data-[state=open]:ezai-opacity-100 md:ezai-opacity-0",
				className,
			)}
			{...props}
		/>
	)
}

function SidebarMenuBadge({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-menu-badge"
			data-sidebar="menu-badge"
			className={cn(
				"ezai-text-sidebar-foreground ezai-pointer-events-none ezai-absolute ezai-right-1 ezai-flex ezai-h-5 ezai-min-w-5 ezai-items-center ezai-justify-center ezai-rounded-md ezai-px-1 ezai-text-xs ezai-font-medium ezai-tabular-nums ezai-select-none",
				"ezai-peer-hover/menu-button:text-sidebar-accent-foreground ezai-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
				"ezai-peer-data-[size=sm]/menu-button:top-1",
				"ezai-peer-data-[size=default]/menu-button:top-1.5",
				"ezai-peer-data-[size=lg]/menu-button:top-2.5",
				"group-data-[collapsible=icon]:ezai-hidden",
				className,
			)}
			{...props}
		/>
	)
}

function SidebarMenuSkeleton({
	className,
	showIcon = false,
	...props
}: React.ComponentProps<"div"> & {
	showIcon?: boolean
}) {
	// Random width between 50 to 90%.
	const width = React.useMemo(() => {
		return `${Math.floor(Math.random() * 40) + 50}%`
	}, [])

	return (
		<div
			data-slot="sidebar-menu-skeleton"
			data-sidebar="menu-skeleton"
			className={cn("ezai-flex ezai-h-8 ezai-items-center ezai-gap-2 ezai-rounded-md ezai-px-2", className)}
			{...props}
		>
			{showIcon && <Skeleton className="ezai-size-4 ezai-rounded-md" data-sidebar="menu-skeleton-icon" />}
			<Skeleton
				className="ezai-h-4 ezai-max-w-(--skeleton-width) ezai-flex-1"
				data-sidebar="menu-skeleton-text"
				style={
					{
						"--skeleton-width": width,
					} as React.CSSProperties
				}
			/>
		</div>
	)
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
	return (
		<ul
			data-slot="sidebar-menu-sub"
			data-sidebar="menu-sub"
			className={cn(
				"ezai-border-sidebar-border ezai-mx-3.5 ezai-flex ezai-min-w-0 ezai-translate-x-px ezai-flex-col ezai-gap-1 ezai-border-l ezai-px-2.5 ezai-py-0.5",
				"group-data-[collapsible=icon]:ezai-hidden",
				className,
			)}
			{...props}
		/>
	)
}

function SidebarMenuSubItem({ className, ...props }: React.ComponentProps<"li">) {
	return (
		<li
			data-slot="sidebar-menu-sub-item"
			data-sidebar="menu-sub-item"
			className={cn("ezai-group/menu-sub-item ezai-relative", className)}
			{...props}
		/>
	)
}

function SidebarMenuSubButton({
	asChild = false,
	size = "md",
	isActive = false,
	className,
	...props
}: React.ComponentProps<"a"> & {
	asChild?: boolean
	size?: "sm" | "md"
	isActive?: boolean
}) {
	const Comp = asChild ? Slot : "a"

	return (
		<Comp
			data-slot="sidebar-menu-sub-button"
			data-sidebar="menu-sub-button"
			data-size={size}
			data-active={isActive}
			className={cn(
				"ezai-text-sidebar-foreground ezai-ring-sidebar-ring hover:ezai-bg-sidebar-accent hover:ezai-text-sidebar-accent-foreground active:ezai-bg-sidebar-accent active:ezai-text-sidebar-accent-foreground [&>svg]:ezai-text-sidebar-accent-foreground ezai-flex ezai-h-7 ezai-min-w-0 ezai--translate-x-px ezai-items-center ezai-gap-2 ezai-overflow-hidden ezai-rounded-md ezai-px-2 ezai-outline-hidden focus-visible:ezai-ring-2 disabled:ezai-pointer-events-none disabled:ezai-opacity-50 aria-disabled:ezai-pointer-events-none aria-disabled:ezai-opacity-50 [&>span:last-child]:ezai-truncate [&>svg]:ezai-size-4 [&>svg]:ezai-shrink-0",
				"data-[active=true]:ezai-bg-sidebar-accent data-[active=true]:ezai-text-sidebar-accent-foreground",
				size === "sm" && "ezai-text-xs",
				size === "md" && "ezai-text-sm",
				"group-data-[collapsible=icon]:ezai-hidden",
				className,
			)}
			{...props}
		/>
	)
}

export {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupAction,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInput,
	SidebarInset,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSkeleton,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider,
	SidebarRail,
	SidebarSeparator,
	SidebarTrigger,
	useSidebar,
}
