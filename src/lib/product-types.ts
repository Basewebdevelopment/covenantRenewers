export type ProductImageType = "flat" | "model" | "detail";

export interface ProductImage {
  src: string;
  alt: string;
  label?: string;
  type?: ProductImageType;
}

export interface ProductVariant {
  id: string;
  name: string;
  colorHex: string;
  stock: number;
  images: ProductImage[];
}

export interface Product {
  id: string;
  emoji: string;
  category: string;
  collection: string;
  name: string;
  description?: string;
  pricePence: number;
  currency: "GBP";
  badge: string;
  badgeStyle: string;
  wide: boolean;
  active: boolean;
  stock: number;
  externalPriceId: string;
  bg: string;
  images?: ProductImage[];
  variants?: ProductVariant[];
}

export function formatPrice(pricePence: number, currency = "GBP") {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
  }).format(pricePence / 100);
}
