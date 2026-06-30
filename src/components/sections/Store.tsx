"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Product } from "@/lib/product-types";
import { formatPrice } from "@/lib/product-types";
import { productHref } from "@/lib/product-gallery";

const productImageBg = "#ffffff";

function ProductCard({
  product,
  featured = false,
  index = 0,
}: {
  product: Product;
  featured?: boolean;
  index?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const bg = product.bg || productImageBg;
  const images = product.variants?.[0]?.images ?? product.images ?? [];
  const primaryImage = images[0];
  const secondaryImage = images[1];

  return (
    <motion.a
      ref={ref}
      href={productHref(product)}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative flex flex-col overflow-hidden border border-black/10 bg-white hover:border-ember/35 hover:shadow-[0_16px_40px_rgba(17,17,17,0.09)] transition-all duration-300 hover:-translate-y-1"
      style={{ cursor: "none" }}
    >
      {/* Badge */}
      {product.badge && (
        <span className="absolute left-3 top-3 z-10 bg-ember px-2.5 py-1 font-mono text-[0.46rem] uppercase tracking-[0.2em] text-white">
          {product.badge}
        </span>
      )}

      {/* Image area */}
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-white ${featured ? "h-56" : "h-44"}`}
        style={{ background: bg }}
      >
        {primaryImage ? (
          <>
            <Image
              src={primaryImage.src}
              alt={primaryImage.alt}
              fill
              className="object-contain p-5 transition-all duration-500 group-hover:scale-[1.03]"
              sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
            />
            {secondaryImage && (
              <Image
                src={secondaryImage.src}
                alt={secondaryImage.alt}
                fill
                className="object-contain p-5 opacity-0 transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
              />
            )}
          </>
        ) : (
          <span
            className="float relative z-10 select-none"
            style={{
              fontSize: featured ? "5.5rem" : "4.2rem",
              filter: "drop-shadow(0 12px 28px rgba(0,0,0,0.14))",
            }}
          >
            {product.emoji}
          </span>
        )}

        {/* Shop arrow — appears on hover */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-250">
          <span className="font-mono text-[0.48rem] tracking-[0.18em] uppercase text-ember">
            View →
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={`flex flex-col flex-1 ${featured ? "p-5" : "p-4"}`}>
        <div className="mb-1.5 font-mono text-[0.48rem] uppercase tracking-[0.2em] text-ember/80">
          {product.collection || product.category}
        </div>
        {product.variants && product.variants.length > 0 && (
          <div className="mb-2 flex gap-1.5">
            {product.variants.map((variant) => (
              <span
                key={variant.id}
                className="h-3 w-3 border border-black/20"
                style={{ background: variant.colorHex }}
                title={variant.name}
              />
            ))}
          </div>
        )}
        <div
          className="font-display leading-tight text-black flex-1"
          style={{
            fontSize: featured ? "1.25rem" : "1.05rem",
            fontVariationSettings: '"wdth" 115',
          }}
        >
          {product.name}
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-black/8 pt-3">
          <span className="font-display text-ember" style={{ fontSize: featured ? "1.5rem" : "1.25rem" }}>
            {formatPrice(product.pricePence, product.currency)}
          </span>
          <span className="font-mono text-[0.48rem] uppercase tracking-[0.16em] text-black/35">
            {product.stock > 0 ? `${product.stock} left` : "Sold out"}
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export default function Store({ initialProducts }: { initialProducts: Product[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const activeProducts = initialProducts
    .filter((p) => p.active)
    .sort((a, b) => Number(Boolean(b.images?.length || b.variants?.length)) - Number(Boolean(a.images?.length || a.variants?.length)));
  const [featured, ...rest] = activeProducts;
  const previews = rest.slice(0, 2);

  return (
    <section id="store" className="px-6 py-20 md:px-16 md:py-28" style={{ background: "#ede8de" }}>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">

        {/* Left — heading + photo + CTA */}
        <div>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="sec-label mb-4"
          >
            CR Store
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="font-display leading-[0.88]"
            style={{ fontSize: "clamp(3.2rem,6.5vw,7rem)", fontVariationSettings: '"wdth" 128' }}
          >
            SHOP THE{" "}
            <span className="text-ember">COLLECTIONS</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 max-w-md text-base font-light leading-relaxed"
            style={{ color: "#3d3530" }}
          >
            Apparel, devotionals, accessories, and youth merch. Every piece
            carries the mark of the covenant.
          </motion.p>

          {/* Church photos */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.22 }}
            className="mt-8 grid grid-cols-2 gap-2"
          >
            {["/images/church/R6II7754.jpg", "/images/church/R6II7759.jpg"].map((src, i) => (
              <div key={src} className={`relative overflow-hidden border border-black/10 ${i === 0 ? "h-40" : "h-40"}`}>
                <Image
                  src={src}
                  alt="Covenant Renewers"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 200px"
                />
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.28 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href="/shop" className="btn-gold" style={{ cursor: "none" }}>
              Open Shop
            </a>
            <a
              href="/shop"
              className="btn-ghost"
              style={{ cursor: "none" }}
            >
              Browse All →
            </a>
          </motion.div>
        </div>

        {/* Right — product cards */}
        <div className="flex flex-col gap-3">
          {/* Featured card — full width */}
          {featured && (
            <ProductCard product={featured} featured index={0} />
          )}
          {/* Two smaller cards side by side */}
          <div className="grid grid-cols-2 gap-3">
            {previews.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i + 1} />
            ))}
          </div>
          {/* Count pill */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-right"
          >
            <a
              href="/shop"
              className="inline-flex items-center gap-2 font-mono text-[0.52rem] uppercase tracking-[0.22em] text-black/45 hover:text-ember transition-colors duration-200"
              style={{ cursor: "none" }}
            >
              +{Math.max(0, activeProducts.length - 3)} more products in the shop →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
