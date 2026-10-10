import type { ReactNode } from "react";

export default function AuthCard({ children }: { children: ReactNode }) {
  return (
    <div className="mt-8 w-full max-w-md rounded-2xl border border-black/20 bg-white p-6 sm:p-8">
      {children}
    </div>
  );
}
