import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function ContextMenu({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Root>) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />
}

function ContextMenuTrigger({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) {
  return (
    <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />
  )
}

function ContextMenuGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Group>) {
  return (
    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
  )
}

function ContextMenuPortal({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Portal>) {
  return (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
  )
}

function ContextMenuSub({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Sub>) {
  return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />
}

function ContextMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  )
}

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.SubTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:ezai-bg-accent focus:ezai-text-accent-foreground data-[state=open]:ezai-bg-accent data-[state=open]:ezai-text-accent-foreground ezai-flex ezai-cursor-default ezai-items-center ezai-rounded-sm ezai-px-2 ezai-py-1.5 ezai-text-sm ezai-outline-hidden ezai-select-none data-[inset]:ezai-pl-8 [&_svg]:ezai-pointer-events-none [&_svg]:ezai-shrink-0 [&_svg:not([class*=size-])]:ezai-size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ezai-ml-auto" />
    </ContextMenuPrimitive.SubTrigger>
  )
}

function ContextMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) {
  return (
    <ContextMenuPrimitive.SubContent
      data-slot="context-menu-sub-content"
      className={cn(
        "ezai-bg-popover ezai-text-popover-foreground data-[state=open]:ezai-animate-in data-[state=closed]:ezai-animate-out data-[state=closed]:ezai-fade-out-0 data-[state=open]:ezai-fade-in-0 data-[state=closed]:ezai-zoom-out-95 data-[state=open]:ezai-zoom-in-95 data-[side=bottom]:ezai-slide-in-from-top-2 data-[side=left]:ezai-slide-in-from-right-2 data-[side=right]:ezai-slide-in-from-left-2 data-[side=top]:ezai-slide-in-from-bottom-2 ezai-z-50 ezai-min-w-[8rem] ezai-origin-(--radix-context-menu-content-transform-origin) ezai-overflow-hidden ezai-rounded-md ezai-border ezai-p-1 ezai-shadow-lg",
        className
      )}
      {...props}
    />
  )
}

function ContextMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Content>) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        data-slot="context-menu-content"
        className={cn(
          "ezai-bg-popover ezai-text-popover-foreground data-[state=open]:ezai-animate-in data-[state=closed]:ezai-animate-out data-[state=closed]:ezai-fade-out-0 data-[state=open]:ezai-fade-in-0 data-[state=closed]:ezai-zoom-out-95 data-[state=open]:ezai-zoom-in-95 data-[side=bottom]:ezai-slide-in-from-top-2 data-[side=left]:ezai-slide-in-from-right-2 data-[side=right]:ezai-slide-in-from-left-2 data-[side=top]:ezai-slide-in-from-bottom-2 ezai-z-50 ezai-max-h-(--radix-context-menu-content-available-height) ezai-min-w-[8rem] ezai-origin-(--radix-context-menu-content-transform-origin) ezai-overflow-x-hidden ezai-overflow-y-auto ezai-rounded-md ezai-border ezai-p-1 ezai-shadow-md",
          className
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  )
}

function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
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

function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      className={cn(
        "focus:ezai-bg-accent focus:ezai-text-accent-foreground ezai-relative ezai-flex ezai-cursor-default ezai-items-center ezai-gap-2 ezai-rounded-sm ezai-py-1.5 ezai-pr-2 ezai-pl-8 ezai-text-sm ezai-outline-hidden ezai-select-none data-[disabled]:ezai-pointer-events-none data-[disabled]:ezai-opacity-50 [&_svg]:ezai-pointer-events-none [&_svg]:ezai-shrink-0 [&_svg:not([class*=size-])]:ezai-size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="ezai-pointer-events-none ezai-absolute ezai-left-2 ezai-flex ezai-size-3.5 ezai-items-center ezai-justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CheckIcon className="ezai-size-4" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  )
}

function ContextMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      className={cn(
        "focus:ezai-bg-accent focus:ezai-text-accent-foreground ezai-relative ezai-flex ezai-cursor-default ezai-items-center ezai-gap-2 ezai-rounded-sm ezai-py-1.5 ezai-pr-2 ezai-pl-8 ezai-text-sm ezai-outline-hidden ezai-select-none data-[disabled]:ezai-pointer-events-none data-[disabled]:ezai-opacity-50 [&_svg]:ezai-pointer-events-none [&_svg]:ezai-shrink-0 [&_svg:not([class*=size-])]:ezai-size-4",
        className
      )}
      {...props}
    >
      <span className="ezai-pointer-events-none ezai-absolute ezai-left-2 ezai-flex ezai-size-3.5 ezai-items-center ezai-justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CircleIcon className="ezai-size-2 ezai-fill-current" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  )
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.Label
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn(
        "ezai-text-foreground ezai-px-2 ezai-py-1.5 ezai-text-sm ezai-font-medium data-[inset]:ezai-pl-8",
        className
      )}
      {...props}
    />
  )
}

function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn("ezai-bg-border ezai--mx-1 ezai-my-1 ezai-h-px", className)}
      {...props}
    />
  )
}

function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        "ezai-text-muted-foreground ezai-ml-auto ezai-text-xs ezai-tracking-widest",
        className
      )}
      {...props}
    />
  )
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}
