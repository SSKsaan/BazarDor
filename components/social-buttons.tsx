"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

type SocialButtonsProps = {
  onBusy: (busy: boolean) => void;
};

export default function SocialButtons({ onBusy }: SocialButtonsProps) {
  const [busy, setBusy] = useState<"google" | "github" | null>(null);

  const handleSocial = async (provider: "google" | "github") => {
    setBusy(provider);
    onBusy(true);
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
    if (error) {
      toast.error(error.message ?? "কিছু ভুল হয়েছে");
      setBusy(null);
      onBusy(false);
    }
  };

  return (
    <>
      <div className="divider text-black/40 before:bg-black/40 after:bg-black/40">
        অথবা
      </div>
      <div className="flex flex-col gap-3 lg:flex-row">
        <button
          type="button"
          disabled={busy !== null}
          className="btn btn-outline whitespace-nowrap border-black/40 px-3 font-light text-black text-xs transition-all hover:-translate-y-0.5 hover:shadow-md lg:text-sm"
          onClick={() => handleSocial("google")}
        >
          {busy === "google" ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 lg:h-4 lg:w-4" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.9-.1-1.5-.3-2.2H12v4.1h6.5c-.1 1.1-.8 2.7-2.4 3.8l3.7 2.9c2.3-2.1 3.7-5.2 3.7-8.6z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.7-2.9c-1 .7-2.4 1.2-4.2 1.2-3.2 0-5.9-2.1-6.9-5l-3.9 3c2 3.9 5.9 6.6 10.8 6.6z"
              />
              <path
                fill="#FBBC05"
                d="M5.1 14.4c-.3-.8-.4-1.5-.4-2.4s.2-1.6.4-2.4l-3.9-3C.4 8.2 0 10 0 12s.4 3.8 1.2 5.4l3.9-3z"
              />
              <path
                fill="#EA4335"
                d="M12 4.8c2.3 0 3.8 1 4.7 1.8l3.4-3.3C17.9 1.2 15.2 0 12 0 7.1 0 3.2 2.7 1.2 6.6l3.9 3c1-2.9 3.7-4.8 6.9-4.8z"
              />
            </svg>
          )}
          Google দিয়ে চালিয়ে যান
        </button>
        <button
          type="button"
          disabled={busy !== null}
          className="btn btn-outline whitespace-nowrap border-black/40 px-3 font-light text-black text-xs transition-all hover:-translate-y-0.5 hover:shadow-md lg:text-sm"
          onClick={() => handleSocial("github")}
        >
          {busy === "github" ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 lg:h-4 lg:w-4"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
            </svg>
          )}
          GitHub দিয়ে চালিয়ে যান
        </button>
      </div>
    </>
  );
}
