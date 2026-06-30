import { NextResponse } from "next/server";
import type { EventItem } from "@/lib/events";
import { readEvents, writeEvents } from "@/lib/events";
import { verifyAdminToken } from "@/lib/products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const events = await readEvents();
  return NextResponse.json({ events });
}

export async function PUT(request: Request) {
  const token = request.headers.get("x-admin-token");

  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const events: EventItem[] | null = Array.isArray(body.events) ? body.events : null;

  if (!events) {
    return NextResponse.json({ error: "Expected events array" }, { status: 400 });
  }

  if (events.some((e) => !e.id || !e.title || !e.date)) {
    return NextResponse.json({ error: "Each event needs an id, title, and date" }, { status: 400 });
  }

  await writeEvents(events);
  return NextResponse.json({ events });
}
