import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        "ezai-group/navigation-menu ezai-relative ezai-flex ezai-max-w-max ezai-flex-1 ezai-items-center ezai-justify-center",
        className
      )}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  )
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "ezai-group ezai-flex ezai-flex-1 ezai-list-none ezai-items-center ezai-justify-center ezai-gap-1",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("ezai-relative", className)}
      {...props}
    />
  )
}

const navigationMenuTriggerStyle = cva(
  "ezai-group ezai-inline-flex ezai-h-9 ezai-w-max ezai-items-center ezai-justify-center ezai-rounded-md ezai-bg-background ezai-px-4 ezai-py-2 ezai-text-sm ezai-font-medium hover:ezai-bg-accent hover:ezai-text-accent-foreground focus:ezai-bg-accent focus:ezai-text-accent-foreground disabled:ezai-pointer-events-none disabled:ezai-opacity-50 data-[state=open]:hover:ezai-bg-accent data-[state=open]:ezai-text-accent-foreground data-[state=open]:focus:ezai-bg-accent data-[state=open]:ezai-bg-accent/50 ezai-ring-ring/10 dark:ezai-ring-ring/20 dark:ezai-outline-ring/40 ezai-outline-ring/50 ezai-transition-[color,box-shadow] focus-visible:ezai-ring-4 focus-visible:ezai-outline-1"
)

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "ezai-group", className)}
      {...props}
    >
      {children}{" "}
      <ChevronDownIcon
        className="ezai-relative ezai-top-[1px] ezai-ml-1 ezai-size-3 ezai-transition ezai-duration-300 group-data-[state=open]:ezai-rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "data-[motion^=from-]:ezai-animate-in data-[motion^=to-]:ezai-animate-out data-[motion^=from-]:ezai-fade-in data-[motion^=to-]:ezai-fade-out data-[motion=from-end]:ezai-slide-in-from-right-52 data-[motion=from-start]:ezai-slide-in-from-left-52 data-[motion=to-end]:ezai-slide-out-to-right-52 data-[motion=to-start]:ezai-slide-out-to-left-52 ezai-top-0 ezai-left-0 ezai-w-full ezai-p-2 ezai-pr-2.5 md:ezai-absolute md:ezai-w-auto",
        "ezai-group-data-[viewport=false]/navigation-menu:bg-popover ezai-group-data-[viewport=false]/navigation-menu:text-popover-foreground ezai-group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in ezai-group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out ezai-group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 ezai-group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 ezai-group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 ezai-group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 ezai-group-data-[viewport=false]/navigation-menu:top-full ezai-group-data-[viewport=false]/navigation-menu:mt-1.5 ezai-group-data-[viewport=false]/navigation-menu:overflow-hidden ezai-group-data-[viewport=false]/navigation-menu:rounded-md ezai-group-data-[viewport=false]/navigation-menu:border ezai-group-data-[viewport=false]/navigation-menu:shadow ezai-group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ezai-ring-0 **:data-[slot=navigation-menu-link]:focus:ezai-outline-none",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div
      className={cn(
        "ezai-absolute ezai-top-full ezai-left-0 ezai-isolate ezai-z-50 ezai-flex ezai-justify-center"
      )}
    >
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "ezai-origin-top-center ezai-bg-popover ezai-text-popover-foreground data-[state=open]:ezai-animate-in data-[state=closed]:ezai-animate-out data-[state=closed]:ezai-zoom-out-95 data-[state=open]:ezai-zoom-in-90 ezai-relative ezai-mt-1.5 ezai-h-[var(--radix-navigation-menu-viewport-height)] ezai-w-full ezai-overflow-hidden ezai-rounded-md ezai-border ezai-shadow md:ezai-w-[var(--radix-navigation-menu-viewport-width)]",
          className
        )}
        {...props}
      />
    </div>
  )
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "data-[active=true]:focus:ezai-bg-accent data-[active=true]:hover:ezai-bg-accent data-[active=true]:ezai-bg-accent/50 data-[active=true]:ezai-text-accent-foreground hover:ezai-bg-accent hover:ezai-text-accent-foreground focus:ezai-bg-accent focus:ezai-text-accent-foreground ezai-ring-ring/10 dark:ezai-ring-ring/20 dark:ezai-outline-ring/40 ezai-outline-ring/50 [&_svg:not([class*=text-])]:ezai-text-muted-foreground ezai-flex ezai-flex-col ezai-gap-1 ezai-rounded-sm ezai-p-2 ezai-text-sm ezai-transition-[color,box-shadow] focus-visible:ezai-ring-4 focus-visible:ezai-outline-1 [&_svg:not([class*=size-])]:ezai-size-4",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "data-[state=visible]:ezai-animate-in data-[state=hidden]:ezai-animate-out data-[state=hidden]:ezai-fade-out data-[state=visible]:ezai-fade-in ezai-top-full ezai-z-[1] ezai-flex ezai-h-1.5 ezai-items-end ezai-justify-center ezai-overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="ezai-bg-border ezai-relative ezai-top-[60%] ezai-h-2 ezai-w-2 ezai-rotate-45 ezai-rounded-tl-sm ezai-shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  )
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
}
