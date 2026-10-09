import type { Category, Product } from "./types";

const baseUrl = process.env.API_BASE_URL;

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${baseUrl}/categories`);
  if (!response.ok) {
    throw new Error(`Could not load categories (${response.status})`);
  }
  return (await response.json()) as Category[];
}

export async function getCategory(slug: string): Promise<Category | null> {
  const response = await fetch(`${baseUrl}/categories/${slug}`);
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error(`Could not load the category (${response.status})`);
  }
  return (await response.json()) as Category;
}

export async function getProducts(category?: string): Promise<Product[]> {
  const path = category ? `/products?category=${category}` : "/products";
  const response = await fetch(`${baseUrl}${path}`);
  if (!response.ok) {
    throw new Error(`Could not load products (${response.status})`);
  }
  return (await response.json()) as Product[];
}

export async function getProduct(slug: string): Promise<Product | null> {
  const response = await fetch(`${baseUrl}/products?slug=${slug}`);
  if (!response.ok) {
    throw new Error(`Could not load the product (${response.status})`);
  }
  const products = (await response.json()) as Product[];
  return products[0] ?? null;
}
