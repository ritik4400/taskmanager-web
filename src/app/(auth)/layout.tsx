import { Logo } from "@/components/shared/logo";
import { AuthBrandPanel } from "@/features/auth/components/auth-brand-panel";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <AuthBrandPanel />

      <main className="flex flex-1 items-center justify-center bg-background p-4 sm:p-8 lg:p-16">
        <div className="w-full max-w-[420px]">
          <Logo className="mb-8 justify-center md:hidden" />
          {children}
        </div>
      </main>
    </div>
  );
}
