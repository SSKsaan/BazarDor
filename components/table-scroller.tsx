"use client";

import { useRef } from "react";
import type { ReactNode } from "react";

type TableScrollerProps = {
  title: string;
  children: ReactNode;
};

export default function TableScroller({ title, children }: TableScrollerProps) {
  const scroller = useRef<HTMLDivElement>(null);

  function slide(direction: number) {
    scroller.current?.scrollBy({ left: direction * 280, behavior: "smooth" });
  }

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-medium sm:text-xl">{title}</h2>
        <div className="flex shrink-0 gap-1 lg:hidden">
          <button
            type="button"
            aria-label="বামে দেখুন"
            className="rounded-lg hover:bg-base-200"
            onClick={() => slide(-1)}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 rotate-90"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="ডানে দেখুন"
            className="rounded-lg hover:bg-base-200"
            onClick={() => slide(1)}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 -rotate-90"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
      </div>
      <div
        ref={scroller}
        className="mt-4 overflow-x-auto rounded-2xl border border-black/20"
      >
        {children}
      </div>
    </div>
  );
}
