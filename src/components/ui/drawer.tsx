import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

function Drawer({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}

function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "data-[state=open]:ezai-animate-in data-[state=closed]:ezai-animate-out data-[state=closed]:ezai-fade-out-0 data-[state=open]:ezai-fade-in-0 ezai-fixed ezai-inset-0 ezai-z-50 ezai-bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "ezai-group/drawer-content ezai-bg-background ezai-fixed ezai-z-50 ezai-flex ezai-h-auto ezai-flex-col",
          "data-[vaul-drawer-direction=top]:ezai-inset-x-0 data-[vaul-drawer-direction=top]:ezai-top-0 data-[vaul-drawer-direction=top]:ezai-mb-24 data-[vaul-drawer-direction=top]:ezai-max-h-[80vh] data-[vaul-drawer-direction=top]:ezai-rounded-b-lg data-[vaul-drawer-direction=top]:ezai-border-b",
          "data-[vaul-drawer-direction=bottom]:ezai-inset-x-0 data-[vaul-drawer-direction=bottom]:ezai-bottom-0 data-[vaul-drawer-direction=bottom]:ezai-mt-24 data-[vaul-drawer-direction=bottom]:ezai-max-h-[80vh] data-[vaul-drawer-direction=bottom]:ezai-rounded-t-lg data-[vaul-drawer-direction=bottom]:ezai-border-t",
          "data-[vaul-drawer-direction=right]:ezai-inset-y-0 data-[vaul-drawer-direction=right]:ezai-right-0 data-[vaul-drawer-direction=right]:ezai-w-3/4 data-[vaul-drawer-direction=right]:ezai-border-l data-[vaul-drawer-direction=right]:sm:ezai-max-w-sm",
          "data-[vaul-drawer-direction=left]:ezai-inset-y-0 data-[vaul-drawer-direction=left]:ezai-left-0 data-[vaul-drawer-direction=left]:ezai-w-3/4 data-[vaul-drawer-direction=left]:ezai-border-r data-[vaul-drawer-direction=left]:sm:ezai-max-w-sm",
          className
        )}
        {...props}
      >
        <div className="ezai-bg-muted ezai-mx-auto ezai-mt-4 ezai-hidden ezai-h-2 ezai-w-[100px] ezai-shrink-0 ezai-rounded-full ezai-group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("ezai-flex ezai-flex-col ezai-gap-1.5 ezai-p-4", className)}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("ezai-mt-auto ezai-flex ezai-flex-col ezai-gap-2 ezai-p-4", className)}
      {...props}
    />
  )
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("ezai-text-foreground ezai-font-semibold", className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("ezai-text-muted-foreground ezai-text-sm", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
