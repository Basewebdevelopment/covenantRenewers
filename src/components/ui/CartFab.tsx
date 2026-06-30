"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { formatPrice } from "@/lib/product-types";

interface CartItem {
  id: string;
  name: string;
  emoji: string;
  pricePence: number;
  currency: "GBP";
  qty: number;
}

interface CartCtx {
  items: CartItem[];
  count: number;
  add: (item: Omit<CartItem, "qty">) => void;
  remove: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartCtx>({
  items: [],
  count: 0,
  add: () => {},
  remove: () => {},
  updateQty: () => {},
  clear: () => {},
});

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const add = (product: Omit<CartItem, "qty">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const remove = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id: string, qty: number) => {
    if (qty < 1) { remove(id); return; }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const clear = () => setItems([]);

  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, count, add, remove, updateQty, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export default function CartFab() {
  const { items, count, remove, updateQty, clear } = useCart();
  const [open, setOpen] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const subtotal = items.reduce((sum, i) => sum + i.pricePence * i.qty, 0);
  const currency = items[0]?.currency ?? "GBP";

  const handleCheckout = async () => {
    setCheckingOut(true);
    setCheckoutError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCheckoutError(data.error ?? "Checkout failed. Please try again.");
        setCheckingOut(false);
        return;
      }
      if (data.url) {
        window.location.href = data.url;
      } else {
        setCheckoutError("Unexpected response from checkout. Please try again.");
        setCheckingOut(false);
      }
    } catch {
      setCheckoutError("Network error. Please try again.");
      setCheckingOut(false);
    }
  };

  return (
    <>
      {/* FAB trigger */}
      <button
        onClick={() => setOpen(true)}
        className="cart-pulse fixed bottom-8 right-8 z-[700] w-14 h-14 bg-ember flex items-center justify-center text-white text-xl font-bold transition-transform hover:scale-110"

        aria-label="Open cart"
      >
        🛒
        {count > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-black text-white font-mono text-[0.6rem] rounded-full flex items-center justify-center">
            {count}
          </span>
        )}
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-[800] bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-[900] h-full w-full max-w-[420px] bg-white flex flex-col shadow-2xl transition-transform duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-black/10">
          <div>
            <div className="font-display text-xl" style={{ fontVariationSettings: '"wdth" 120' }}>
              YOUR CART
            </div>
            <div className="font-mono text-[0.52rem] tracking-[0.2em] uppercase text-ember mt-0.5">
              {count} {count === 1 ? "item" : "items"}
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-9 h-9 flex items-center justify-center border border-black/15 text-black/60 hover:text-black hover:border-black/40 transition-colors font-mono text-sm"
    
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-7 py-5 space-y-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center pb-20">
              <span className="text-5xl opacity-30">🛒</span>
              <p className="font-mono text-[0.62rem] tracking-[0.2em] uppercase text-black/40">
                Your cart is empty
              </p>
              <button
                onClick={() => setOpen(false)}
                className="btn-ghost text-[0.58rem] py-2.5 px-5 mt-2"
        
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 pb-5 border-b border-black/8 last:border-0">
                {/* Product visual */}
                <div className="w-16 h-16 flex items-center justify-center bg-[#f5f0e8] flex-shrink-0 text-3xl">
                  {item.emoji}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="font-display text-[0.95rem] leading-tight mb-1 text-black truncate"
                    style={{ fontVariationSettings: '"wdth" 112' }}>
                    {item.name}
                  </div>
                  <div className="font-display text-ember text-base">
                    {formatPrice(item.pricePence, item.currency)}
                  </div>

                  {/* Qty controls */}
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border border-black/15">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="w-7 h-7 flex items-center justify-center text-black/60 hover:text-black hover:bg-black/5 transition-colors font-mono text-sm"
                
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-mono text-[0.7rem] text-black select-none">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-7 h-7 flex items-center justify-center text-black/60 hover:text-black hover:bg-black/5 transition-colors font-mono text-sm"
                
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => remove(item.id)}
                      className="font-mono text-[0.52rem] tracking-[0.15em] uppercase text-black/35 hover:text-ember transition-colors"
              
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Line total */}
                <div className="font-display text-[0.95rem] text-black flex-shrink-0 pt-0.5">
                  {formatPrice(item.pricePence * item.qty, item.currency)}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-black/10 px-7 py-6 space-y-4 bg-[#fafaf8]">
            <div className="flex justify-between items-center">
              <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-black/55">
                Subtotal
              </span>
              <span className="font-display text-2xl text-black">
                {formatPrice(subtotal, currency)}
              </span>
            </div>
            <p className="font-mono text-[0.5rem] tracking-[0.14em] uppercase text-black/40">
              Shipping calculated at checkout
            </p>
            {checkoutError && (
              <p className="font-mono text-[0.52rem] tracking-[0.12em] uppercase text-ember">{checkoutError}</p>
            )}
            <button
              className="btn-gold w-full justify-center text-[0.75rem] py-4 disabled:opacity-50"
              onClick={handleCheckout}
              disabled={checkingOut}
            >
              {checkingOut ? "Redirecting..." : "Proceed to Checkout"}
            </button>
            <button
              onClick={clear}
              className="w-full font-mono text-[0.52rem] tracking-[0.18em] uppercase text-black/35 hover:text-ember transition-colors py-1"
      
            >
              Clear cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
