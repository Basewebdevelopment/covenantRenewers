"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/lib/product-types";
import { productShareUrl } from "@/lib/product-gallery";

interface ShareImageButtonProps {
  productId: string;
  productName: string;
  image: ProductImage;
  view: "flat" | "model";
  className?: string;
}

export default function ShareImageButton({
  productId,
  productName,
  image,
  view,
  className = "",
}: ShareImageButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "shared">("idle");

  const share = useCallback(async () => {
    const url = productShareUrl(productId, image.src, view);
    const payload = {
      title: `${productName} — Covenant Renewers`,
      text: image.alt,
      url,
    };

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(payload);
        setStatus("shared");
      } else if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setStatus("copied");
      }
    } catch {
      /* user cancelled share */
    }

    setTimeout(() => setStatus("idle"), 2000);
  }, [image.alt, image.src, productId, productName, view]);

  const label =
    status === "shared" ? "Shared" : status === "copied" ? "Link copied" : "Share photo";

  return (
    <button
      type="button"
      onClick={share}
      className={`font-mono text-[0.52rem] uppercase tracking-[0.16em] border border-black/12 px-4 py-2.5 text-black/70 transition-colors hover:border-ember hover:text-ember ${className}`}
      aria-label={`Share ${image.label ?? image.alt}`}
    >
      {label}
    </button>
  );
}
