import * as React from "react";
import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<"input"> & { icon?: React.ReactNode };

function Input({ className, type, icon, ...props }: InputProps) {
  const input = (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full rounded-lg bg-muted px-4 py-3 text-sm text-foreground transition-all outline-none placeholder:text-muted-foreground/60 focus:bg-card focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:bg-error-soft/30 aria-invalid:ring-2 aria-invalid:ring-destructive/40",
        icon ? "pl-11" : null,
        className,
      )}
      {...props}
    />
  );

  if (!icon) return input;

  return (
    <div className="relative">
      <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-muted-foreground [&_svg]:size-[18px]">
        {icon}
      </span>
      {input}
    </div>
  );
}

export { Input };
