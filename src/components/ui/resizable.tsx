import * as React from "react"
import { GripVerticalIcon } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) {
  return (
    <ResizablePrimitive.PanelGroup
      data-slot="resizable-panel-group"
      className={cn(
        "ezai-flex ezai-h-full ezai-w-full data-[panel-group-direction=vertical]:ezai-flex-col",
        className
      )}
      {...props}
    />
  )
}

function ResizablePanel({
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Panel>) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot="resizable-handle"
      className={cn(
        "ezai-bg-border focus-visible:ezai-ring-ring ezai-relative ezai-flex ezai-w-px ezai-items-center ezai-justify-center after:ezai-absolute after:ezai-inset-y-0 after:ezai-left-1/2 after:ezai-w-1 after:ezai--translate-x-1/2 focus-visible:ezai-ring-1 focus-visible:ezai-ring-offset-1 focus-visible:ezai-outline-hidden data-[panel-group-direction=vertical]:ezai-h-px data-[panel-group-direction=vertical]:ezai-w-full data-[panel-group-direction=vertical]:after:ezai-left-0 data-[panel-group-direction=vertical]:after:ezai-h-1 data-[panel-group-direction=vertical]:after:ezai-w-full data-[panel-group-direction=vertical]:after:ezai--translate-y-1/2 data-[panel-group-direction=vertical]:after:ezai-translate-x-0 [&[data-panel-group-direction=vertical]>div]:ezai-rotate-90",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="ezai-bg-border ezai-z-10 ezai-flex ezai-h-4 ezai-w-3 ezai-items-center ezai-justify-center ezai-rounded-xs ezai-border">
          <GripVerticalIcon className="ezai-size-2.5" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
