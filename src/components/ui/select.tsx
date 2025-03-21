import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "ezai-border-input data-[placeholder]:ezai-text-muted-foreground [&_svg:not([class*=text-])]:ezai-text-muted-foreground focus-visible:ezai-border-ring focus-visible:ezai-ring-ring/50 aria-invalid:ezai-ring-destructive/20 dark:aria-invalid:ezai-ring-destructive/40 aria-invalid:ezai-border-destructive dark:ezai-bg-input/30 dark:hover:ezai-bg-input/50 ezai-flex ezai-w-fit ezai-items-center ezai-justify-between ezai-gap-2 ezai-rounded-md ezai-border ezai-bg-transparent ezai-px-3 ezai-py-2 ezai-text-sm ezai-whitespace-nowrap ezai-shadow-xs ezai-transition-[color,box-shadow] ezai-outline-none focus-visible:ezai-ring-[3px] disabled:ezai-cursor-not-allowed disabled:ezai-opacity-50 data-[size=default]:ezai-h-9 data-[size=sm]:ezai-h-8 *:data-[slot=select-value]:ezai-line-clamp-1 *:data-[slot=select-value]:ezai-flex *:data-[slot=select-value]:ezai-items-center *:data-[slot=select-value]:ezai-gap-2 [&_svg]:ezai-pointer-events-none [&_svg]:ezai-shrink-0 [&_svg:not([class*=size-])]:ezai-size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="ezai-size-4 ezai-opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "ezai-bg-popover ezai-text-popover-foreground data-[state=open]:ezai-animate-in data-[state=closed]:ezai-animate-out data-[state=closed]:ezai-fade-out-0 data-[state=open]:ezai-fade-in-0 data-[state=closed]:ezai-zoom-out-95 data-[state=open]:ezai-zoom-in-95 data-[side=bottom]:ezai-slide-in-from-top-2 data-[side=left]:ezai-slide-in-from-right-2 data-[side=right]:ezai-slide-in-from-left-2 data-[side=top]:ezai-slide-in-from-bottom-2 ezai-relative ezai-z-50 ezai-max-h-(--radix-select-content-available-height) ezai-min-w-[8rem] ezai-origin-(--radix-select-content-transform-origin) ezai-overflow-x-hidden ezai-overflow-y-auto ezai-rounded-md ezai-border ezai-shadow-md",
          position === "popper" &&
            "data-[side=bottom]:ezai-translate-y-1 data-[side=left]:ezai--translate-x-1 data-[side=right]:ezai-translate-x-1 data-[side=top]:ezai--translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "ezai-p-1",
            position === "popper" &&
              "ezai-h-[var(--radix-select-trigger-height)] ezai-w-full ezai-min-w-[var(--radix-select-trigger-width)] ezai-scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("ezai-text-muted-foreground ezai-px-2 ezai-py-1.5 ezai-text-xs", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:ezai-bg-accent focus:ezai-text-accent-foreground [&_svg:not([class*=text-])]:ezai-text-muted-foreground ezai-relative ezai-flex ezai-w-full ezai-cursor-default ezai-items-center ezai-gap-2 ezai-rounded-sm ezai-py-1.5 ezai-pr-8 ezai-pl-2 ezai-text-sm ezai-outline-hidden ezai-select-none data-[disabled]:ezai-pointer-events-none data-[disabled]:ezai-opacity-50 [&_svg]:ezai-pointer-events-none [&_svg]:ezai-shrink-0 [&_svg:not([class*=size-])]:ezai-size-4 *:[span]:last:ezai-flex *:[span]:last:ezai-items-center *:[span]:last:ezai-gap-2",
        className
      )}
      {...props}
    >
      <span className="ezai-absolute ezai-right-2 ezai-flex ezai-size-3.5 ezai-items-center ezai-justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="ezai-size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("ezai-bg-border ezai-pointer-events-none ezai--mx-1 ezai-my-1 ezai-h-px", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "ezai-flex ezai-cursor-default ezai-items-center ezai-justify-center ezai-py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="ezai-size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "ezai-flex ezai-cursor-default ezai-items-center ezai-justify-center ezai-py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="ezai-size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
