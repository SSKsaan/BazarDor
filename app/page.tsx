import { Suspense } from "react";
import AllProducts from "@/components/all-products";
import Hero from "@/components/hero";
import PriceMovers from "@/components/price-movers";

const moversFallback = (
  <div className="mt-10">
    <div className="skeleton h-8 w-56" />
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="skeleton h-48" />
      <div className="skeleton h-48" />
      <div className="skeleton h-48" />
      <div className="skeleton h-48" />
      <div className="skeleton h-48" />
      <div className="skeleton h-48" />
    </div>
  </div>
);

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      <Hero />
      <Suspense fallback={moversFallback}>
        <PriceMovers direction="up" />
      </Suspense>
      <Suspense fallback={moversFallback}>
        <PriceMovers direction="down" />
      </Suspense>
      <Suspense
        fallback={
          <div>
            <div className="skeleton h-8 w-40" />
            <div className="mt-6 flex items-center justify-between gap-3">
              <div className="skeleton h-5 w-40" />
              <div className="skeleton h-10 w-40" />
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="skeleton h-48" />
              <div className="skeleton h-48" />
              <div className="skeleton h-48" />
            </div>
          </div>
        }
      >
        <AllProducts />
      </Suspense>
    </main>
  );
}
