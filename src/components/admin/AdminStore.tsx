"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/product-types";
import { formatPrice } from "@/lib/product-types";

const blankProduct: Product = {
  id: "new-product",
  emoji: "🛍",
  category: "Apparel",
  collection: "",
  name: "New CR Product",
  pricePence: 0,
  currency: "GBP",
  badge: "",
  badgeStyle: "bg-gold text-black",
  wide: false,
  active: true,
  stock: 0,
  externalPriceId: "",
  bg: "radial-gradient(ellipse at 50% 45%, rgba(184,147,58,0.35), rgba(26,53,212,0.16), transparent 70%), #0e0e16",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function updateProduct(products: Product[], index: number, patch: Partial<Product>) {
  return products.map((product, productIndex) =>
    productIndex === index ? { ...product, ...patch } : product
  );
}

export default function AdminStore() {
  const [products, setProducts] = useState<Product[]>([]);
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("Loading products...");
  const [saving, setSaving] = useState(false);

  const totalValue = useMemo(
    () => products.reduce((sum, product) => sum + product.pricePence * product.stock, 0),
    [products]
  );

  useEffect(() => {
    setToken(window.localStorage.getItem("cr_admin_token") || "");

    fetch("/api/products", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products || []);
        setStatus("Products loaded.");
      })
      .catch(() => setStatus("Could not load products."));
  }, []);

  const save = async () => {
    setSaving(true);
    setStatus("Saving product changes...");
    window.localStorage.setItem("cr_admin_token", token);

    const response = await fetch("/api/products", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "x-admin-token": token,
      },
      body: JSON.stringify({ products }),
    });

    const data = await response.json();
    setSaving(false);

    if (!response.ok) {
      setStatus(data.error || "Could not save products.");
      return;
    }

    setProducts(data.products);
    setStatus("Saved. The public store will use these prices on refresh.");
  };

  const addProduct = () => {
    const nextNumber = products.length + 1;
    setProducts([
      ...products,
      {
        ...blankProduct,
        id: `new-product-${nextNumber}`,
        name: `New CR Product ${nextNumber}`,
      },
    ]);
  };

  return (
    <main className="min-h-screen bg-black px-5 py-8 text-cream md:px-10">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 border-b border-gold/15 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <a href="/" className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-gold">
              ← Back to site
            </a>
            <h1
              className="mt-5 font-display leading-none"
              style={{ fontSize: "clamp(3rem,7vw,6.8rem)", fontVariationSettings: '"wdth" 128' }}
            >
              STORE <span className="text-gold">BACKEND</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-off">
              Update product prices, stock, visibility, and checkout integration IDs.
              Development token: <span className="font-mono text-gold">cr-admin</span>.
            </p>
          </div>

          <div className="grid gap-3 md:w-[360px]">
            <label className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-gold">
              Admin token
            </label>
            <input
              value={token}
              onChange={(event) => setToken(event.target.value)}
              className="border border-gold/20 bg-card px-4 py-3 font-mono text-sm text-cream outline-none focus:border-gold/60"
              placeholder="Enter admin token"
              type="password"
            />
            <button
              onClick={save}
              disabled={saving}
              className="btn-gold justify-center disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Products"}
            </button>
          </div>
        </div>

        <div className="mb-8 grid gap-px md:grid-cols-3">
          <div className="bg-card p-5">
            <div className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-off">
              Products
            </div>
            <div className="mt-2 font-display text-4xl text-gold">{products.length}</div>
          </div>
          <div className="bg-card p-5">
            <div className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-off">
              Active
            </div>
            <div className="mt-2 font-display text-4xl text-gold">
              {products.filter((product) => product.active).length}
            </div>
          </div>
          <div className="bg-card p-5">
            <div className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-off">
              Stock value
            </div>
            <div className="mt-2 font-display text-4xl text-gold">{formatPrice(totalValue)}</div>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-off">{status}</p>
          <button onClick={addProduct} className="btn-ghost">
            Add Product +
          </button>
        </div>

        <div className="grid gap-4">
          {products.map((product, index) => (
            <article key={`${product.id}-${index}`} className="bg-card p-5 ring-1 ring-gold/10">
              <div className="grid gap-4 md:grid-cols-[70px_1.25fr_0.85fr_0.75fr_0.8fr]">
                <label className="grid gap-2">
                  <span className="font-mono text-[0.54rem] uppercase tracking-[0.18em] text-off">
                    Icon
                  </span>
                  <input
                    value={product.emoji}
                    onChange={(event) =>
                      setProducts(updateProduct(products, index, { emoji: event.target.value }))
                    }
                    className="h-12 border border-gold/15 bg-black/35 px-3 text-center text-2xl outline-none focus:border-gold/60"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="font-mono text-[0.54rem] uppercase tracking-[0.18em] text-off">
                    Product name
                  </span>
                  <input
                    value={product.name}
                    onChange={(event) => {
                      const name = event.target.value;
                      setProducts(
                        updateProduct(products, index, {
                          name,
                          id: product.id.startsWith("new-product") ? slugify(name) : product.id,
                        })
                      );
                    }}
                    className="h-12 border border-gold/15 bg-black/35 px-3 text-sm outline-none focus:border-gold/60"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="font-mono text-[0.54rem] uppercase tracking-[0.18em] text-off">
                    Price
                  </span>
                  <input
                    value={(product.pricePence / 100).toFixed(2)}
                    onChange={(event) =>
                      setProducts(
                        updateProduct(products, index, {
                          pricePence: Math.round(Number(event.target.value || 0) * 100),
                        })
                      )
                    }
                    className="h-12 border border-gold/15 bg-black/35 px-3 font-mono text-sm outline-none focus:border-gold/60"
                    min="0"
                    step="0.01"
                    type="number"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="font-mono text-[0.54rem] uppercase tracking-[0.18em] text-off">
                    Stock
                  </span>
                  <input
                    value={product.stock}
                    onChange={(event) =>
                      setProducts(
                        updateProduct(products, index, { stock: Number(event.target.value || 0) })
                      )
                    }
                    className="h-12 border border-gold/15 bg-black/35 px-3 font-mono text-sm outline-none focus:border-gold/60"
                    min="0"
                    type="number"
                  />
                </label>

                <label className="flex items-center gap-3 pt-6">
                  <input
                    checked={product.active}
                    onChange={(event) =>
                      setProducts(updateProduct(products, index, { active: event.target.checked }))
                    }
                    className="h-5 w-5 accent-[#b8933a]"
                    type="checkbox"
                  />
                  <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-gold">
                    Active
                  </span>
                </label>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-4">
                <label className="grid gap-2">
                  <span className="font-mono text-[0.54rem] uppercase tracking-[0.18em] text-off">
                    Category
                  </span>
                  <input
                    value={product.category}
                    onChange={(event) =>
                      setProducts(updateProduct(products, index, { category: event.target.value }))
                    }
                    className="h-11 border border-gold/15 bg-black/35 px-3 text-sm outline-none focus:border-gold/60"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="font-mono text-[0.54rem] uppercase tracking-[0.18em] text-off">
                    Collection
                  </span>
                  <input
                    value={product.collection}
                    onChange={(event) =>
                      setProducts(updateProduct(products, index, { collection: event.target.value }))
                    }
                    className="h-11 border border-gold/15 bg-black/35 px-3 text-sm outline-none focus:border-gold/60"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="font-mono text-[0.54rem] uppercase tracking-[0.18em] text-off">
                    Badge
                  </span>
                  <input
                    value={product.badge}
                    onChange={(event) =>
                      setProducts(updateProduct(products, index, { badge: event.target.value }))
                    }
                    className="h-11 border border-gold/15 bg-black/35 px-3 text-sm outline-none focus:border-gold/60"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="font-mono text-[0.54rem] uppercase tracking-[0.18em] text-off">
                    Checkout price ID
                  </span>
                  <input
                    value={product.externalPriceId}
                    onChange={(event) =>
                      setProducts(
                        updateProduct(products, index, { externalPriceId: event.target.value })
                      )
                    }
                    className="h-11 border border-gold/15 bg-black/35 px-3 font-mono text-xs outline-none focus:border-gold/60"
                    placeholder="Stripe/Square/etc."
                  />
                </label>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
