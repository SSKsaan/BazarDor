"use client";

import { use } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/types";

type CategoryRowProps = {
  categories: Promise<Category[]>;
};

export default function CategoryRow({ categories }: CategoryRowProps) {
  const pathname = usePathname();
  const list = use(categories);

  return (
    <nav className="border-b border-black/10 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-2 gap-y-2 px-4 py-2 sm:gap-x-4">
        {list.map((category) => {
          const active = pathname === `/category/${category.slug}`;
          return (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              aria-current={active ? "page" : undefined}
              className={
                active
                  ? "rounded-lg bg-primary px-2 py-1.5 text-xs font-semibold text-primary-content sm:text-sm"
                  : "rounded-lg px-2 py-1.5 text-xs font-semibold hover:bg-base-200 sm:text-sm"
              }
            >
              {category.icon} {category.nameBn}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
