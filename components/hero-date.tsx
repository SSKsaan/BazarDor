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

  return (
    <p className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm text-primary">
      {today}
    </p>
  );
}
