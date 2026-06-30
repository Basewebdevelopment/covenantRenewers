import { NextResponse } from "next/server";
import type { Product } from "@/lib/product-types";
import { normalizeProduct, readProducts, verifyAdminToken, writeProducts } from "@/lib/products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const products = await readProducts();
  return NextResponse.json({ products });
}

export async function PUT(request: Request) {
  const token = request.headers.get("x-admin-token");

  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const products: Product[] | null = Array.isArray(body.products)
    ? body.products.map(normalizeProduct)
    : null;

  if (!products) {
    return NextResponse.json({ error: "Expected products array" }, { status: 400 });
  }

  if (products.some((product) => !product.id || !product.name)) {
    return NextResponse.json({ error: "Each product needs an id and name" }, { status: 400 });
  }

  await writeProducts(products);

  return NextResponse.json({ products });
}
