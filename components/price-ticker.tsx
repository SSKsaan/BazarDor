import { getProducts } from "@/lib/api";
import {
  changeColorClass,
  formatChange,
  formatPriceNumber,
  shortUnitLabel,
} from "@/lib/format";

export default async function PriceTicker() {
  const products = await getProducts();
  const loop = [...products, ...products];

  return (
    <div className="overflow-hidden border-b border-black/10 bg-white">
      <div className="ticker-track flex w-max items-center gap-8 whitespace-nowrap py-1">
        {loop.map((product, index) => (
          <span
            key={`${product.slug}-${index}`}
            aria-hidden={index >= products.length ? true : undefined}
            className="text-base"
          >
            {product.image} {product.nameBn}{" "}
            {formatPriceNumber(product.today)} টাকা/
            {shortUnitLabel(product.unit)}{" "}
            <span className={changeColorClass(product.change.dir)}>
              {formatChange(product.change)}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
