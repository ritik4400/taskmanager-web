import { Logo } from "@/components/shared/logo";
import { UserMenu } from "@/features/auth/components/user-menu";
import { requireUser } from "@/features/auth/services/current-user";

const headerClasses =
  "sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-md supports-[backdrop-filter]:bg-card/70";

export async function AppHeader() {
  const user = await requireUser();

  return (
    <header className={headerClasses}>
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <UserMenu name={user.name} email={user.email} />
      </div>
    </header>
  );
}

export function AppHeaderSkeleton() {
  return (
    <header className={headerClasses}>
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <div className="size-8 animate-pulse rounded-full bg-muted" />
      </div>
    </header>
  );
}
