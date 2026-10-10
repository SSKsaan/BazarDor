import type { Metadata } from "next";
import ProfileUpdateForm from "@/components/profile-update-form";
import SignOutButton from "@/components/sign-out-button";
import { initialsOf } from "@/lib/format";
import { requireSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "আমার প্রোফাইল",
};

export const instant = false;

export default async function ProfilePage() {
  const session = await requireSession();
  const initials = initialsOf(session.user.name);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="text-3xl font-bold">আমার প্রোফাইল</h1>
        <p className="mt-2 text-base-content/60">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
        <div className="mt-8 flex w-full flex-col gap-4 rounded-2xl border border-black/20 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-content">
              {initials}
            </div>
            <div>
              <p className="text-lg font-bold">{session.user.name}</p>
              <p className="text-base-content/60">{session.user.email}</p>
            </div>
          </div>
          <SignOutButton />
        </div>
        <section className="mt-6 w-full rounded-2xl border border-black/20 bg-white p-6">
          <ProfileUpdateForm currentName={session.user.name} />
        </section>
      </div>
    </main>
  );
}
