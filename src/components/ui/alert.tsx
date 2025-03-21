import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "ezai-relative ezai-w-full ezai-rounded-lg ezai-border ezai-px-4 ezai-py-3 ezai-text-sm ezai-grid has-[>svg]:ezai-grid-cols-[calc(var(--spacing)*4)_1fr] ezai-grid-cols-[0_1fr] has-[>svg]:ezai-gap-x-3 ezai-gap-y-0.5 ezai-items-start [&>svg]:ezai-size-4 [&>svg]:ezai-translate-y-0.5 [&>svg]:ezai-text-current",
  {
    variants: {
      variant: {
        default: "ezai-bg-card ezai-text-card-foreground",
        destructive:
          "ezai-text-destructive ezai-bg-card [&>svg]:ezai-text-current *:data-[slot=alert-description]:ezai-text-destructive/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "ezai-col-start-2 ezai-line-clamp-1 ezai-min-h-4 ezai-font-medium ezai-tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "ezai-text-muted-foreground ezai-col-start-2 ezai-grid ezai-justify-items-start ezai-gap-1 ezai-text-sm [&_p]:ezai-leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
