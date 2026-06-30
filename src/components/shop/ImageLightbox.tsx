"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import type { ProductImage } from "@/lib/product-types";
import ShareImageButton from "@/components/shop/ShareImageButton";
import { galleryImageClass, galleryFrameClass } from "@/lib/product-gallery";

interface ImageLightboxProps {
  images: ProductImage[];
  index: number;
  productId: string;
  productName: string;
  view: "flat" | "model";
  onClose: () => void;
  onChange: (index: number) => void;
}

export default function ImageLightbox({
  images,
  index,
  productId,
  productName,
  view,
  onClose,
  onChange,
}: ImageLightboxProps) {
  const image = images[index];
  const hasPrev = index > 0;
  const hasNext = index < images.length - 1;

  const goPrev = useCallback(() => {
    if (hasPrev) onChange(index - 1);
  }, [hasPrev, index, onChange]);

  const goNext = useCallback(() => {
    if (hasNext) onChange(index + 1);
  }, [hasNext, index, onChange]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [goNext, goPrev, onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Product image viewer"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-white/70 hover:text-white md:right-8 md:top-8"
      >
        Close ✕
      </button>

      {hasPrev && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 border border-white/20 px-3 py-4 font-mono text-xs text-white/80 hover:border-white/50 md:left-6"
          aria-label="Previous image"
        >
          ←
        </button>
      )}

      {hasNext && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 border border-white/20 px-3 py-4 font-mono text-xs text-white/80 hover:border-white/50 md:right-6"
          aria-label="Next image"
        >
          →
        </button>
      )}

      <div
        className="relative flex max-h-[85vh] w-full max-w-4xl flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`relative w-full bg-white ${galleryFrameClass} max-h-[70vh] md:max-h-[min(70vh,520px)]`}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className={galleryImageClass(image, "lightbox")}
            sizes="(max-width: 768px) 100vw, 896px"
            priority
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 px-1">
          <div>
            <div className="font-mono text-[0.52rem] uppercase tracking-[0.18em] text-white/50">
              {image.label ?? `Image ${index + 1} of ${images.length}`}
            </div>
            <p className="mt-1 text-sm font-light text-white/85">{image.alt}</p>
          </div>
          <ShareImageButton
            productId={productId}
            productName={productName}
            image={image}
            view={view}
            className="border-white/25 text-white/80 hover:border-white hover:text-white"
          />
        </div>
      </div>
    </div>
  );
}
