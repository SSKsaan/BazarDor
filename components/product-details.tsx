import Link from "next/link";
import { notFound } from "next/navigation";
import TableScroller from "./table-scroller";
import { getProduct } from "@/lib/api";
import {
  changeColorClass,
  formatChange,
  formatPrice,
  formatPriceNumber,
  shortUnitLabel,
  unitLabel,
} from "@/lib/format";

export default async function ProductDetails({ slug }: { slug: string }) {
  const product = await getProduct(slug);
  if (!product) {
    notFound();
  }
  const diff = Math.abs(product.today - product.yesterday);
  const dirWord =
    product.change.dir === "up"
      ? "বেড়েছে"
      : product.change.dir === "down"
        ? "কমেছে"
        : "স্থির আছে";
  const dirColor = changeColorClass(product.change.dir);
  const minPrice = Math.min(...product.markets.map((market) => market.min));
  const maxPrice = Math.max(...product.markets.map((market) => market.max));
  const avgPrice = Math.round(
    product.markets.reduce(
      (sum, market) => sum + (market.min + market.max) / 2,
      0,
    ) / product.markets.length,
  );
  const avgColor = avgPrice <= product.today ? "text-primary" : "text-error";

  return (
    <>
      <nav className="text-base text-base-content/60">
        <Link href="/" className="hover:text-base-content hover:underline">
          হোম
        </Link>
        <span className="mx-2">&gt;</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-base-content hover:underline"
        >
          {product.categoryNameBn}
        </Link>
        <span className="mx-2">&gt;</span>
        <span aria-current="page">{product.nameBn}</span>
      </nav>
      <section className="mt-6 flex flex-col gap-6 rounded-2xl border border-black/20 bg-white p-6 lg:flex-row">
        <div className="flex flex-1 items-center gap-4 lg:self-center">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-base-100 text-6xl">
            {product.image}
          </div>
          <div className="leading-tight">
            <h1 className="text-4xl font-medium">{product.nameBn}</h1>
            <p className="text-base text-base-content/60">
              {unitLabel(product.unit)} · {product.categoryNameBn}
            </p>
            <p className="hidden text-base lg:block">
              গতকালের তুলনায় আজ দাম{" "}
              <span className="font-bold">{dirWord}</span> ·{" "}
              {formatPrice(diff)}
            </p>
          </div>
        </div>
        <p className="overflow-x-auto whitespace-nowrap text-center text-sm lg:hidden">
          গতকালের তুলনায় আজ দাম{" "}
          <span className="font-bold">{dirWord}</span> · {formatPrice(diff)}
        </p>
        <div className="w-full rounded-2xl bg-base-100 px-6 py-4 text-center leading-tight lg:w-fit">
          <p className="text-lg">আজকের দাম</p>
          <p className="text-4xl font-bold">
            {formatPriceNumber(product.today)}
          </p>
          <p className="text-lg text-base-content/60">
            টাকা / {shortUnitLabel(product.unit)}
          </p>
          <p className={`text-lg font-bold ${dirColor}`}>
            {formatChange(product.change)}
          </p>
        </div>
      </section>
      <section className="mt-8 rounded-2xl border border-black/20 bg-white p-6">
        <h2 className="text-xl font-medium">দামের সারসংক্ষেপ</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-black/20 bg-white px-8 py-4 leading-none">
            <p className="text-base text-base-content/60">সর্বনিম্ন দাম</p>
            <p className="text-xl text-primary">
              <span className="text-3xl font-bold">
                {formatPriceNumber(minPrice)}
              </span>{" "}
              টাকা
            </p>
            <p className="text-base text-base-content/60">
              সবচেয়ে কম দামের বাজার
            </p>
          </div>
          <div className="rounded-2xl border border-black/20 bg-white px-8 py-4 leading-none">
            <p className="text-base text-base-content/60">সর্বাধিক দাম</p>
            <p className="text-xl text-error">
              <span className="text-3xl font-bold">
                {formatPriceNumber(maxPrice)}
              </span>{" "}
              টাকা
            </p>
            <p className="text-base text-base-content/60">
              সবচেয়ে বেশি দামের বাজার
            </p>
          </div>
          <div className="rounded-2xl border border-black/20 bg-white px-8 py-4 leading-none">
            <p className="text-base text-base-content/60">গড় দাম</p>
            <p className={`text-xl ${avgColor}`}>
              <span className="text-3xl font-bold">
                {formatPriceNumber(avgPrice)}
              </span>{" "}
              টাকা
            </p>
            <p className="text-base text-base-content/60">
              প্রতি কেজি-এর হিসাবে
            </p>
          </div>
        </div>
        <TableScroller title="বাজারভিত্তিক আজকের দাম">
          <table className="w-full tabular-nums">
            <thead>
              <tr className="border-b border-black/20 bg-white text-base font-normal text-base-content/60">
                <th className="px-5 py-3 text-left">বাজার</th>
                <th className="px-5 py-3 text-left">বিভাগ</th>
                <th className="px-5 py-3 text-right">সর্বনিম্ন</th>
                <th className="px-5 py-3 text-right">সর্বাধিক</th>
                <th className="px-5 py-3 text-right">গড়</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {product.markets.map((market, index) => (
                <tr
                  key={`${market.market}-${market.division}`}
                  className={index % 2 === 0 ? "bg-white" : "bg-base-100"}
                >
                  <td className="px-5 py-3 text-base-content/60">
                    {market.market}
                  </td>
                  <td className="px-5 py-3 text-base-content/60">
                    {market.division}
                  </td>
                  <td className="px-5 py-3 text-right text-base-content/60">
                    {formatPrice(market.min)}
                  </td>
                  <td className="px-5 py-3 text-right text-base-content/60">
                    {formatPrice(market.max)}
                  </td>
                  <td className="px-5 py-3 text-right font-normal">
                    {formatPrice((market.min + market.max) / 2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableScroller>
      </section>
    </>
  );
}
