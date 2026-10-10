import type { Metadata } from "next";
import AuthPage from "@/components/auth-page";
import SignUpForm from "@/components/sign-up-form";

export const metadata: Metadata = {
  title: "সাইন আপ",
};

export default function SignUpPage() {
  return (
    <AuthPage
      title="অ্যাকাউন্ট তৈরি করুন"
      subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
    >
      <SignUpForm />
    </AuthPage>
  );
}
