"use client";

import { useState, forwardRef } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { AuthPasswordFieldProps } from "../shared/props/AuthPasswordField.props";

const AuthPasswordField = forwardRef<HTMLInputElement, AuthPasswordFieldProps>(
  ({ label, error, className, ...props }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-bold text-foreground">{label}</label>

        <div className="group relative flex items-center">
          <Lock
            className={cn(
              "absolute left-4 size-5 transition-colors duration-200",
              "text-muted-foreground group-focus-within:text-primary",
              error && "text-destructive group-focus-within:text-destructive",
            )}
          />

          <input
            ref={ref}
            type={visible ? "text" : "password"}
            className={cn(
              "h-14 w-full rounded-xl border bg-muted pl-12 pr-12",
              "text-base font-medium text-foreground",
              "placeholder:text-muted-foreground/60",
              "outline-none ring-0 transition-all duration-200",
              "focus:border-primary focus:ring-2 focus:ring-primary/20",
              "dark:bg-white/5 dark:border-white/10",
              "dark:focus:border-primary",
              error
                ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                : "border-border",
              className,
            )}
            {...props}
          />

          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className={cn(
              "absolute right-4 flex items-center justify-center",
              "rounded-full p-1 transition-colors duration-200",
              "text-muted-foreground hover:text-primary",
              "hover:bg-primary/10",
            )}
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? (
              <EyeOff className="size-5" />
            ) : (
              <Eye className="size-5" />
            )}
          </button>
        </div>

        {error && (
          <p className="text-xs font-medium text-destructive">{error}</p>
        )}
      </div>
    );
  },
);

AuthPasswordField.displayName = "AuthPasswordField";

export { AuthPasswordField };
