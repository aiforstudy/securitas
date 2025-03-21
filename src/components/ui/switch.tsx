import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "ezai-peer data-[state=checked]:ezai-bg-primary data-[state=unchecked]:ezai-bg-input focus-visible:ezai-border-ring focus-visible:ezai-ring-ring/50 dark:data-[state=unchecked]:ezai-bg-input/80 ezai-inline-flex ezai-h-[1.15rem] ezai-w-8 ezai-shrink-0 ezai-items-center ezai-rounded-full ezai-border ezai-border-transparent ezai-shadow-xs ezai-transition-all ezai-outline-none focus-visible:ezai-ring-[3px] disabled:ezai-cursor-not-allowed disabled:ezai-opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "ezai-bg-background dark:data-[state=unchecked]:ezai-bg-foreground dark:data-[state=checked]:ezai-bg-primary-foreground ezai-pointer-events-none ezai-block ezai-size-4 ezai-rounded-full ezai-ring-0 ezai-transition-transform data-[state=checked]:ezai-translate-x-[calc(100%-2px)] data-[state=unchecked]:ezai-translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
