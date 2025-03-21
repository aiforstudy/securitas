import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  )
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          "ezai-bg-popover ezai-text-popover-foreground data-[state=open]:ezai-animate-in data-[state=closed]:ezai-animate-out data-[state=closed]:ezai-fade-out-0 data-[state=open]:ezai-fade-in-0 data-[state=closed]:ezai-zoom-out-95 data-[state=open]:ezai-zoom-in-95 data-[side=bottom]:ezai-slide-in-from-top-2 data-[side=left]:ezai-slide-in-from-right-2 data-[side=right]:ezai-slide-in-from-left-2 data-[side=top]:ezai-slide-in-from-bottom-2 ezai-z-50 ezai-max-h-(--radix-dropdown-menu-content-available-height) ezai-min-w-[8rem] ezai-origin-(--radix-dropdown-menu-content-transform-origin) ezai-overflow-x-hidden ezai-overflow-y-auto ezai-rounded-md ezai-border ezai-p-1 ezai-shadow-md",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:ezai-bg-accent focus:ezai-text-accent-foreground data-[variant=destructive]:ezai-text-destructive data-[variant=destructive]:focus:ezai-bg-destructive/10 dark:data-[variant=destructive]:focus:ezai-bg-destructive/20 data-[variant=destructive]:focus:ezai-text-destructive data-[variant=destructive]:*:[svg]:ezai-!text-destructive [&_svg:not([class*=text-])]:ezai-text-muted-foreground ezai-relative ezai-flex ezai-cursor-default ezai-items-center ezai-gap-2 ezai-rounded-sm ezai-px-2 ezai-py-1.5 ezai-text-sm ezai-outline-hidden ezai-select-none data-[disabled]:ezai-pointer-events-none data-[disabled]:ezai-opacity-50 data-[inset]:ezai-pl-8 [&_svg]:ezai-pointer-events-none [&_svg]:ezai-shrink-0 [&_svg:not([class*=size-])]:ezai-size-4",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "focus:ezai-bg-accent focus:ezai-text-accent-foreground ezai-relative ezai-flex ezai-cursor-default ezai-items-center ezai-gap-2 ezai-rounded-sm ezai-py-1.5 ezai-pr-2 ezai-pl-8 ezai-text-sm ezai-outline-hidden ezai-select-none data-[disabled]:ezai-pointer-events-none data-[disabled]:ezai-opacity-50 [&_svg]:ezai-pointer-events-none [&_svg]:ezai-shrink-0 [&_svg:not([class*=size-])]:ezai-size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="ezai-pointer-events-none ezai-absolute ezai-left-2 ezai-flex ezai-size-3.5 ezai-items-center ezai-justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="ezai-size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "focus:ezai-bg-accent focus:ezai-text-accent-foreground ezai-relative ezai-flex ezai-cursor-default ezai-items-center ezai-gap-2 ezai-rounded-sm ezai-py-1.5 ezai-pr-2 ezai-pl-8 ezai-text-sm ezai-outline-hidden ezai-select-none data-[disabled]:ezai-pointer-events-none data-[disabled]:ezai-opacity-50 [&_svg]:ezai-pointer-events-none [&_svg]:ezai-shrink-0 [&_svg:not([class*=size-])]:ezai-size-4",
        className
      )}
      {...props}
    >
      <span className="ezai-pointer-events-none ezai-absolute ezai-left-2 ezai-flex ezai-size-3.5 ezai-items-center ezai-justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="ezai-size-2 ezai-fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "ezai-px-2 ezai-py-1.5 ezai-text-sm ezai-font-medium data-[inset]:ezai-pl-8",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("ezai-bg-border ezai--mx-1 ezai-my-1 ezai-h-px", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ezai-text-muted-foreground ezai-ml-auto ezai-text-xs ezai-tracking-widest",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:ezai-bg-accent focus:ezai-text-accent-foreground data-[state=open]:ezai-bg-accent data-[state=open]:ezai-text-accent-foreground ezai-flex ezai-cursor-default ezai-items-center ezai-rounded-sm ezai-px-2 ezai-py-1.5 ezai-text-sm ezai-outline-hidden ezai-select-none data-[inset]:ezai-pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ezai-ml-auto ezai-size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "ezai-bg-popover ezai-text-popover-foreground data-[state=open]:ezai-animate-in data-[state=closed]:ezai-animate-out data-[state=closed]:ezai-fade-out-0 data-[state=open]:ezai-fade-in-0 data-[state=closed]:ezai-zoom-out-95 data-[state=open]:ezai-zoom-in-95 data-[side=bottom]:ezai-slide-in-from-top-2 data-[side=left]:ezai-slide-in-from-right-2 data-[side=right]:ezai-slide-in-from-left-2 data-[side=top]:ezai-slide-in-from-bottom-2 ezai-z-50 ezai-min-w-[8rem] ezai-origin-(--radix-dropdown-menu-content-transform-origin) ezai-overflow-hidden ezai-rounded-md ezai-border ezai-p-1 ezai-shadow-lg",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
