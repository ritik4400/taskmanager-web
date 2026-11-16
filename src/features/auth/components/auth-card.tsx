import type { ReactNode } from "react";

type AuthCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  footer: ReactNode;
  children: ReactNode;
};

export function AuthCard({ icon, title, description, footer, children }: AuthCardProps) {
  return (
    <div className="rounded-2xl bg-card p-6 shadow-card sm:p-10">
      <div className="mb-8">
        <div className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-muted text-primary [&_svg]:size-5">
          {icon}
        </div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
      </div>

      {children}

      <div className="mt-8 text-center text-sm text-muted-foreground">{footer}</div>
    </div>
  );
}
