"use client";

import { useState } from "react";
import ProductGrid from "./product-grid";
import { formatPriceNumber } from "@/lib/format";
import type { Product } from "@/lib/types";

type ProductListProps = {
  products: Product[];
};

type SortOrder = "default" | "asc" | "desc";

export default function ProductList({ products }: ProductListProps) {
  const [sort, setSort] = useState<SortOrder>("default");

  function handleChange(value: string) {
    if (value === "asc" || value === "desc") {
      setSort(value);
    } else {
      setSort("default");
    }
  }

  const shown =
    sort === "default"
      ? products
      : [...products].sort((a, b) =>
          sort === "asc" ? a.today - b.today : b.today - a.today,
        );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="min-w-0 text-sm sm:text-base">মোট {formatPriceNumber(products.length)}টি পণ্য দেখানো হচ্ছে</p>
        <div className="flex shrink-0 items-center gap-2">
          <div className="relative">
            <select
              aria-label="সাজান:"
              value={sort}
              onChange={(e) => {
                handleChange(e.target.value);
                e.currentTarget.blur();
              }}
              className="peer w-40 appearance-none rounded-lg border border-black/20 bg-white py-2 pl-3 pr-8 text-sm"
            >
              <option value="default">ডিফল্ট</option>
              <option value="asc">দাম: কম থেকে বেশি</option>
              <option value="desc">দাম: বেশি থেকে কম</option>
            </select>
            <svg
              viewBox="0 0 24 24"
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-transform peer-focus:rotate-180"
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
        </div>
      </div>
      <div className="mt-6">
        <ProductGrid products={shown} />
      </div>
    </div>
  );
}
