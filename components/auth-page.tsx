import type { ReactNode } from "react";
import Link from "next/link";

type AuthPageProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export default function AuthPage({ title, subtitle, children }: AuthPageProps) {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center px-4 py-12">
      <h1 className="text-center text-3xl font-bold">{title}</h1>
      <p className="mt-2 text-center text-base-content/60">{subtitle}</p>
      {children}
      <Link href="/" className="mt-6 text-base-content/60 underline">
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}
