import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "ezai-border-input placeholder:ezai-text-muted-foreground focus-visible:ezai-border-ring focus-visible:ezai-ring-ring/50 aria-invalid:ezai-ring-destructive/20 dark:aria-invalid:ezai-ring-destructive/40 aria-invalid:ezai-border-destructive dark:ezai-bg-input/30 ezai-flex ezai-field-sizing-content ezai-min-h-16 ezai-w-full ezai-rounded-md ezai-border ezai-bg-transparent ezai-px-3 ezai-py-2 ezai-text-base ezai-shadow-xs ezai-transition-[color,box-shadow] ezai-outline-none focus-visible:ezai-ring-[3px] disabled:ezai-cursor-not-allowed disabled:ezai-opacity-50 md:ezai-text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
