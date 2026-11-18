import { Suspense } from "react";
import { AppHeader, AppHeaderSkeleton } from "@/components/layout/app-header";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback={<AppHeaderSkeleton />}>
        <AppHeader />
      </Suspense>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8">{children}</main>

      <footer className="border-t border-border bg-card py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 text-xs text-muted-foreground sm:px-6">
          <span>TaskFlow</span>
          <span className="hidden sm:inline">Focused personal task management</span>
        </div>
      </footer>
    </div>
  );
}
