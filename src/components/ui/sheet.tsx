import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "data-[state=open]:ezai-animate-in data-[state=closed]:ezai-animate-out data-[state=closed]:ezai-fade-out-0 data-[state=open]:ezai-fade-in-0 ezai-fixed ezai-inset-0 ezai-z-50 ezai-bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "ezai-bg-background data-[state=open]:ezai-animate-in data-[state=closed]:ezai-animate-out ezai-fixed ezai-z-50 ezai-flex ezai-flex-col ezai-gap-4 ezai-shadow-lg ezai-transition ezai-ease-in-out data-[state=closed]:ezai-duration-300 data-[state=open]:ezai-duration-500",
          side === "right" &&
            "data-[state=closed]:ezai-slide-out-to-right data-[state=open]:ezai-slide-in-from-right ezai-inset-y-0 ezai-right-0 ezai-h-full ezai-w-3/4 ezai-border-l sm:ezai-max-w-sm",
          side === "left" &&
            "data-[state=closed]:ezai-slide-out-to-left data-[state=open]:ezai-slide-in-from-left ezai-inset-y-0 ezai-left-0 ezai-h-full ezai-w-3/4 ezai-border-r sm:ezai-max-w-sm",
          side === "top" &&
            "data-[state=closed]:ezai-slide-out-to-top data-[state=open]:ezai-slide-in-from-top ezai-inset-x-0 ezai-top-0 ezai-h-auto ezai-border-b",
          side === "bottom" &&
            "data-[state=closed]:ezai-slide-out-to-bottom data-[state=open]:ezai-slide-in-from-bottom ezai-inset-x-0 ezai-bottom-0 ezai-h-auto ezai-border-t",
          className
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="ezai-ring-offset-background focus:ezai-ring-ring data-[state=open]:ezai-bg-secondary ezai-absolute ezai-top-4 ezai-right-4 ezai-rounded-xs ezai-opacity-70 ezai-transition-opacity hover:ezai-opacity-100 focus:ezai-ring-2 focus:ezai-ring-offset-2 focus:ezai-outline-hidden disabled:ezai-pointer-events-none">
          <XIcon className="ezai-size-4" />
          <span className="ezai-sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("ezai-flex ezai-flex-col ezai-gap-1.5 ezai-p-4", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("ezai-mt-auto ezai-flex ezai-flex-col ezai-gap-2 ezai-p-4", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("ezai-text-foreground ezai-font-semibold", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("ezai-text-muted-foreground ezai-text-sm", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
