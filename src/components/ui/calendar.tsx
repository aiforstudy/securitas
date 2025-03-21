import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("ezai-p-3", className)}
      classNames={{
        months: "ezai-flex ezai-flex-col sm:ezai-flex-row ezai-gap-2",
        month: "ezai-flex ezai-flex-col ezai-gap-4",
        caption: "ezai-flex ezai-justify-center ezai-pt-1 ezai-relative ezai-items-center ezai-w-full",
        caption_label: "ezai-text-sm ezai-font-medium",
        nav: "ezai-flex ezai-items-center ezai-gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "ezai-size-7 ezai-bg-transparent ezai-p-0 ezai-opacity-50 hover:ezai-opacity-100"
        ),
        nav_button_previous: "ezai-absolute ezai-left-1",
        nav_button_next: "ezai-absolute ezai-right-1",
        table: "ezai-w-full ezai-border-collapse ezai-space-x-1",
        head_row: "ezai-flex",
        head_cell:
          "ezai-text-muted-foreground ezai-rounded-md ezai-w-8 ezai-font-normal ezai-text-[0.8rem]",
        row: "ezai-flex ezai-w-full ezai-mt-2",
        cell: cn(
          "ezai-relative ezai-p-0 ezai-text-center ezai-text-sm focus-within:ezai-relative focus-within:ezai-z-20 [&:has([aria-selected])]:ezai-bg-accent [&:has([aria-selected].day-range-end)]:ezai-rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:ezai-rounded-r-md [&:has(>.day-range-start)]:ezai-rounded-l-md first:[&:has([aria-selected])]:ezai-rounded-l-md last:[&:has([aria-selected])]:ezai-rounded-r-md"
            : "[&:has([aria-selected])]:ezai-rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "ezai-size-8 ezai-p-0 ezai-font-normal aria-selected:ezai-opacity-100"
        ),
        day_range_start:
          "ezai-day-range-start aria-selected:ezai-bg-primary aria-selected:ezai-text-primary-foreground",
        day_range_end:
          "ezai-day-range-end aria-selected:ezai-bg-primary aria-selected:ezai-text-primary-foreground",
        day_selected:
          "ezai-bg-primary ezai-text-primary-foreground hover:ezai-bg-primary hover:ezai-text-primary-foreground focus:ezai-bg-primary focus:ezai-text-primary-foreground",
        day_today: "ezai-bg-accent ezai-text-accent-foreground",
        day_outside:
          "ezai-day-outside ezai-text-muted-foreground aria-selected:ezai-text-muted-foreground",
        day_disabled: "ezai-text-muted-foreground ezai-opacity-50",
        day_range_middle:
          "aria-selected:ezai-bg-accent aria-selected:ezai-text-accent-foreground",
        day_hidden: "ezai-invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("ezai-size-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("ezai-size-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  )
}

export { Calendar }
