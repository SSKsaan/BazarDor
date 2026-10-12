import Link from "next/link";
import { formatChange, formatPriceNumber, unitLabel } from "@/lib/format";
import type { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const badgeColor =
    product.change.dir === "up"
      ? "text-error"
      : product.change.dir === "down"
        ? "text-primary"
        : "text-base-content/60";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-2xl border border-black/20 bg-white p-4 transition hover:border-primary hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-base-100 text-4xl">
          {product.image}
        </div>
        <div className="leading-tight">
          <p className="text-xl font-semibold">{product.nameBn}</p>
          <p className="text-sm text-base-content/60">
            {unitLabel(product.unit)}
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm text-base-content/60">আজকের দাম</p>
      <div className="flex items-center justify-between gap-2">
        <p className="text-2xl font-bold">
          {formatPriceNumber(product.today)}{" "}
          <span className="text-sm font-normal">টাকা</span>
        </p>
        <p
          className={`shrink-0 rounded-full bg-base-100 px-3 py-1 text-sm font-bold ${badgeColor}`}
        >
          {formatChange(product.change, true)}
        </p>
      </div>
    </Link>
  );
}
