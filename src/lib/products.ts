import { promises as fs } from "fs";
import path from "path";
import type { Product } from "@/lib/product-types";

const productsPath = path.join(process.cwd(), "data", "products.json");

export async function readProducts(): Promise<Product[]> {
  const raw = await fs.readFile(productsPath, "utf8");
  return JSON.parse(raw) as Product[];
}

export async function readProductById(id: string): Promise<Product | null> {
  const products = await readProducts();
  return products.find((product) => product.id === id && product.active) ?? null;
}

export async function writeProducts(products: Product[]) {
  await fs.mkdir(path.dirname(productsPath), { recursive: true });
  await fs.writeFile(productsPath, `${JSON.stringify(products, null, 2)}\n`, "utf8");
}

export function normalizeProduct(product: Product): Product {
  return {
    ...product,
    id: product.id.trim(),
    emoji: product.emoji.trim() || "🛍",
    category: product.category.trim() || "Apparel",
    collection: product.collection.trim(),
    name: product.name.trim(),
    description: product.description?.trim(),
    pricePence: Math.max(0, Math.round(Number(product.pricePence) || 0)),
    currency: "GBP",
    badge: product.badge.trim(),
    badgeStyle: product.badgeStyle.trim() || "bg-gold text-black",
    wide: Boolean(product.wide),
    active: Boolean(product.active),
    stock: Math.max(0, Math.round(Number(product.stock) || 0)),
    externalPriceId: product.externalPriceId.trim(),
    bg: product.bg.trim(),
  };
}

export function verifyAdminToken(token: string | null) {
  const expected =
    process.env.ADMIN_STORE_TOKEN ||
    (process.env.NODE_ENV === "production" ? "" : "cr-admin");

  return Boolean(expected && token === expected);
}
