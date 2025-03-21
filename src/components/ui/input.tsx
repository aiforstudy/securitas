import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:ezai-text-foreground placeholder:ezai-text-muted-foreground selection:ezai-bg-primary selection:ezai-text-primary-foreground dark:ezai-bg-input/30 ezai-border-input ezai-flex ezai-h-9 ezai-w-full ezai-min-w-0 ezai-rounded-md ezai-border ezai-bg-transparent ezai-px-3 ezai-py-1 ezai-text-base ezai-shadow-xs ezai-transition-[color,box-shadow] ezai-outline-none file:ezai-inline-flex file:ezai-h-7 file:ezai-border-0 file:ezai-bg-transparent file:ezai-text-sm file:ezai-font-medium disabled:ezai-pointer-events-none disabled:ezai-cursor-not-allowed disabled:ezai-opacity-50 md:ezai-text-sm",
        "focus-visible:ezai-border-ring focus-visible:ezai-ring-ring/50 focus-visible:ezai-ring-[3px]",
        "aria-invalid:ezai-ring-destructive/20 dark:aria-invalid:ezai-ring-destructive/40 aria-invalid:ezai-border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
