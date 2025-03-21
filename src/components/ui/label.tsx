"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "ezai-flex ezai-items-center ezai-gap-2 ezai-text-sm ezai-leading-none ezai-font-medium ezai-select-none group-data-[disabled=true]:ezai-pointer-events-none group-data-[disabled=true]:ezai-opacity-50 peer-disabled:ezai-cursor-not-allowed peer-disabled:ezai-opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
