import type { Metadata } from "next";
import AuthPage from "@/components/auth-page";
import SignInForm from "@/components/sign-in-form";

export const metadata: Metadata = {
  title: "সাইন ইন",
};

export const instant = false;

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ redirected?: string }>;
}) {
  const { redirected } = await searchParams;

  return (
    <AuthPage
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
    >
      <SignInForm redirected={redirected === "true"} />
    </AuthPage>
  );
}
