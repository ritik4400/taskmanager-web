import type { Metadata } from "next";
import Link from "next/link";
import { LockOpen } from "lucide-react";
import { AuthCard } from "@/features/auth/components/auth-card";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <AuthCard
      icon={<LockOpen />}
      title="Welcome back"
      description="Log in to continue to your tasks"
      footer={
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-primary hover:underline">
            Sign up
          </Link>
        </p>
      }
    >
      <LoginForm />
    </AuthCard>
  );
}
