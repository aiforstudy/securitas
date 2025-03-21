import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "ezai-inline-flex ezai-items-center ezai-justify-center ezai-rounded-md ezai-border ezai-px-2 ezai-py-0.5 ezai-text-xs ezai-font-medium ezai-w-fit ezai-whitespace-nowrap ezai-shrink-0 [&>svg]:ezai-size-3 ezai-gap-1 [&>svg]:ezai-pointer-events-none focus-visible:ezai-border-ring focus-visible:ezai-ring-ring/50 focus-visible:ezai-ring-[3px] aria-invalid:ezai-ring-destructive/20 dark:aria-invalid:ezai-ring-destructive/40 aria-invalid:ezai-border-destructive ezai-transition-[color,box-shadow] ezai-overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "ezai-border-transparent ezai-bg-primary ezai-text-primary-foreground [a&]:hover:ezai-bg-primary/90",
        secondary:
          "ezai-border-transparent ezai-bg-secondary ezai-text-secondary-foreground [a&]:hover:ezai-bg-secondary/90",
        destructive:
          "ezai-border-transparent ezai-bg-destructive ezai-text-white [a&]:hover:ezai-bg-destructive/90 focus-visible:ezai-ring-destructive/20 dark:focus-visible:ezai-ring-destructive/40 dark:ezai-bg-destructive/70",
        outline:
          "ezai-text-foreground [a&]:hover:ezai-bg-accent [a&]:hover:ezai-text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
