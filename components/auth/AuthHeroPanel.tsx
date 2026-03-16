import React from "react";
import { AuthHeroPanelProps } from "../shared/props/authHeroPanel.prop";
import Image from "next/image";

export function AuthHeroPanel({
  image,
  imageAlt,
  headline,
  subtext,
}: AuthHeroPanelProps) {
  return (
    <div className="hidden lg:block lg:w-1/2 relative w-full">
      <Image
        src={image}
        alt={imageAlt}
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent">
        <div className="absolute inset-0 flex flex-col justify-end p-12 xl:p-16">
          <div className="max-w-lg space-y-3">
            <h2 className="text-white text-4xl xl:text-5xl font-black leading-tight tracking-tight drop-shadow-sn">
              {headline}
            </h2>
            <p className="text-white/90 text-lg xl:text-xl font-medium leading-relaxed drop-shadow-md">
              {subtext}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
