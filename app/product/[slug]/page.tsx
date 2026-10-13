import { Suspense } from "react";
import ProductDetails from "@/components/product-details";

const productFallback = (
  <>
    <div className="skeleton h-6 w-64" />
    <section className="mt-6 flex flex-col gap-6 rounded-2xl border border-black/20 bg-white p-6 lg:flex-row">
      <div className="flex flex-1 items-center gap-4">
        <div className="skeleton h-24 w-24 shrink-0 rounded-2xl" />
        <div className="flex-1">
          <div className="skeleton h-9 w-3/4" />
          <div className="skeleton mt-2 h-5 w-1/2" />
        </div>
      </div>
      <div className="skeleton w-full rounded-2xl p-6 lg:w-64">
        <div className="skeleton mx-auto h-5 w-20 bg-white/60" />
        <div className="mx-auto mt-2 h-9 w-28 rounded-lg bg-white/60" />
      </div>
    </section>
    <section className="mt-8 rounded-2xl border border-black/20 bg-white p-6">
      <div className="skeleton h-7 w-48" />
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="skeleton h-28 rounded-2xl" />
        <div className="skeleton h-28 rounded-2xl" />
        <div className="skeleton h-28 rounded-2xl" />
      </div>
      <div className="skeleton mt-6 h-7 w-64" />
      <div className="mt-4 overflow-hidden rounded-2xl border border-black/20">
        <div className="skeleton h-12 w-full rounded-none" />
        <div className="skeleton h-12 w-full rounded-none" />
        <div className="skeleton h-12 w-full rounded-none" />
        <div className="skeleton h-12 w-full rounded-none" />
      </div>
    </section>
  </>
);

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 tracking-wide">
      <Suspense fallback={productFallback}>
        <ProductDetails params={params} />
      </Suspense>
    </main>
  );
}
