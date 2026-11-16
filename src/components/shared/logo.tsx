import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "default" | "light";
  className?: string;
};

export function Logo({ variant = "default", className }: LogoProps) {
  const isLight = variant === "light";

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className={cn(
          "flex size-9 items-center justify-center rounded-xl",
          isLight
            ? "bg-white/15 backdrop-blur-md"
            : "bg-linear-to-br from-primary to-brand-violet shadow-glow",
        )}
      >
        <Check className="size-5 text-white" strokeWidth={3} />
      </div>
      <span
        className={cn(
          "text-lg font-bold tracking-tight",
          isLight ? "text-white" : "text-foreground",
        )}
      >
        TaskFlow
      </span>
    </div>
  );
}
