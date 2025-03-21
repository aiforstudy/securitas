"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "ezai-inline-flex ezai-items-center ezai-justify-center ezai-gap-2 ezai-rounded-md ezai-text-sm ezai-font-medium hover:ezai-bg-muted hover:ezai-text-muted-foreground disabled:ezai-pointer-events-none disabled:ezai-opacity-50 data-[state=on]:ezai-bg-accent data-[state=on]:ezai-text-accent-foreground [&_svg]:ezai-pointer-events-none [&_svg:not([class*=size-])]:ezai-size-4 [&_svg]:ezai-shrink-0 focus-visible:ezai-border-ring focus-visible:ezai-ring-ring/50 focus-visible:ezai-ring-[3px] ezai-outline-none ezai-transition-[color,box-shadow] aria-invalid:ezai-ring-destructive/20 dark:aria-invalid:ezai-ring-destructive/40 aria-invalid:ezai-border-destructive ezai-whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "ezai-bg-transparent",
        outline:
          "ezai-border ezai-border-input ezai-bg-transparent ezai-shadow-xs hover:ezai-bg-accent hover:ezai-text-accent-foreground",
      },
      size: {
        default: "ezai-h-9 ezai-px-2 ezai-min-w-9",
        sm: "ezai-h-8 ezai-px-1.5 ezai-min-w-8",
        lg: "ezai-h-10 ezai-px-2.5 ezai-min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
