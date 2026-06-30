"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { EventItem } from "@/lib/events";

const catStyles: Record<string, string> = {
  special: "border-gold/40 text-gold-light",
  worship: "border-gold/30 text-gold",
  youth: "border-ember/40 text-ember",
  community: "border-neon/40 text-neon",
};

function EventCard({ event, index }: { event: EventItem; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`group bg-card border border-gold/10 hover:border-gold/30 overflow-hidden transition-all duration-300 flex flex-col ${event.featured ? "md:row-span-2" : ""}`}
    >
      <div className="h-[3px] bg-gradient-to-r from-gold via-ember to-neon opacity-60 group-hover:opacity-100 transition-opacity" />
      <div className="p-5 md:p-8 flex-1">
        <div className="flex items-baseline gap-4 mb-5">
          <span
            className="font-display text-gold leading-none"
            style={{ fontSize: event.featured ? "clamp(2.5rem,6vw,4rem)" : "clamp(2rem,5vw,3rem)", fontVariationSettings: '"wdth" 140' }}
          >
            {event.day}
          </span>
          <span className="font-mono text-[0.58rem] tracking-[0.2em] uppercase text-off">{event.month}</span>
        </div>
        <span className={`font-mono text-[0.54rem] tracking-[0.2em] uppercase border px-3 py-1 inline-block mb-4 ${catStyles[event.cat] ?? "border-gold/20 text-gold"}`}>
          {event.catLabel}
        </span>
        <h3
          className="font-display text-cream mb-3"
          style={{ fontSize: event.featured ? "clamp(1.5rem,3.5vw,2.2rem)" : "clamp(1.2rem,3vw,1.6rem)", fontVariationSettings: '"wdth" 115', lineHeight: 1 }}
        >
          {event.title}
        </h3>
        {event.detail && (
          <p className="text-off text-[0.88rem] font-light leading-relaxed mb-4">{event.detail}</p>
        )}
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-off text-[0.82rem] font-light">
          <span>📍 {event.location}</span>
          <span>🕐 {event.time}</span>
        </div>
      </div>
      <div className="px-5 md:px-8 py-4 border-t border-gold/8 flex flex-wrap justify-between items-center gap-2">
        <a href="#connect" className="font-mono text-[0.58rem] tracking-[0.18em] uppercase text-gold flex items-center gap-2 group/l hover:gap-4 transition-all duration-200">
          {event.featured ? "Register Free" : "Attend"}
          <span className="transition-transform group-hover/l:translate-x-1">→</span>
        </a>
        {event.note && <span className="font-mono text-[0.56rem] tracking-[0.1em] text-off">{event.note}</span>}
      </div>
    </motion.div>
  );
}

export default function Events({ initialEvents }: { initialEvents: EventItem[] }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const events = initialEvents.filter((e) => new Date(e.date) >= today);

  return (
    <section id="events" className="bg-mid px-6 md:px-10 lg:px-16 py-16 md:py-28">
      <div className="mb-14">
        <div className="sec-label mb-4">What&apos;s On</div>
        <h2
          className="font-display leading-[0.88]"
          style={{ fontSize: "clamp(3rem,6vw,6rem)", fontVariationSettings: '"wdth" 125' }}
        >
          UPCOMING <span style={{ color: "var(--gold)" }}>EVENTS</span>
        </h2>
      </div>

      {events.length === 0 ? (
        <div className="border border-gold/10 bg-card p-16 text-center">
          <div className="font-display text-off" style={{ fontSize: "1.4rem", fontVariationSettings: '"wdth" 115' }}>
            No upcoming events right now.
          </div>
          <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-off/60 mt-3">
            Check back soon — something is always coming.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-px">
          {events.map((e, i) => <EventCard key={e.id} event={e} index={i} />)}
        </div>
      )}
    </section>
  );
}
