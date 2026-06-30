import type { Product, ProductImage, ProductImageType } from "@/lib/product-types";

export function imageType(image: ProductImage): ProductImageType {
  return image.type ?? "flat";
}

export function isModelImage(image: ProductImage) {
  return imageType(image) === "model";
}

export function galleryImageClass(_image: ProductImage, size: "main" | "thumb" | "lightbox" = "main") {
  if (size === "thumb") return "object-contain p-1";
  if (size === "lightbox") return "object-contain p-4 md:p-6";
  return "object-contain p-4 md:p-6 transition-transform duration-500 group-hover:scale-[1.02]";
}

/** Same frame for product and model shots — keeps gallery height consistent. */
export const galleryFrameClass =
  "max-md:h-[min(32vh,200px)] md:aspect-[4/3]";

export function getVariantImages(
  product: Product,
  variantId?: string,
  filter?: ProductImageType | "all"
): ProductImage[] {
  const variant = product.variants?.find((v) => v.id === variantId) ?? product.variants?.[0];
  const images = variant?.images ?? product.images ?? [];
  if (!filter || filter === "all") return images;
  return images.filter((image) => imageType(image) === filter);
}

export function groupVariantImages(product: Product, variantId?: string) {
  const all = getVariantImages(product, variantId, "all");
  return {
    flat: all.filter((image) => imageType(image) === "flat" || imageType(image) === "detail"),
    model: all.filter((image) => imageType(image) === "model"),
  };
}

export function productHref(product: Product) {
  return `/shop/${product.id}`;
}

export function productShareUrl(productId: string, imageSrc?: string, view?: "flat" | "model") {
  const base =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SITE_URL ?? "https://covenantrewers.co.uk";

  const url = new URL(`/shop/${productId}`, base);
  if (view) url.searchParams.set("view", view);
  if (imageSrc) url.searchParams.set("image", imageSrc);
  return url.toString();
}
