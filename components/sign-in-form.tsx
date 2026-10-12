"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import AuthCard from "@/components/auth-card";
import AuthField from "@/components/auth-field";
import SocialButtons from "@/components/social-buttons";

export default function SignInForm({ redirected }: { redirected: boolean }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [socialBusy, setSocialBusy] = useState(false);

  useEffect(() => {
    if (redirected) {
      toast.error("আগে সাইন ইন করুন");
    }
  }, [redirected]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error("সব ঘর পূরণ করুন");
      return;
    }
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }
    setPending(true);
    const { error } = await authClient.signIn.email({ email, password });
    setPending(false);
    if (error) {
      toast.error(
        error.message === "Invalid email or password"
          ? "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে"
          : error.message,
      );
      return;
    }
    toast.success("সাইন ইন সফল হয়েছে");
    router.push("/");
    router.refresh();
  };

  return (
    <AuthCard>
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthField
          id="email"
          label="ইমেইল"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={setEmail}
        />
        <AuthField
          id="password"
          label="পাসওয়ার্ড"
          type="password"
          placeholder="কমপক্ষে ৮ অক্ষর"
          value={password}
          onChange={setPassword}
        />
        <button
          type="submit"
          className="btn btn-primary mt-2 w-full text-base font-bold"
          disabled={pending || socialBusy}
        >
          {(pending || socialBusy) && (
            <span className="loading loading-spinner"></span>
          )}
          সাইন ইন
        </button>
      </form>
      <SocialButtons onBusy={setSocialBusy} />
      <p className="mt-6 text-center text-base-content/60">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="text-primary underline">
          সাইন আপ করুন
        </Link>
      </p>
    </AuthCard>
  );
}
