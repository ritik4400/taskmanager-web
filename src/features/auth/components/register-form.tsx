"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, User, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/shared/form-field";
import { PasswordInput } from "@/components/shared/password-input";
import { ApiError } from "@/lib/api/api-error";
import { registerFormSchema, type RegisterFormInput } from "../schemas/auth.schemas";
import { register as registerUser } from "../services/auth.client";

export function RegisterForm() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInput>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "" },
  });

  async function onSubmit({ fullName, email, password }: RegisterFormInput) {
    setFormError(null);

    try {
      // confirmPassword is only for the form, the backend never receives it
      await registerUser({ fullName, email, password });
      router.replace("/tasks");
      router.refresh();
    } catch (error) {
      if (!(error instanceof ApiError)) {
        setFormError("Something went wrong. Please try again.");
        return;
      }

      // 409 = email already registered, show it under the email field
      if (error.status === 409) {
        setError("email", { message: error.message });
        return;
      }

      if (error.fieldErrors) {
        for (const [field, messages] of Object.entries(error.fieldErrors)) {
          if (field === "fullName" || field === "email" || field === "password") {
            setError(field, { message: messages[0] });
          }
        }
        return;
      }

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

      <FormField label="Full name" htmlFor="fullName" error={errors.fullName?.message}>
        <Input
          id="fullName"
          autoComplete="name"
          placeholder="Your full name"
          icon={<User />}
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          {...register("fullName")}
        />
      </FormField>

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
          autoComplete="new-password"
          placeholder="At least 8 characters"
          icon={<Lock />}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-error" : undefined}
          {...register("password")}
        />
      </FormField>

      <FormField
        label="Confirm password"
        htmlFor="confirmPassword"
        error={errors.confirmPassword?.message}
      >
        <PasswordInput
          id="confirmPassword"
          autoComplete="new-password"
          placeholder="Repeat your password"
          icon={<Lock />}
          aria-invalid={!!errors.confirmPassword}
          aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
          {...register("confirmPassword")}
        />
      </FormField>

      <Button type="submit" loading={isSubmitting} className="w-full">
        Create account
        {!isSubmitting ? <UserPlus /> : null}
      </Button>
    </form>
  );
}
