import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("ezai-grid ezai-gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "ezai-border-input ezai-text-primary focus-visible:ezai-border-ring focus-visible:ezai-ring-ring/50 aria-invalid:ezai-ring-destructive/20 dark:aria-invalid:ezai-ring-destructive/40 aria-invalid:ezai-border-destructive dark:ezai-bg-input/30 ezai-aspect-square ezai-size-4 ezai-shrink-0 ezai-rounded-full ezai-border ezai-shadow-xs ezai-transition-[color,box-shadow] ezai-outline-none focus-visible:ezai-ring-[3px] disabled:ezai-cursor-not-allowed disabled:ezai-opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="ezai-relative ezai-flex ezai-items-center ezai-justify-center"
      >
        <CircleIcon className="ezai-fill-primary ezai-absolute ezai-top-1/2 ezai-left-1/2 ezai-size-2 ezai--translate-x-1/2 ezai--translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
