import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "ezai-bg-popover ezai-text-popover-foreground ezai-flex ezai-h-full ezai-w-full ezai-flex-col ezai-overflow-hidden ezai-rounded-md",
        className
      )}
      {...props}
    />
  )
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="ezai-sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent className="ezai-overflow-hidden ezai-p-0">
        <Command className="[&_[cmdk-group-heading]]:ezai-text-muted-foreground **:data-[slot=command-input-wrapper]:ezai-h-12 [&_[cmdk-group-heading]]:ezai-px-2 [&_[cmdk-group-heading]]:ezai-font-medium [&_[cmdk-group]]:ezai-px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:ezai-pt-0 [&_[cmdk-input-wrapper]_svg]:ezai-h-5 [&_[cmdk-input-wrapper]_svg]:ezai-w-5 [&_[cmdk-input]]:ezai-h-12 [&_[cmdk-item]]:ezai-px-2 [&_[cmdk-item]]:ezai-py-3 [&_[cmdk-item]_svg]:ezai-h-5 [&_[cmdk-item]_svg]:ezai-w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="ezai-flex ezai-h-9 ezai-items-center ezai-gap-2 ezai-border-b ezai-px-3"
    >
      <SearchIcon className="ezai-size-4 ezai-shrink-0 ezai-opacity-50" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "placeholder:ezai-text-muted-foreground ezai-flex ezai-h-10 ezai-w-full ezai-rounded-md ezai-bg-transparent ezai-py-3 ezai-text-sm ezai-outline-hidden disabled:ezai-cursor-not-allowed disabled:ezai-opacity-50",
          className
        )}
        {...props}
      />
    </div>
  )
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "ezai-max-h-[300px] ezai-scroll-py-1 ezai-overflow-x-hidden ezai-overflow-y-auto",
        className
      )}
      {...props}
    />
  )
}

function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="ezai-py-6 ezai-text-center ezai-text-sm"
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "ezai-text-foreground [&_[cmdk-group-heading]]:ezai-text-muted-foreground ezai-overflow-hidden ezai-p-1 [&_[cmdk-group-heading]]:ezai-px-2 [&_[cmdk-group-heading]]:ezai-py-1.5 [&_[cmdk-group-heading]]:ezai-text-xs [&_[cmdk-group-heading]]:ezai-font-medium",
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("ezai-bg-border ezai--mx-1 ezai-h-px", className)}
      {...props}
    />
  )
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "data-[selected=true]:ezai-bg-accent data-[selected=true]:ezai-text-accent-foreground [&_svg:not([class*=text-])]:ezai-text-muted-foreground ezai-relative ezai-flex ezai-cursor-default ezai-items-center ezai-gap-2 ezai-rounded-sm ezai-px-2 ezai-py-1.5 ezai-text-sm ezai-outline-hidden ezai-select-none data-[disabled=true]:ezai-pointer-events-none data-[disabled=true]:ezai-opacity-50 [&_svg]:ezai-pointer-events-none [&_svg]:ezai-shrink-0 [&_svg:not([class*=size-])]:ezai-size-4",
        className
      )}
      {...props}
    />
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "ezai-text-muted-foreground ezai-ml-auto ezai-text-xs ezai-tracking-widest",
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
