"use client";

import { AuthFormField } from "@/components/auth/AuthFormField";
import { AuthHeroPanel } from "@/components/auth/AuthHeroPanel";
import { AuthPasswordField } from "@/components/auth/AuthPasswordField";
import { AuthRoleTab } from "@/components/auth/AuthRoleTab";
import { AuthSubmitButton } from "@/components/auth/AuthSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRegisterAdmin } from "@/hooks/mutations/useRegister";
import {
  registerAdminSchema,
  RegisterCustomerFormValues,
} from "@/schemas/auth.schema";
import { getErrorMessage } from "@/types/api.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Mail, MapPin, User } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function RegisterCustomerPage() {
  const { mutate, error, isPending } = useRegisterAdmin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCustomerFormValues>({
    resolver: zodResolver(registerAdminSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
    },
  });

  return (
    <>
      <AuthHeroPanel
        image="/images/Admin-sign-in.png"
        imageAlt="Modern office environment with data and dashboards"
        headline="Manage your business efficiently."
        subtext="Access powerful tools to oversee operations, track performance, and grow your delivery network."
      />

      <div className="w-full lg:w-1/2 h-full flex flex-col bg-white dark:bg-background overflow-y-auto scrollbar-hide">
        <AuthRoleTab />

        <div className="flex-1 flex flex-col justify-center items-center px-6 sm:px-12 py-10">
          <div className="w-full max-w-md flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
                Create Account
              </h1>
              <p className="text-muted-foreground text-base">
                Welcome! Please fill in your details to get started.
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="size-4" />
                <AlertDescription>{getErrorMessage(error)}</AlertDescription>
              </Alert>
            )}

            <form
              onSubmit={handleSubmit((v) => mutate(v))}
              className="flex flex-col gap-5"
            >
              <AuthFormField
                label="Full Name"
                icon={User}
                placeholder="Jon Doe"
                error={errors.name?.message}
                {...register("name")}
              />

              <AuthFormField
                label="Email Address"
                icon={Mail}
                type="email"
                placeholder="john@example.com"
                error={errors.email?.message}
                {...register("email")}
              />
              <AuthFormField
                label="Address"
                icon={MapPin}
                placeholder="123 Main Street"
                error={errors.address?.message}
                {...register("address")}
              />

              <AuthPasswordField
                label="Password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register("password")}
              />
              <AuthPasswordField
                label="Confirm Password"
                placeholder="••••••••"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />

              <AuthSubmitButton
                label="Create Account"
                loadingLabel="Creating account..."
                isLoading={isPending}
              />
            </form>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-primary hover:text-primary/80 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
