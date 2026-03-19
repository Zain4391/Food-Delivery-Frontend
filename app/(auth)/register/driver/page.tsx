"use client";

import { AuthFormField } from "@/components/auth/AuthFormField";
import { AuthHeroPanel } from "@/components/auth/AuthHeroPanel";
import { AuthPasswordField } from "@/components/auth/AuthPasswordField";
import { AuthRoleTab } from "@/components/auth/AuthRoleTab";
import { AuthSubmitButton } from "@/components/auth/AuthSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRegisterDriver } from "@/hooks/mutations/useRegister";
import {
  RegisterDriverFormValues,
  registerDriverSchema,
} from "@/schemas/auth.schema";
import { getErrorMessage } from "@/types/api.types";
import { VEHICLE_TYPE } from "@/types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, User, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

export default function RegisterDriverPage() {
  const { mutate, isPending, error } = useRegisterDriver();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterDriverFormValues>({
    resolver: zodResolver(registerDriverSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      vehicle_type: VEHICLE_TYPE.BIKE,
    },
  });

  return (
    <>
      <AuthHeroPanel
        image="/images/Driver-sign-in.png"
        imageAlt="Smiling delivery person with helmet standing next to scooter"
        headline="Deliver with us and earn"
        subtext="Join our fleet of drivers. Enjoy flexible hours, competitive earnings, and the freedom of the road."
      />

      <div className="w-full lg:w-1/2 h-full flex flex-col bg-white dark:bg-background overflow-y-auto scrollbar-hide">
        <AuthRoleTab />

        <div className="flex-1 flex flex-col justify-center items-center px-6 sm:px-12 py-10">
          <div className="w-full max-w-md flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
                Driver Registration
              </h1>
              <p className="text-muted-foreground text-base">
                Enter your details and vehicle info to get started.
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
                placeholder="John Doe"
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
                label="Phone Number"
                icon={Phone}
                type="tel"
                placeholder="03001234567"
                error={errors.phone?.message}
                {...register("phone")}
              />

              {/* Vehicle type — shadcn Select via Controller */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-foreground">
                  Vehicle Type
                </label>
                <Controller
                  name="vehicle_type"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="h-14 rounded-xl border-border bg-muted px-4 text-base font-medium dark:bg-white/5 dark:border-white/10">
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={VEHICLE_TYPE.BIKE}>Bike</SelectItem>
                        <SelectItem value={VEHICLE_TYPE.CAR}>Car</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.vehicle_type && (
                  <p className="text-xs font-medium text-destructive">
                    {errors.vehicle_type.message}
                  </p>
                )}
              </div>

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
                label="Register as Driver"
                loadingLabel="Registering..."
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
