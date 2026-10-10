"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { formatToday, initialsOf } from "@/lib/format";

const emptySubscribe = () => () => {};

export default function Navbar() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const today = useSyncExternalStore(
    emptySubscribe,
    () => formatToday(),
    () => "",
  );

  const closeMenu = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const handleSignOut = async () => {
    closeMenu();
    await authClient.signOut();
    toast.success("সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  return (
    <header className="w-full border-b border-black/20 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary">
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="9" cy="20" r="1.6" fill="#ffffff" stroke="none" />
              <circle cx="18" cy="20" r="1.6" fill="#ffffff" stroke="none" />
              <path d="M2 3h3l2.4 11.2a1.8 1.8 0 0 0 1.8 1.4h8.2a1.8 1.8 0 0 0 1.8-1.4L21 7H6" />
            </svg>
          </span>
          <span>
            <span className="block text-2xl font-bold leading-tight">বাজার দর</span>
            <span className="block text-sm leading-tight text-base-content/60">
              {today}
            </span>
          </span>
        </Link>

        {session ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="flex cursor-pointer items-center gap-2 rounded-full px-2.5 py-1.5 transition-transform duration-150 hover:bg-base-200 active:scale-95"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-primary text-base font-bold text-primary-content">
                {initialsOf(session.user.name)}
              </span>
              <span className="max-w-[10rem] truncate text-base">
                {session.user.name}
              </span>
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-50 mt-2 w-72 space-y-2 rounded-2xl border border-black/20 bg-white p-4 shadow-md"
            >
              <li className="px-3">
                <p className="font-bold text-base-content/60">
                  {session.user.name}
                </p>
                <p className="break-all text-base-content/60">
                  {session.user.email}
                </p>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="block w-full rounded-lg px-3 py-2 hover:bg-base-200"
                  onClick={closeMenu}
                >
                  👤 আমার প্রোফাইল
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="block w-full rounded-lg px-3 py-2 text-left text-error hover:bg-base-200"
                  onClick={handleSignOut}
                >
                  ↩ সাইন আউট
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/signin"
              className="btn btn-lg btn-outline btn-primary font-normal"
            >
              সাইন ইন
            </Link>
            <Link href="/signup" className="btn btn-lg btn-primary font-bold">
              সাইন আপ
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
