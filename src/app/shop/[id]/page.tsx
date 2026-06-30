import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import CartFab, { CartProvider } from "@/components/ui/CartFab";
import Cursor from "@/components/ui/Cursor";
import ScrollExperience from "@/components/ui/ScrollExperience";
import ProductDetail from "@/components/shop/ProductDetail";
import { readProductById, readProducts } from "@/lib/products";

interface ProductPageProps {
  params: { id: string };
  searchParams: { view?: string; image?: string };
}

export async function generateStaticParams() {
  const products = await readProducts();
  return products.filter((product) => product.active).map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await readProductById(params.id);
  if (!product) return { title: "Product not found" };

  const image = product.variants?.[0]?.images?.[0] ?? product.images?.[0];

  return {
    title: `${product.name} — CR Shop`,
    description: product.description ?? `Shop ${product.name} at Covenant Renewers.`,
    openGraph: {
      title: product.name,
      description: product.description,
      images: image ? [{ url: image.src, alt: image.alt }] : undefined,
    },
  };
}

export default async function ProductPage({ params, searchParams }: ProductPageProps) {
  const product = await readProductById(params.id);
  if (!product) notFound();

  const initialView = searchParams.view === "model" ? "model" : "flat";
  const initialImageSrc = searchParams.image;

  return (
    <CartProvider>
      <Cursor />
      <CartFab />
      <ScrollExperience />
      <Nav />
      <ProductDetail
        product={product}
        initialView={initialView}
        initialImageSrc={initialImageSrc}
      />
    </CartProvider>
  );
}
