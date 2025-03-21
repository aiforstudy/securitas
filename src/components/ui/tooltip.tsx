import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "ezai-bg-primary ezai-text-primary-foreground ezai-animate-in ezai-fade-in-0 ezai-zoom-in-95 data-[state=closed]:ezai-animate-out data-[state=closed]:ezai-fade-out-0 data-[state=closed]:ezai-zoom-out-95 data-[side=bottom]:ezai-slide-in-from-top-2 data-[side=left]:ezai-slide-in-from-right-2 data-[side=right]:ezai-slide-in-from-left-2 data-[side=top]:ezai-slide-in-from-bottom-2 ezai-z-50 ezai-w-fit ezai-origin-(--radix-tooltip-content-transform-origin) ezai-rounded-md ezai-px-3 ezai-py-1.5 ezai-text-xs ezai-text-balance",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="ezai-bg-primary ezai-fill-primary ezai-z-50 ezai-size-2.5 ezai-translate-y-[calc(-50%_-_2px)] ezai-rotate-45 ezai-rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
