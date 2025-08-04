import * as React from "react"
import { cn } from "../lib/utils"

const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          "ring-offset-background ",
          "w-full",
          variant === "outline"
            ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            : "bg-primary text-primary-foreground hover:bg-primary/90",
          size === "default" ? "h-10 px-3 py-2" : size === "sm" ? "h-9 px-3 rounded-md" : "h-11 px-8 rounded-md",
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
