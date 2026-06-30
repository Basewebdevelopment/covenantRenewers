import Nav from "@/components/layout/Nav";
import CartFab, { CartProvider } from "@/components/ui/CartFab";
import Cursor from "@/components/ui/Cursor";
import ScrollExperience from "@/components/ui/ScrollExperience";
import ShopGallery from "@/components/shop/ShopGallery";
import { readProducts } from "@/lib/products";

export const metadata = {
  title: "Shop — Covenant Renewers",
  description: "Browse Covenant Renewers apparel, books, youth merch, and accessories.",
};

export default async function ShopPage() {
  const products = await readProducts();

  return (
    <CartProvider>
      <Cursor />
      <CartFab />
      <ScrollExperience />
      <Nav />
      <ShopGallery products={products} />
    </CartProvider>
  );
}
