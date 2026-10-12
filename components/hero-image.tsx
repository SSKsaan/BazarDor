"use client";

import { useState } from "react";
import Image from "next/image";
import heroImage from "../public/hero.png";

export default function HeroImage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full max-w-md">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-base-100">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      )}
      <Image
        src={heroImage}
        alt="সবজির ঝুড়ি"
        priority
        quality={100}
        onLoad={() => setLoaded(true)}
        className={`h-auto w-full ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
