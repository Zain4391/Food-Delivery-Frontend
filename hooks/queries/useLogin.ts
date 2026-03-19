import { LoginFormValues } from "@/schemas/auth.schema";
import { getErrorMessage } from "@/types/api.types";
import { UserType } from "@/types/auth.types";
import { PROVIDER_MAP, REDIRECT_MAP } from "@/types/map";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useLogin(userType: UserType) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (values: LoginFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn(PROVIDER_MAP[userType], {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        return;
      }

      router.push(REDIRECT_MAP[userType]);
      router.refresh();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}
