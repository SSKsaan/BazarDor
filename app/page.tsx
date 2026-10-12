import { Suspense } from "react";
import AllProducts from "@/components/all-products";
import Hero from "@/components/hero";
import PriceMovers from "@/components/price-movers";
import ProductCardSkeleton from "@/components/product-card-skeleton";

const skeletonGrid = (
  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <ProductCardSkeleton />
    <ProductCardSkeleton />
    <ProductCardSkeleton />
    <ProductCardSkeleton />
    <ProductCardSkeleton />
    <ProductCardSkeleton />
  </div>
);

const moversFallback = (
  <div className="mt-10">
    <div className="skeleton h-8 w-56" />
    {skeletonGrid}
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
            {skeletonGrid}
          </div>
        }
      >
        <AllProducts />
      </Suspense>
    </main>
  );
}
