import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("ezai-bg-accent ezai-animate-pulse ezai-rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
