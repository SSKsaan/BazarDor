"use client";

import { useSyncExternalStore } from "react";
import { formatToday } from "@/lib/format";

const emptySubscribe = () => () => {};

export default function HeroDate() {
  const today = useSyncExternalStore(
    emptySubscribe,
    () => formatToday(),
    () => "",
  );

  if (!today) {
    return <p className="skeleton h-7 w-48 rounded-full" aria-hidden="true" />;
  }

  return (
    <p className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm text-primary">
      {today}
    </p>
  );
}
