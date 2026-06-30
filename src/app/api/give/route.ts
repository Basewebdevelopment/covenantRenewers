import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const FUND_DESCRIPTIONS: Record<string, string> = {
  general: "General Fund — Covenant Renewers",
  youth: "CR Youth Fund — Covenant Renewers",
  outreach: "Outreach & Missions — Covenant Renewers",
  building: "Building Fund — Covenant Renewers",
};

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json(
      { error: "Online giving is not configured yet. Please use bank transfer or give in person." },
      { status: 503 }
    );
  }

  const stripe = new Stripe(secretKey);
  const body = await request.json();

  const amountPence = Math.round(Number(body.amount) * 100);
  const fund: string = body.fund ?? "general";
  const frequency: "one-off" | "monthly" = body.frequency ?? "one-off";

  if (!amountPence || amountPence < 100) {
    return NextResponse.json({ error: "Minimum gift is £1" }, { status: 400 });
  }

  const origin = request.headers.get("origin") ?? "http://localhost:3000";
  const description = FUND_DESCRIPTIONS[fund] ?? "Donation — Covenant Renewers";

  if (frequency === "monthly") {
    const price = await stripe.prices.create({
      currency: "gbp",
      unit_amount: amountPence,
      recurring: { interval: "month" },
      product_data: { name: description },
    });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: price.id, quantity: 1 }],
      success_url: `${origin}/give/success`,
      cancel_url: `${origin}/#give`,
      billing_address_collection: "required",
    });

    return NextResponse.json({ url: session.url });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "gbp",
          unit_amount: amountPence,
          product_data: { name: description },
        },
      },
    ],
    success_url: `${origin}/give/success`,
    cancel_url: `${origin}/#give`,
    billing_address_collection: "required",
  });

  return NextResponse.json({ url: session.url });
}
