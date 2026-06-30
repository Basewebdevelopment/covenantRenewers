import Link from "next/link";
import Nav from "@/components/layout/Nav";

export const metadata = { title: "Order Confirmed — Covenant Renewers" };

export default function CheckoutSuccess() {
  return (
    <>
      <Nav />
      <main className="min-h-screen flex items-center justify-center px-6 pt-28 pb-20 bg-white">
        <div className="text-center max-w-lg">
          <div
            className="w-20 h-20 rounded-full border-2 border-neon/40 flex items-center justify-center text-4xl mx-auto mb-8"
            style={{ background: "rgba(0,212,138,0.08)" }}
          >
            ✓
          </div>
          <div className="sec-label justify-center mb-4">Order Confirmed</div>
          <h1
            className="font-display text-black leading-[0.88] mb-5"
            style={{ fontSize: "clamp(2.5rem,6vw,5rem)", fontVariationSettings: '"wdth" 125' }}
          >
            THANK YOU <span className="text-ember">FOR YOUR ORDER.</span>
          </h1>
          <p className="text-off font-light leading-relaxed mb-8 text-base">
            Your order has been placed and a confirmation has been sent to your email.
            We&apos;ll get it out to you as soon as possible.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/shop" className="btn-gold">
              Continue Shopping
            </Link>
            <Link href="/" className="btn-ghost">
              Back to Home →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
