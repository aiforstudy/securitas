import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "ezai-inline-flex ezai-items-center ezai-justify-center ezai-gap-2 ezai-whitespace-nowrap ezai-rounded-md ezai-text-sm ezai-font-medium ezai-transition-all disabled:ezai-pointer-events-none disabled:ezai-opacity-50 [&_svg]:ezai-pointer-events-none [&_svg:not([class*=size-])]:ezai-size-4 ezai-shrink-0 [&_svg]:ezai-shrink-0 ezai-outline-none focus-visible:ezai-border-ring focus-visible:ezai-ring-ring/50 focus-visible:ezai-ring-[3px] aria-invalid:ezai-ring-destructive/20 dark:aria-invalid:ezai-ring-destructive/40 aria-invalid:ezai-border-destructive",
  {
    variants: {
      variant: {
        default:
          "ezai-bg-primary ezai-text-primary-foreground ezai-shadow-xs hover:ezai-bg-primary/90",
        destructive:
          "ezai-bg-destructive ezai-text-white ezai-shadow-xs hover:ezai-bg-destructive/90 focus-visible:ezai-ring-destructive/20 dark:focus-visible:ezai-ring-destructive/40 dark:ezai-bg-destructive/60",
        outline:
          "ezai-border ezai-bg-background ezai-shadow-xs hover:ezai-bg-accent hover:ezai-text-accent-foreground dark:ezai-bg-input/30 dark:ezai-border-input dark:hover:ezai-bg-input/50",
        secondary:
          "ezai-bg-secondary ezai-text-secondary-foreground ezai-shadow-xs hover:ezai-bg-secondary/80",
        ghost:
          "hover:ezai-bg-accent hover:ezai-text-accent-foreground dark:hover:ezai-bg-accent/50",
        link: "ezai-text-primary ezai-underline-offset-4 hover:ezai-underline",
      },
      size: {
        default: "ezai-h-9 ezai-px-4 ezai-py-2 has-[>svg]:ezai-px-3",
        sm: "ezai-h-8 ezai-rounded-md ezai-gap-1.5 ezai-px-3 has-[>svg]:ezai-px-2.5",
        lg: "ezai-h-10 ezai-rounded-md ezai-px-6 has-[>svg]:ezai-px-4",
        icon: "ezai-size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
