"use client";

import { useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AvatarUploadProps {
  currentImageUrl?: string | null;
  initials: string;
  onUpload: (file: File) => void;
  isPending: boolean;
  className?: string;
}

export function AvatarUpload({
  currentImageUrl,
  initials,
  onUpload,
  isPending,
  className,
}: AvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Show local preview immediately
    const url = URL.createObjectURL(file);
    setPreview(url);
    onUpload(file);
    // Reset input so the same file can be re-selected
    e.target.value = "";
  };

  const displayImage = preview ?? currentImageUrl ?? "";

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="relative">
        <Avatar className="h-20 w-20">
          <AvatarImage src={displayImage} alt="Profile picture" />
          <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        {/* Camera overlay button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isPending}
          className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {isPending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Camera className="h-3.5 w-3.5" />
          )}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={isPending}
        onClick={() => fileInputRef.current?.click()}
      >
        {isPending ? "Uploading…" : "Change Photo"}
      </Button>
    </div>
  );
}
