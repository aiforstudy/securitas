import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("ezai-border-b last:ezai-border-b-0", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="ezai-flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:ezai-border-ring focus-visible:ezai-ring-ring/50 ezai-flex ezai-flex-1 ezai-items-start ezai-justify-between ezai-gap-4 ezai-rounded-md ezai-py-4 ezai-text-left ezai-text-sm ezai-font-medium ezai-transition-all ezai-outline-none hover:ezai-underline focus-visible:ezai-ring-[3px] disabled:ezai-pointer-events-none disabled:ezai-opacity-50 [&[data-state=open]>svg]:ezai-rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="ezai-text-muted-foreground ezai-pointer-events-none ezai-size-4 ezai-shrink-0 ezai-translate-y-0.5 ezai-transition-transform ezai-duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:ezai-animate-accordion-up data-[state=open]:ezai-animate-accordion-down ezai-overflow-hidden ezai-text-sm"
      {...props}
    >
      <div className={cn("ezai-pt-0 ezai-pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
