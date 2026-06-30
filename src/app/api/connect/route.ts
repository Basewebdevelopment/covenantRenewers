import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

interface ConnectionEntry {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: string;
  submittedAt: string;
}

const connectionsPath = path.join(process.cwd(), "data", "connections.json");

async function readConnections(): Promise<ConnectionEntry[]> {
  try {
    const raw = await fs.readFile(connectionsPath, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.email?.trim()) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const entry: ConnectionEntry = {
    id: `connect-${Date.now()}`,
    firstName: body.firstName?.trim() || "",
    lastName: body.lastName?.trim() || "",
    email: body.email.trim(),
    phone: body.phone?.trim() || "",
    interest: body.interest?.trim() || "",
    submittedAt: new Date().toISOString(),
  };

  const connections = await readConnections();
  connections.push(entry);
  await fs.mkdir(path.dirname(connectionsPath), { recursive: true });
  await fs.writeFile(connectionsPath, `${JSON.stringify(connections, null, 2)}\n`, "utf8");

  return NextResponse.json({ ok: true });
}
