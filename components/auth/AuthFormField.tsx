import React, { forwardRef } from "react";
import { AuthFormFieldProps } from "../shared/props/AuthFormField.props";
import { cn } from "@/lib/utils";

const AuthFormField = forwardRef<HTMLInputElement, AuthFormFieldProps>(
  ({ label, icon: Icon, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-bold text-foreground">{label}</label>

        <div className="group relative flex items-center">
          <Icon
            className={cn(
              "absolute left-4 size-5 transition-colors duration-200",
              "text-muted-foreground group-focus-within:text-primary",
              error && "text-destructive group-focus-within:text-destructive",
            )}
          />

          {/* Input */}
          <input
            ref={ref}
            className={cn(
              // base
              "h-14 w-full rounded-xl border bg-muted pl-12 pr-4",
              "text-base font-medium text-foreground",
              "placeholder:text-muted-foreground/60",
              // focus
              "outline-none ring-0 transition-all duration-200",
              "focus:border-primary focus:ring-2 focus:ring-primary/20",
              // dark
              "dark:bg-white/5 dark:border-white/10",
              "dark:focus:border-primary",
              // error
              error
                ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                : "border-border",
              className,
            )}
            {...props}
          />
        </div>

        {error && (
          <p className="text-xs font-medium text-destructive">{error}</p>
        )}
      </div>
    );
  },
);

AuthFormField.displayName = "AuthFormField";

export { AuthFormField };
