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
  const { data: session, isPending } = authClient.useSession();
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
    <header className="w-full border-b border-black/5 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:gap-4">
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-primary sm:h-10 sm:w-10">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 sm:h-6 sm:w-6"
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
            <span className="block text-xl font-bold leading-tight sm:text-2xl">বাজার দর</span>
            {today ? (
              <span className="block whitespace-nowrap text-xs leading-tight text-base-content/60 sm:text-sm">
                {today}
              </span>
            ) : (
              <span
                className="skeleton block h-4 w-22 sm:w-44"
                aria-hidden="true"
              />
            )}
          </span>
        </Link>

        {isPending ? (
          <div className="flex items-center gap-2">
            <div className="skeleton h-12 w-24 rounded-lg" />
            <div className="skeleton h-12 w-24 rounded-lg" />
          </div>
        ) : session ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="flex cursor-pointer items-center gap-2 rounded-full px-2.5 py-1.5 transition-transform duration-150 hover:bg-base-200 focus-within:bg-base-200 active:scale-95"
            >
              <span className="order-last flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-primary text-base font-bold text-primary-content">
                {initialsOf(session.user.name)}
              </span>
              <span className="hidden max-w-[10rem] truncate text-base sm:inline">
                {session.user.name}
              </span>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-50 mt-2 w-72 rounded-2xl border border-black/20 bg-white p-4 shadow-md"
            >
              <li className="px-3">
                <p className="font-bold text-base-content/60">
                  {session.user.name}
                </p>
                <p className="break-all text-base-content/60">
                  {session.user.email}
                </p>
              </li>
              <li className="mt-2">
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
              className="btn btn-sm btn-outline btn-primary font-normal sm:btn-md lg:btn-lg"
            >
              সাইন ইন
            </Link>
            <Link
              href="/signup"
              className="btn btn-sm btn-primary font-bold sm:btn-md lg:btn-lg"
            >
              সাইন আপ
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
