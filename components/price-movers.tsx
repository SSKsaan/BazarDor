import ProductGrid from "./product-grid";
import { changeColorClass } from "@/lib/format";
import { getProducts } from "@/lib/api";

type PriceMoversProps = {
  direction: "up" | "down";
};

export default async function PriceMovers({ direction }: PriceMoversProps) {
  const products = await getProducts();
  const movers = products
    .filter((product) => product.change.dir === direction)
    .sort((a, b) =>
      direction === "up"
        ? b.change.pct - a.change.pct
        : a.change.pct - b.change.pct,
    )
    .slice(0, 6);
  const title = direction === "up" ? "আজ দাম বেড়েছে" : "আজ দাম কমেছে";
  const arrow = direction === "up" ? "▲" : "▼";

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold">
        <span className={changeColorClass(direction)}>{arrow}</span> {title}
      </h2>
      <div className="mt-2">
        <ProductGrid products={movers} />
      </div>
    </section>
  );
}
