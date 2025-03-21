import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "ezai-bg-border ezai-shrink-0 data-[orientation=horizontal]:ezai-h-px data-[orientation=horizontal]:ezai-w-full data-[orientation=vertical]:ezai-h-full data-[orientation=vertical]:ezai-w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
