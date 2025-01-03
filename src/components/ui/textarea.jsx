import React from 'react';
import { cn } from "../../utils/utils"

const Textarea = React.forwardRef(({ className, rows = 4, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      rows={rows}
      {...props}
    />
  )
});

Textarea.displayName = "Textarea"

export { Textarea }
