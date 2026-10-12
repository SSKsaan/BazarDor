import { Suspense } from "react";
import CategoryRow from "./category-row";
import { getCategories } from "@/lib/api";

export default function CategoryRowShell() {
  const categories = getCategories();

  return (
    <Suspense
      fallback={
        <div className="border-b border-black/10 bg-white">
          <div className="mx-auto w-full max-w-6xl px-4 py-2">
            <div className="skeleton h-9 w-full" />
          </div>
        </div>
      }
    >
      <CategoryRow categories={categories} />
    </Suspense>
  );
}
