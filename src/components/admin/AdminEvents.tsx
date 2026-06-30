"use client";

import { useEffect, useState } from "react";
import type { EventItem } from "@/lib/events";

const CAT_OPTIONS = ["special", "worship", "youth", "community"] as const;

const blankEvent: EventItem = {
  id: "new-event",
  day: "01",
  month: "Jan 2027",
  date: "2027-01-01",
  cat: "worship",
  catLabel: "Worship",
  title: "New Event",
  location: "CR Main Hall",
  time: "10:00 AM",
  note: "",
  detail: null,
  featured: false,
};

function updateEvent(events: EventItem[], index: number, patch: Partial<EventItem>) {
  return events.map((e, i) => (i === index ? { ...e, ...patch } : e));
}

export default function AdminEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("Loading events...");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setToken(window.localStorage.getItem("cr_admin_token") || "");
    fetch("/api/events", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        setEvents(data.events || []);
        setStatus("Events loaded.");
      })
      .catch(() => setStatus("Could not load events."));
  }, []);

  const save = async () => {
    setSaving(true);
    setStatus("Saving...");
    window.localStorage.setItem("cr_admin_token", token);

    const r = await fetch("/api/events", {
      method: "PUT",
      headers: { "content-type": "application/json", "x-admin-token": token },
      body: JSON.stringify({ events }),
    });

    const data = await r.json();
    setSaving(false);

    if (!r.ok) {
      setStatus(data.error || "Could not save events.");
      return;
    }

    setEvents(data.events);
    setStatus("Events saved.");
  };

  const addEvent = () =>
    setEvents((prev) => [
      ...prev,
      { ...blankEvent, id: `event-${Date.now()}` },
    ]);

  const removeEvent = (index: number) =>
    setEvents((prev) => prev.filter((_, i) => i !== index));

  const inputCls =
    "w-full px-3 py-2 bg-white border border-black/15 text-black text-sm focus:outline-none focus:border-ember/60";

  return (
    <div className="min-h-screen bg-[#fafaf8] px-6 py-10 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-ember mb-1">
              Admin
            </div>
            <h1
              className="font-display text-black"
              style={{ fontSize: "2.5rem", fontVariationSettings: '"wdth" 125' }}
            >
              EVENTS
            </h1>
          </div>
          <a href="/admin/store" className="btn-ghost text-[0.58rem] py-2 px-4">
            ← Store
          </a>
        </div>

        <div className="mb-6 flex flex-wrap gap-3 items-center">
          <input
            className={`${inputCls} max-w-xs`}
            type="password"
            placeholder="Admin token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <button
            onClick={save}
            disabled={saving}
            className="btn-gold text-[0.72rem] py-2.5 px-6 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save All Events"}
          </button>
          <button
            onClick={addEvent}
            className="btn-ghost text-[0.65rem] py-2.5 px-5"
          >
            + Add Event
          </button>
          <span className="font-mono text-[0.56rem] tracking-[0.15em] uppercase text-black/45">
            {status}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="bg-white border border-black/10 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="font-display text-black"
                  style={{ fontSize: "1.1rem", fontVariationSettings: '"wdth" 115' }}
                >
                  {event.title || "Untitled Event"}
                </div>
                <button
                  onClick={() => removeEvent(index)}
                  className="font-mono text-[0.52rem] tracking-[0.15em] uppercase text-black/35 hover:text-ember transition-colors"
                >
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                <div>
                  <label className="font-mono text-[0.52rem] tracking-[0.18em] uppercase text-black/50 block mb-1">
                    Title
                  </label>
                  <input
                    className={inputCls}
                    value={event.title}
                    onChange={(e) =>
                      setEvents(updateEvent(events, index, { title: e.target.value }))
                    }
                  />
                </div>

                <div>
                  <label className="font-mono text-[0.52rem] tracking-[0.18em] uppercase text-black/50 block mb-1">
                    Date (YYYY-MM-DD)
                  </label>
                  <input
                    className={inputCls}
                    type="date"
                    value={event.date}
                    onChange={(e) => {
                      const d = new Date(e.target.value);
                      const day = String(d.getUTCDate()).padStart(2, "0");
                      const month = d.toLocaleDateString("en-GB", {
                        month: "short",
                        year: "numeric",
                        timeZone: "UTC",
                      });
                      setEvents(
                        updateEvent(events, index, {
                          date: e.target.value,
                          day,
                          month,
                        })
                      );
                    }}
                  />
                </div>

                <div>
                  <label className="font-mono text-[0.52rem] tracking-[0.18em] uppercase text-black/50 block mb-1">
                    Category
                  </label>
                  <select
                    className={inputCls}
                    value={event.cat}
                    onChange={(e) => {
                      const cat = e.target.value as EventItem["cat"];
                      const labels: Record<string, string> = {
                        special: "Special Event",
                        worship: "Worship",
                        youth: "Youth",
                        community: "Community",
                      };
                      setEvents(
                        updateEvent(events, index, { cat, catLabel: labels[cat] })
                      );
                    }}
                  >
                    {CAT_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-mono text-[0.52rem] tracking-[0.18em] uppercase text-black/50 block mb-1">
                    Location
                  </label>
                  <input
                    className={inputCls}
                    value={event.location}
                    onChange={(e) =>
                      setEvents(updateEvent(events, index, { location: e.target.value }))
                    }
                  />
                </div>

                <div>
                  <label className="font-mono text-[0.52rem] tracking-[0.18em] uppercase text-black/50 block mb-1">
                    Time
                  </label>
                  <input
                    className={inputCls}
                    value={event.time}
                    onChange={(e) =>
                      setEvents(updateEvent(events, index, { time: e.target.value }))
                    }
                  />
                </div>

                <div>
                  <label className="font-mono text-[0.52rem] tracking-[0.18em] uppercase text-black/50 block mb-1">
                    Note (e.g. &quot;Open to All&quot;)
                  </label>
                  <input
                    className={inputCls}
                    value={event.note ?? ""}
                    onChange={(e) =>
                      setEvents(updateEvent(events, index, { note: e.target.value }))
                    }
                  />
                </div>

                <div className="col-span-2 md:col-span-3">
                  <label className="font-mono text-[0.52rem] tracking-[0.18em] uppercase text-black/50 block mb-1">
                    Detail (optional longer description)
                  </label>
                  <textarea
                    className={`${inputCls} resize-none`}
                    rows={2}
                    value={event.detail ?? ""}
                    onChange={(e) =>
                      setEvents(
                        updateEvent(events, index, { detail: e.target.value || null })
                      )
                    }
                  />
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 font-mono text-[0.55rem] tracking-[0.15em] uppercase text-black/55">
                    <input
                      type="checkbox"
                      checked={event.featured}
                      onChange={(e) =>
                        setEvents(updateEvent(events, index, { featured: e.target.checked }))
                      }
                    />
                    Featured
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
