import type { Metadata } from "next";
import Link from "next/link";
import { UserPlus } from "lucide-react";
import { AuthCard } from "@/features/auth/components/auth-card";
import { RegisterForm } from "@/features/auth/components/register-form";

export const metadata: Metadata = { title: "Create account" };

export default function RegisterPage() {
  return (
    <AuthCard
      icon={<UserPlus />}
      title="Create your account"
      description="Start organizing your tasks in one place"
      footer={
        <p>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Log in
          </Link>
        </p>
      }
    >
      <RegisterForm />
    </AuthCard>
  );
}
