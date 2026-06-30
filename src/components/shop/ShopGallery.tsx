"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Image from "next/image";
import { useCart } from "@/components/ui/CartFab";
import type { Product } from "@/lib/product-types";
import { formatPrice } from "@/lib/product-types";
import { productHref } from "@/lib/product-gallery";

const shopPhotos = [
  { src: "/images/church/R6II7748.jpg", alt: "Covenant Renewers joyful community moment" },
];

function ProductTile({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const [variantId, setVariantId] = useState(product.variants?.[0]?.id ?? "");
  const { add } = useCart();
  const label = product.collection
    ? `${product.category} · ${product.collection}`
    : product.category;
  const selectedVariant = product.variants?.find((variant) => variant.id === variantId);
  const images = selectedVariant?.images ?? product.images ?? [];
  const primaryImage = images[0];
  const secondaryImage = images[1];
  const displayStock = selectedVariant?.stock ?? product.stock;

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
    setTimeout(() => setAdded(false), 1100);
  };

  return (
    <article className="group overflow-hidden border border-black/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-ember/40 hover:shadow-[0_18px_45px_rgba(17,17,17,0.08)]">
      <Link href={productHref(product)} className="block">
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-white" style={{ background: product.bg || "#ffffff" }}>
          {product.badge && (
            <span className={`absolute left-4 top-4 z-10 px-3 py-2 font-mono text-[0.54rem] uppercase tracking-[0.18em] ${product.badgeStyle}`}>
              {product.badge}
            </span>
          )}
          {primaryImage ? (
            <>
              <Image
                src={primaryImage.src}
                alt={primaryImage.alt}
                fill
                className="object-contain p-5 transition-all duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
              />
              {secondaryImage && (
                <Image
                  src={secondaryImage.src}
                  alt={secondaryImage.alt}
                  fill
                  className="object-contain p-5 opacity-0 transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                />
              )}
            </>
          ) : (
            <span className="float relative z-10 text-[4.8rem]" style={{ filter: "drop-shadow(0 22px 42px rgba(0,0,0,0.55))" }}>
              {product.emoji}
            </span>
          )}
        </div>
      </Link>

      <div className="p-5">
        <div className="mb-2 font-mono text-[0.52rem] uppercase tracking-[0.2em] text-ember">
          {label}
        </div>
        <Link href={productHref(product)}>
          <h2
            className="mb-5 min-h-[3.5rem] font-display leading-[1.02] text-black transition-colors hover:text-ember"
            style={{ fontSize: "1.45rem", fontVariationSettings: '"wdth" 118' }}
          >
            {product.name}
          </h2>
        </Link>
        {product.variants && product.variants.length > 0 && (
          <div className="mb-5 flex flex-wrap items-center gap-2">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setVariantId(variant.id)}
                className={`flex items-center gap-2 border px-3 py-2 font-mono text-[0.5rem] uppercase tracking-[0.14em] transition-colors ${
                  variant.id === variantId
                    ? "border-ember text-ember"
                    : "border-black/10 text-black/50 hover:border-ember/40 hover:text-ember"
                }`}
                aria-label={`View ${variant.name}`}
              >
                <span
                  className="h-3 w-3 border border-black/20"
                  style={{ background: variant.colorHex }}
                />
                {variant.name}
              </button>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between gap-4 border-t border-black/10 pt-4">
          <div>
            <div className="font-display text-2xl text-ember">
              {formatPrice(product.pricePence, product.currency)}
            </div>
            <div className="mt-1 font-mono text-[0.5rem] uppercase tracking-[0.18em] text-black/45">
              {displayStock > 0 ? `${displayStock} in stock` : "Sold out"}
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              href={productHref(product)}
              className="h-11 px-4 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-black/60 border border-black/10 flex items-center hover:border-ember hover:text-ember transition-colors"
            >
              View
            </Link>
            <button
              onClick={handleAdd}
              disabled={displayStock === 0}
              className="h-11 min-w-11 bg-ember px-4 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white transition-transform hover:-translate-y-0.5 disabled:opacity-40"
              aria-label={`Add ${product.name} to cart`}
            >
              {displayStock === 0 ? "Out" : added ? "Added" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ShopGallery({ products }: { products: Product[] }) {
  const [active, setActive] = useState("All");
  const liveProducts = products.filter((product) => product.active);
  const collections = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(
          liveProducts.map((product) => product.collection || product.category)
        )
      ),
    ],
    [liveProducts]
  );
  const visibleProducts = liveProducts.filter((product) => {
    const collection = product.collection || product.category;
    return active === "All" || collection === active;
  });

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="px-6 pb-10 pt-28 md:px-16 md:pb-14 md:pt-32">
        <div className="grid gap-8 border-b border-black/10 pb-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <div className="sec-label mb-5">CR Shop</div>
            <h1
              className="font-display leading-[0.88]"
              style={{ fontSize: "clamp(4rem,9vw,9rem)", fontVariationSettings: '"wdth" 130' }}
            >
              PRODUCT <span className="text-ember">GALLERY</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base font-light leading-relaxed text-off">
              Browse Covenant Renewers apparel, youth merch, books, and accessories.
              Filter by collection and add products straight to your cart.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_0.72fr]">
            {shopPhotos.map((photo, index) => (
              <div
                key={photo.src}
                className="relative h-44 overflow-hidden border border-black/10 bg-white md:h-56"
                style={{ transform: index === 1 ? "translateY(14px)" : undefined }}
              >
                <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          {collections.map((collection) => (
            <button
              key={collection}
              onClick={() => setActive(collection)}
              className={`border px-5 py-3 font-mono text-[0.58rem] uppercase tracking-[0.18em] transition-all duration-200 ${
                active === collection
                  ? "border-ember bg-ember text-white"
                  : "border-black/12 bg-white text-black/65 hover:border-ember/50 hover:text-ember"
              }`}
              >
              {collection}
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 pb-24 md:px-16">
        <div className="mb-5 flex items-center justify-between border-y border-black/10 py-4">
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-black/55">
            {visibleProducts.length} products
          </span>
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-ember">
            {active}
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductTile key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
