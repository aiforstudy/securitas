import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("ezai-flex ezai-flex-col ezai-gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "ezai-bg-muted ezai-text-muted-foreground ezai-inline-flex ezai-h-9 ezai-w-fit ezai-items-center ezai-justify-center ezai-rounded-lg ezai-p-[3px]",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:ezai-bg-background dark:data-[state=active]:ezai-text-foreground focus-visible:ezai-border-ring focus-visible:ezai-ring-ring/50 focus-visible:ezai-outline-ring dark:data-[state=active]:ezai-border-input dark:data-[state=active]:ezai-bg-input/30 ezai-text-foreground dark:ezai-text-muted-foreground ezai-inline-flex ezai-h-[calc(100%-1px)] ezai-flex-1 ezai-items-center ezai-justify-center ezai-gap-1.5 ezai-rounded-md ezai-border ezai-border-transparent ezai-px-2 ezai-py-1 ezai-text-sm ezai-font-medium ezai-whitespace-nowrap ezai-transition-[color,box-shadow] focus-visible:ezai-ring-[3px] focus-visible:ezai-outline-1 disabled:ezai-pointer-events-none disabled:ezai-opacity-50 data-[state=active]:ezai-shadow-sm [&_svg]:ezai-pointer-events-none [&_svg]:ezai-shrink-0 [&_svg:not([class*=size-])]:ezai-size-4",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("ezai-flex-1 ezai-outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
