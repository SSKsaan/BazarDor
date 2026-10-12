import { notFound } from "next/navigation";
import EmptyState from "@/components/empty-state";
import ProductList from "@/components/product-list";
import { getCategory, getProducts } from "@/lib/api";
import { formatPriceNumber } from "@/lib/format";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) {
    notFound();
  }
  const products = await getProducts(slug);
  if (products.length === 0) {
    return <EmptyState message="এই ক্যাটাগরিতে এখনো কোনো পণ্য নেই।" />;
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      <section className="flex items-center gap-4 rounded-2xl border border-black/20 bg-white p-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-white">
          <p className="text-5xl leading-none">{category.icon}</p>
        </div>
        <div className="leading-tight">
          <h1 className="text-3xl font-semibold">{category.nameBn}</h1>
          <p className="text-base text-base-content/60">
            {formatPriceNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </section>
      <div className="mt-6">
        <ProductList products={products} />
      </div>
    </main>
  );
}
