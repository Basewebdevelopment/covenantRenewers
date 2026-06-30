"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/product-types";
import { groupVariantImages, galleryImageClass, galleryFrameClass } from "@/lib/product-gallery";
import ImageLightbox from "@/components/shop/ImageLightbox";
import ShareImageButton from "@/components/shop/ShareImageButton";

type GalleryView = "flat" | "model";

interface ProductGalleryProps {
  product: Product;
  variantId: string;
  initialView?: GalleryView;
  initialImageSrc?: string;
}

export default function ProductGallery({
  product,
  variantId,
  initialView = "flat",
  initialImageSrc,
}: ProductGalleryProps) {
  const [view, setView] = useState<GalleryView>(initialView);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { flat, model } = useMemo(
    () => groupVariantImages(product, variantId),
    [product, variantId]
  );

  const images = view === "model" ? model : flat;
  const activeImage = images[activeIndex];

  useEffect(() => {
    setActiveIndex(0);
  }, [variantId, view]);

  useEffect(() => {
    if (initialView === "model" && model.length > 0) setView("model");
  }, [initialView, model.length]);

  useEffect(() => {
    if (!initialImageSrc || images.length === 0) return;
    const match = images.findIndex((image) => image.src === initialImageSrc);
    if (match >= 0) {
      setActiveIndex(match);
      setLightboxIndex(match);
    }
  }, [initialImageSrc, images]);

  const openLightbox = (index: number) => setLightboxIndex(index);

  const tabClass = (active: boolean) =>
    `border font-mono uppercase tracking-[0.16em] transition-colors max-md:px-2.5 max-md:py-1.5 max-md:text-[0.44rem] md:px-4 md:py-2 md:text-[0.52rem] ${
      active
        ? "border-ember bg-ember text-white"
        : "border-black/12 text-black/55 hover:border-ember/40 hover:text-ember"
    }`;

  const mainImageClass = galleryFrameClass;

  return (
    <div className="flex flex-col gap-2 md:gap-4">
      <div className="flex gap-1.5 md:gap-2">
        <button type="button" onClick={() => setView("flat")} className={tabClass(view === "flat")}>
          Product ({flat.length})
        </button>
        <button type="button" onClick={() => setView("model")} className={tabClass(view === "model")}>
          On model ({model.length})
        </button>
      </div>

      {images.length === 0 ? (
        <div className="flex h-[200px] flex-col items-center justify-center border border-dashed border-black/15 bg-white p-6 text-center md:aspect-[4/3] md:h-auto">
          <p className="font-display text-lg text-black md:text-xl" style={{ fontVariationSettings: '"wdth" 115' }}>
            Model photos coming soon
          </p>
        </div>
      ) : (
        <>
          <button
            type="button"
            onClick={() => openLightbox(activeIndex)}
            className={`group relative w-full overflow-hidden border border-black/10 bg-white ${mainImageClass}`}
            aria-label="Open full-size image"
          >
            {product.badge && view === "flat" && activeIndex === 0 && (
              <span
                className={`absolute left-2 top-2 z-10 px-2 py-1 font-mono text-[0.44rem] uppercase tracking-[0.16em] md:left-4 md:top-4 md:px-3 md:py-2 md:text-[0.54rem] ${product.badgeStyle}`}
              >
                {product.badge}
              </span>
            )}
            {activeImage && (
              <Image
                key={`${variantId}-${activeImage.src}`}
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                className={galleryImageClass(activeImage, "main")}
                sizes="(max-width: 768px) 100vw, 55vw"
                priority={activeIndex === 0}
              />
            )}
            <span className="absolute bottom-2 right-2 hidden font-mono text-[0.48rem] uppercase tracking-[0.16em] text-black/40 opacity-0 transition-opacity group-hover:opacity-100 md:block">
              Tap to enlarge
            </span>
          </button>

          <div className="flex gap-1.5 overflow-x-auto pb-1 md:flex-wrap md:gap-2 md:overflow-visible md:pb-0">
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`relative h-12 w-12 shrink-0 overflow-hidden border bg-white transition-colors md:h-20 md:w-20 ${
                  index === activeIndex ? "border-ember ring-1 ring-ember" : "border-black/10 hover:border-ember/40"
                }`}
                aria-label={image.label ?? image.alt}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  className={galleryImageClass(image, "thumb")}
                  sizes="80px"
                />
              </button>
            ))}
          </div>

          {activeImage && view === "model" && (
            <div className="hidden flex-wrap items-center justify-between gap-3 border-t border-black/10 pt-4 md:flex">
              <p className="text-sm font-light text-off">{activeImage.alt}</p>
              <ShareImageButton
                productId={product.id}
                productName={product.name}
                image={activeImage}
                view="model"
              />
            </div>
          )}
        </>
      )}

      {lightboxIndex !== null && images.length > 0 && (
        <ImageLightbox
          images={images}
          index={lightboxIndex}
          productId={product.id}
          productName={product.name}
          view={view}
          onClose={() => setLightboxIndex(null)}
          onChange={setLightboxIndex}
        />
      )}
    </div>
  );
}
