import ProductList from "./product-list";
import { getProducts } from "@/lib/api";

export default async function AllProducts() {
  const products = await getProducts();

  return (
    <section id="সব-পণ্য" className="scroll-mt-28">
      <h2 className="text-2xl font-bold">সব পণ্য</h2>
      <div className="mt-2">
        <ProductList products={products} />
      </div>
    </section>
  );
}
