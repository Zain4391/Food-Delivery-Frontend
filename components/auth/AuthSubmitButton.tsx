import { cn } from "@/lib/utils";
import { AuthSubmitButtonProps } from "../shared/props/AuthSubmitButton.props";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

export function AuthSubmitButton({
  label,
  loadingLabel = "Please wait...",
  isLoading = false,
  className,
}: AuthSubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={cn(
        "w-full h-14 rounded-xl text-base font-bold tracking-wide",
        "bg-primary hover:bg-primary/90 active:scale-[0.98]",
        "shadow-lg shadow-primary/30 transition-all duration-200",
        className,
      )}
    >
      {isLoading ? (
        <>
          <Loader2 className="size-5 animate-spin" />
          {loadingLabel}
        </>
      ) : (
        label
      )}
    </Button>
  );
}
