"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import AuthCard from "@/components/auth-card";
import AuthField from "@/components/auth-field";
import SocialButtons from "@/components/social-buttons";

export default function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error("সব ঘর পূরণ করুন");
      return;
    }
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড মিলছে না");
      return;
    }
    setPending(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    if (error) {
      setPending(false);
      toast.error(
        error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL"
          ? "এই ইমেইলে অ্যাকাউন্ট আছে"
          : (error.message ?? "কিছু ভুল হয়েছে"),
      );
      return;
    }
    // autoSignIn stays on so the duplicate email gets its own error code; sign the fresh session out so the user lands on /signin.
    await authClient.signOut();
    setPending(false);
    toast.success("রেজিস্ট্রেশন সফল হয়েছে");
    router.push("/signin");
    router.refresh();
  };

  return (
    <AuthCard>
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthField
          id="name"
          label="নাম"
          type="text"
          placeholder="যেমন: রহিম উদ্দিন"
          value={name}
          onChange={setName}
        />
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
        <AuthField
          id="confirm-password"
          label="পাসওয়ার্ড নিশ্চিত করুন"
          type="password"
          placeholder="আবার লিখুন"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
        <button
          type="submit"
          className="btn btn-primary mt-2 w-full text-base font-bold"
          disabled={pending}
        >
          {pending && <span className="loading loading-spinner"></span>}
          অ্যাকাউন্ট তৈরি করুন
        </button>
      </form>
      <SocialButtons />
      <p className="mt-6 text-center text-base-content/60">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="text-primary underline">
          সাইন ইন করুন
        </Link>
      </p>
    </AuthCard>
  );
}
