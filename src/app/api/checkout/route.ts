import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

interface CartItem {
  id: string;
  name: string;
  emoji: string;
  pricePence: number;
  qty: number;
  externalPriceId?: string;
}

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json(
      { error: "Store checkout is not configured yet. Please contact us to order." },
      { status: 503 }
    );
  }

  const stripe = new Stripe(secretKey);
  const body = await request.json();
  const items: CartItem[] = body.items ?? [];

  if (!items.length) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const origin = request.headers.get("origin") ?? "http://localhost:3000";

  const lineItems = items.map((item) => {
    if (item.externalPriceId) {
      return { price: item.externalPriceId, quantity: item.qty };
    }
    return {
      quantity: item.qty,
      price_data: {
        currency: "gbp",
        unit_amount: item.pricePence,
        product_data: { name: `${item.emoji} ${item.name}` },
      },
    };
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/shop`,
    billing_address_collection: "required",
    shipping_address_collection: { allowed_countries: ["GB"] },
  });

  return NextResponse.json({ url: session.url });
}
