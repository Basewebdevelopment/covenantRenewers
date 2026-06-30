import { promises as fs } from "fs";
import path from "path";

export type EventCat = "special" | "worship" | "youth" | "community";

export interface EventItem {
  id: string;
  day: string;
  month: string;
  date: string;
  cat: EventCat;
  catLabel: string;
  title: string;
  location: string;
  time: string;
  note?: string;
  detail?: string | null;
  featured?: boolean;
}

const eventsPath = path.join(process.cwd(), "data", "events.json");

export async function readEvents(): Promise<EventItem[]> {
  const raw = await fs.readFile(eventsPath, "utf8");
  return JSON.parse(raw) as EventItem[];
}

export async function writeEvents(events: EventItem[]) {
  await fs.mkdir(path.dirname(eventsPath), { recursive: true });
  await fs.writeFile(eventsPath, `${JSON.stringify(events, null, 2)}\n`, "utf8");
}

export function upcomingEvents(events: EventItem[]): EventItem[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return events.filter((e) => new Date(e.date) >= today);
}
