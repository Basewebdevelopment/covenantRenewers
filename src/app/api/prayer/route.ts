import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

interface PrayerRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  category: string;
  request: string;
  anonymous: boolean;
  urgent: boolean;
  submittedAt: string;
}

const prayersPath = path.join(process.cwd(), "data", "prayers.json");

async function readPrayers(): Promise<PrayerRequest[]> {
  try {
    const raw = await fs.readFile(prayersPath, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.request?.trim()) {
    return NextResponse.json({ error: "Prayer request text is required" }, { status: 400 });
  }

  const entry: PrayerRequest = {
    id: `prayer-${Date.now()}`,
    firstName: body.firstName?.trim() || "",
    lastName: body.lastName?.trim() || "",
    email: body.email?.trim() || "",
    category: body.category?.trim() || "Other",
    request: body.request.trim(),
    anonymous: Boolean(body.anonymous),
    urgent: Boolean(body.urgent),
    submittedAt: new Date().toISOString(),
  };

  const prayers = await readPrayers();
  prayers.push(entry);
  await fs.mkdir(path.dirname(prayersPath), { recursive: true });
  await fs.writeFile(prayersPath, `${JSON.stringify(prayers, null, 2)}\n`, "utf8");

  return NextResponse.json({ ok: true });
}
