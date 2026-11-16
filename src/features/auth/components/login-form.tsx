"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, LogIn, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/shared/form-field";
import { PasswordInput } from "@/components/shared/password-input";
import { ApiError } from "@/lib/api/api-error";
import { loginSchema, type LoginInput } from "../schemas/auth.schemas";
import { login } from "../services/auth.client";

export function LoginForm() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginInput) {
    setFormError(null);

    try {
      await login(values);
      router.replace("/tasks");
      router.refresh();
    } catch (error) {
      if (!(error instanceof ApiError)) {
        setFormError("Something went wrong. Please try again.");
        return;
      }

      // Field-level errors from the server go under the matching input
      if (error.fieldErrors) {
        for (const [field, messages] of Object.entries(error.fieldErrors)) {
          if (field === "email" || field === "password") {
            setError(field, { message: messages[0] });
          }
        }
        return;
      }

      // Everything else (wrong password, server down) goes in the banner
      setFormError(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {formError ? (
        <div
          role="alert"
          className="rounded-xl bg-error-soft/50 px-4 py-3 text-sm font-medium text-on-error-soft"
        >
          {formError}
        </div>
      ) : null}

      <FormField label="Email address" htmlFor="email" error={errors.email?.message}>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          icon={<Mail />}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
        />
      </FormField>

      <FormField label="Password" htmlFor="password" error={errors.password?.message}>
        <PasswordInput
          id="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          icon={<Lock />}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-error" : undefined}
          {...register("password")}
        />
      </FormField>

      <Button type="submit" loading={isSubmitting} className="w-full">
        Log in
        {!isSubmitting ? <LogIn /> : null}
      </Button>
    </form>
  );
}
