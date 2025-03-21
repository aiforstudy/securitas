import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "ezai-peer ezai-border-input dark:ezai-bg-input/30 data-[state=checked]:ezai-bg-primary data-[state=checked]:ezai-text-primary-foreground dark:data-[state=checked]:ezai-bg-primary data-[state=checked]:ezai-border-primary focus-visible:ezai-border-ring focus-visible:ezai-ring-ring/50 aria-invalid:ezai-ring-destructive/20 dark:aria-invalid:ezai-ring-destructive/40 aria-invalid:ezai-border-destructive ezai-size-4 ezai-shrink-0 ezai-rounded-[4px] ezai-border ezai-shadow-xs ezai-transition-shadow ezai-outline-none focus-visible:ezai-ring-[3px] disabled:ezai-cursor-not-allowed disabled:ezai-opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="ezai-flex ezai-items-center ezai-justify-center ezai-text-current ezai-transition-none"
      >
        <CheckIcon className="ezai-size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
