import { useLogin } from "@/hooks/queries/useLogin";
import { LoginFormValues, loginSchema } from "@/schemas/auth.schema";
import { UserType } from "@/types/auth.types";
import { ROLE_CONFIG } from "@/types/map";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription } from "../ui/alert";
import { AlertCircle, Mail } from "lucide-react";
import { AuthFormField } from "./AuthFormField";
import { AuthPasswordField } from "./AuthPasswordField";
import { AuthSubmitButton } from "./AuthSubmitButton";
import Link from "next/link";

export function LoginForm({ userType }: { userType: UserType }) {
  const { login, isLoading, error } = useLogin(userType);
  const config = ROLE_CONFIG[userType];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <form onSubmit={handleSubmit(login)} className="flex flex-col gap-5">
      {/* Server / NextAuth error */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <AuthFormField
        label="Email Address"
        icon={Mail}
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <AuthPasswordField
        label="Password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register("password")}
      />

      <AuthSubmitButton
        label={`Sign in as ${config.label}`}
        loadingLabel="Signing in..."
        isLoading={isLoading}
      />

      {config.register && (
        <p className="text-center text-sm text-muted-foreground">
          Do not have an account?{" "}
          <Link
            href={config.register.href}
            className="font-bold text-primary hover:text-primary/80 transition-colors"
          >
            {config.register.label}
          </Link>
        </p>
      )}
    </form>
  );
}
