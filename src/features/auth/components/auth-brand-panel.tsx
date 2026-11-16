import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/shared/logo";

export function AuthBrandPanel() {
  return (
    <aside className="relative hidden min-h-screen flex-col justify-between overflow-hidden bg-linear-to-br from-primary via-brand-violet to-[#8455ef] p-8 text-white select-none md:flex md:w-1/2 lg:w-7/12 lg:p-16">
      {/* Soft decorative glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -right-20 size-80 rounded-full bg-status-progress-soft/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/4 size-88 rounded-full bg-[#c0c1ff]/20 blur-3xl" />

      <Logo variant="light" className="relative z-10" />

      <div className="relative z-10 my-auto max-w-xl py-10">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold tracking-wide uppercase backdrop-blur-md">
            <span className="size-1.5 animate-pulse rounded-full bg-status-done-soft" />
            Elevated Productivity
          </span>
          <h1 className="text-3xl leading-tight font-extrabold tracking-tight lg:text-4xl">
            Get things done, beautifully.
          </h1>
          <p className="max-w-md text-base leading-relaxed text-[#c0c1ff]">
            Your personal workspace designed for focus, clarity, and daily momentum.
          </p>
        </div>

        {/* Decorative stack of sample tasks */}
        <div className="relative mt-12 flex h-64 w-full max-w-md flex-col justify-center">
          <div className="absolute inset-x-0 top-16 flex translate-y-6 scale-[0.93] -rotate-1 items-center justify-between rounded-xl bg-card/90 p-4 text-foreground shadow-md backdrop-blur-md transition-all duration-300 hover:scale-[0.96] hover:rotate-0">
            <div className="flex min-w-0 items-center gap-3">
              <span className="size-2.5 shrink-0 rounded-full bg-sky-500" />
              <span className="truncate text-sm font-semibold">Submit weekly sync notes</span>
            </div>
            <span className="shrink-0 rounded-full bg-status-done-soft px-2.5 py-0.5 text-[11px] font-bold text-status-done">
              Done
            </span>
          </div>

          <div className="absolute inset-x-0 top-8 flex translate-y-3 scale-[0.97] rotate-2 items-center justify-between rounded-xl bg-card/95 p-4 text-foreground shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-[0.99] hover:rotate-0">
            <div className="flex min-w-0 items-center gap-3">
              <span className="size-2.5 shrink-0 rounded-full bg-amber-500" />
              <span className="truncate text-sm font-semibold">Review quarterly design tokens</span>
            </div>
            <span className="shrink-0 rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-bold text-muted-foreground">
              To Do
            </span>
          </div>

          <div className="relative flex -rotate-2 items-center justify-between rounded-xl bg-card p-4 text-foreground shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:rotate-0">
            <div className="flex min-w-0 items-center gap-3">
              <span className="size-2.5 shrink-0 rounded-full bg-destructive" />
              <span className="truncate text-lg font-semibold">Finalize product roadmap</span>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="rounded-full bg-status-progress-soft px-2.5 py-0.5 text-[11px] font-bold text-status-progress">
                In Progress
              </span>
              <ArrowRight className="size-4 text-primary" />
            </div>
          </div>
        </div>
      </div>

      <p className="relative z-10 text-[11px] font-bold text-[#c0c1ff]">
        Focused personal task management
      </p>
    </aside>
  );
}
