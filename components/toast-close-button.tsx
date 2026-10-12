"use client";

import type { MouseEvent } from "react";

type ToastCloseButtonProps = {
  closeToast?: () => void;
};

export default function ToastCloseButton({ closeToast }: ToastCloseButtonProps) {
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    closeToast?.();
  }

  return (
    <button
      type="button"
      aria-label="বন্ধ করুন"
      onClick={handleClick}
      className="absolute right-2 top-2 p-1 text-xl font-bold leading-none text-base-content/70"
    >
      ×
    </button>
  );
}
