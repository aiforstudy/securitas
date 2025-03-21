import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("ezai-relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="ezai-ring-ring/10 dark:ezai-ring-ring/20 dark:ezai-outline-ring/40 ezai-outline-ring/50 ezai-size-full ezai-rounded-[inherit] ezai-transition-[color,box-shadow] focus-visible:ezai-ring-4 focus-visible:ezai-outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "ezai-flex ezai-touch-none ezai-p-px ezai-transition-colors ezai-select-none",
        orientation === "vertical" &&
          "ezai-h-full ezai-w-2.5 ezai-border-l ezai-border-l-transparent",
        orientation === "horizontal" &&
          "ezai-h-2.5 ezai-flex-col ezai-border-t ezai-border-t-transparent",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="ezai-bg-border ezai-relative ezai-flex-1 ezai-rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
