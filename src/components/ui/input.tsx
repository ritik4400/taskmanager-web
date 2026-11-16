import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full rounded-lg bg-muted px-4 py-3 text-sm text-foreground transition-all outline-none placeholder:text-muted-foreground/60 focus:bg-card focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:bg-error-soft/30 aria-invalid:ring-2 aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
