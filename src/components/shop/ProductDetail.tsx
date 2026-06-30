"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/ui/CartFab";
import ProductGallery from "@/components/shop/ProductGallery";
import type { Product, ProductVariant } from "@/lib/product-types";
import { formatPrice } from "@/lib/product-types";

interface ProductDetailProps {
  product: Product;
  initialView?: "flat" | "model";
  initialImageSrc?: string;
}

function ColourPicker({
  variants,
  variantId,
  onSelect,
  compact = false,
}: {
  variants: ProductVariant[];
  variantId: string;
  onSelect: (id: string) => void;
  compact?: boolean;
}) {
  return (
    <div className={`flex flex-wrap gap-2 ${compact ? "" : "mt-8"}`}>
      {!compact && (
        <div className="mb-3 w-full font-mono text-[0.52rem] uppercase tracking-[0.18em] text-black/45">
          Colour
        </div>
      )}
      {variants.map((variant) => (
        <button
          key={variant.id}
          type="button"
          onClick={() => onSelect(variant.id)}
          className={`flex items-center gap-2 border font-mono uppercase tracking-[0.14em] transition-colors ${
            compact ? "px-3 py-1.5 text-[0.48rem]" : "px-4 py-2.5 text-[0.52rem]"
          } ${
            variant.id === variantId
              ? "border-ember text-ember"
              : "border-black/10 text-black/50 hover:border-ember/40 hover:text-ember"
          }`}
        >
          <span
            className={`border border-black/20 ${compact ? "h-3 w-3" : "h-3.5 w-3.5"}`}
            style={{ background: variant.colorHex }}
          />
          {variant.name}
        </button>
      ))}
    </div>
  );
}

export default function ProductDetail({
  product,
  initialView,
  initialImageSrc,
}: ProductDetailProps) {
  const [variantId, setVariantId] = useState(product.variants?.[0]?.id ?? "");
  const [added, setAdded] = useState(false);
  const { add } = useCart();

  const selectedVariant = product.variants?.find((variant) => variant.id === variantId);
  const displayStock = selectedVariant?.stock ?? product.stock;
  const label = product.collection
    ? `${product.category} · ${product.collection}`
    : product.category;

  const handleAdd = () => {
    const cartId = selectedVariant ? `${product.id}:${selectedVariant.id}` : product.id;
    add({
      id: cartId,
      name: selectedVariant ? `${product.name} — ${selectedVariant.name}` : product.name,
      emoji: product.emoji,
      pricePence: product.pricePence,
      currency: product.currency,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const variants = product.variants ?? [];

  return (
    <main className="min-h-screen bg-white text-black max-md:pb-20">
      <section className="px-4 pb-8 pt-[4.75rem] md:px-16 md:pb-24 md:pt-32">
        <Link
          href="/shop"
          className="mb-3 inline-flex font-mono text-[0.48rem] uppercase tracking-[0.2em] text-black/45 transition-colors hover:text-ember md:mb-8 md:text-[0.52rem]"
        >
          ← Back to shop
        </Link>

        {/* Mobile — compact header fits above gallery */}
        <div className="mb-3 md:hidden">
          <div className="font-mono text-[0.48rem] uppercase tracking-[0.18em] text-ember">
            {label}
          </div>
          <div className="mt-1 flex items-start justify-between gap-3">
            <h1
              className="font-display leading-[0.95] text-black"
              style={{ fontSize: "1.35rem", fontVariationSettings: '"wdth" 118' }}
            >
              {product.name}
            </h1>
            <div className="shrink-0 text-right">
              <div className="font-display text-xl text-ember">
                {formatPrice(product.pricePence, product.currency)}
              </div>
              <div className="font-mono text-[0.44rem] uppercase tracking-[0.16em] text-black/40">
                {displayStock > 0 ? "In stock" : "Sold out"}
              </div>
            </div>
          </div>
          {variants.length > 0 && (
            <div className="mt-2">
              <ColourPicker
                variants={variants}
                variantId={variantId}
                onSelect={setVariantId}
                compact
              />
            </div>
          )}
        </div>

        <div className="grid gap-4 md:gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <ProductGallery
            product={product}
            variantId={variantId}
            initialView={initialView}
            initialImageSrc={initialImageSrc}
          />

          <div className="hidden md:block lg:sticky lg:top-28">
            <div className="font-mono text-[0.52rem] uppercase tracking-[0.2em] text-ember">
              {label}
            </div>
            <h1
              className="mt-3 font-display leading-[0.95] text-black"
              style={{ fontSize: "clamp(2.2rem,4vw,3.5rem)", fontVariationSettings: '"wdth" 118' }}
            >
              {product.name}
            </h1>

            {product.description && (
              <p className="mt-5 max-w-lg text-base font-light leading-relaxed text-off">
                {product.description}
              </p>
            )}

            {variants.length > 0 && (
              <ColourPicker variants={variants} variantId={variantId} onSelect={setVariantId} />
            )}

            <div className="mt-10 flex flex-wrap items-end justify-between gap-4 border-t border-black/10 pt-8">
              <div>
                <div className="font-display text-3xl text-ember">
                  {formatPrice(product.pricePence, product.currency)}
                </div>
                <div className="mt-1 font-mono text-[0.5rem] uppercase tracking-[0.18em] text-black/45">
                  {displayStock > 0 ? `${displayStock} in stock` : "Sold out"}
                </div>
              </div>
              <button
                type="button"
                onClick={handleAdd}
                disabled={displayStock === 0}
                className="min-w-[160px] bg-ember px-6 py-4 font-display text-sm uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5 disabled:opacity-40"
                style={{ fontVariationSettings: '"wdth" 125' }}
              >
                {displayStock === 0 ? "Sold out" : added ? "Added ✓" : "Add to cart"}
              </button>
            </div>

            <p className="mt-8 text-sm font-light leading-relaxed text-off">
              Switch to <strong className="font-normal text-black">On model</strong> to see lifestyle
              photos and share them with friends. Product shots open full-size when tapped.
            </p>
          </div>
        </div>
      </section>

      {/* Mobile — sticky add to cart */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-white/95 px-4 py-3 backdrop-blur md:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-display text-lg text-ember">
              {formatPrice(product.pricePence, product.currency)}
            </div>
            <div className="font-mono text-[0.42rem] uppercase tracking-[0.14em] text-black/40">
              {selectedVariant?.name ?? "One size"}
            </div>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            disabled={displayStock === 0}
            className="min-w-[140px] bg-ember px-5 py-3 font-display text-xs uppercase tracking-[0.12em] text-white disabled:opacity-40"
            style={{ fontVariationSettings: '"wdth" 125' }}
          >
            {displayStock === 0 ? "Sold out" : added ? "Added ✓" : "Add to cart"}
          </button>
        </div>
      </div>
    </main>
  );
}
