"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { deacons, leaders, ministers, replib } from "@/lib/church-content";
import type { Leader } from "@/lib/church-content";

function LeaderCard({ leader, index }: { leader: Leader; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: (index % 3) * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative bg-card border border-gold/10 hover:border-gold/30 overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      <div
        className="h-[2px] w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{ background: leader.accent }}
      />

      <div
        className="relative h-52 flex items-center justify-center overflow-hidden"
        style={{
          background: leader.photo
            ? undefined
            : `radial-gradient(ellipse at 50% 60%, ${leader.accent}22 0%, transparent 70%), var(--mid)`,
        }}
      >
        {leader.photo ? (
          <Image
            src={leader.photo}
            alt={leader.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div
            className="relative w-24 h-24 rounded-full flex items-center justify-center border-2"
            style={{
              borderColor: `${leader.accent}50`,
              background: `radial-gradient(135deg, ${leader.accent}18, transparent)`,
            }}
          >
            <span
              className="font-display text-2xl"
              style={{
                color: leader.accent,
                fontVariationSettings: '"wdth" 130',
              }}
            >
              {leader.initials}
            </span>
            <div
              className="absolute w-2.5 h-2.5 rounded-full top-0 right-1"
              style={{ background: leader.accent, boxShadow: `0 0 8px ${leader.accent}` }}
            />
          </div>
        )}

        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[0.52rem] tracking-[0.2em] uppercase px-3 py-1 border max-w-[90%] truncate text-center"
          style={{
            borderColor: leader.photo ? `rgba(255,255,255,0.5)` : `${leader.accent}40`,
            color: leader.photo ? `#fff` : leader.accent,
            background: leader.photo ? `rgba(0,0,0,0.45)` : undefined,
            backdropFilter: leader.photo ? `blur(4px)` : undefined,
          }}
        >
          {leader.dept}
        </div>
      </div>

      <div className="p-7 flex flex-col flex-1">
        <h3
          className="font-display text-cream mb-1"
          style={{ fontSize: "1.35rem", fontVariationSettings: '"wdth" 115' }}
        >
          {leader.name}
        </h3>
        <div className="font-mono text-[0.58rem] tracking-[0.18em] uppercase mb-4"
          style={{ color: leader.accent }}>
          {leader.role}
        </div>
        <p className="text-off text-[0.85rem] font-light leading-relaxed flex-1">
          {leader.bio}
        </p>
        {leader.quote && (
          <blockquote
            className="font-serif italic border-l-2 pl-4 mt-5 text-[0.82rem] leading-relaxed"
            style={{ borderColor: leader.accent, color: `${leader.accent}cc` }}
          >
            &ldquo;{leader.quote}&rdquo;
          </blockquote>
        )}
      </div>
    </motion.div>
  );
}

export default function Leadership() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const featured = leaders[0];

  return (
    <section id="leadership" className="bg-deep px-6 md:px-10 lg:px-16 py-16 md:py-28">
      <div className="grid md:grid-cols-2 gap-10 items-end mb-16">
        <div>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="sec-label mb-4"
          >
            {replib.shortName} Leadership
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display leading-[0.88]"
            style={{
              fontSize: "clamp(3rem,6vw,6rem)",
              fontVariationSettings: '"wdth" 125',
            }}
          >
            THOSE WHO <span style={{ color: "var(--gold)" }}>LEAD</span>
            <br />
            <span className="text-stroke-cream" style={{ fontSize: "clamp(2.2rem,4.5vw,4.5rem)" }}>
              THE WAY.
            </span>
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-off font-light leading-relaxed"
          style={{ fontSize: "1rem" }}
        >
          {replib.name} Birmingham — founded in {replib.founded} by {replib.founder}.
          Under {replib.generalOverseer}, our pastors and leaders serve with humility and
          walk alongside every member of this family.
        </motion.p>
      </div>

      <div className="flex flex-col gap-px">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="group relative bg-card border border-gold/15 hover:border-gold/40 overflow-hidden transition-all duration-300"
        >
          <div className="h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          <div className="grid md:grid-cols-[280px_1fr] gap-0">
            <div
              className="relative flex items-center justify-center h-64 md:h-full min-h-[260px] overflow-hidden"
              style={{
                background: featured.photo
                  ? undefined
                  : "radial-gradient(ellipse at 50% 60%, rgba(184,147,58,0.25) 0%, transparent 70%), var(--mid)",
              }}
            >
              {featured.photo ? (
                <Image
                  src={featured.photo}
                  alt={featured.name}
                  fill
                  className="object-cover object-top"
                  sizes="280px"
                />
              ) : (
                <div
                  className="relative w-32 h-32 rounded-full flex items-center justify-center border-2 border-gold/50"
                  style={{ background: "radial-gradient(135deg, rgba(184,147,58,0.15), transparent)" }}
                >
                  <span
                    className="font-display text-gold text-3xl"
                    style={{ fontVariationSettings: '"wdth" 140' }}
                  >
                    {featured.initials}
                  </span>
                  <div className="absolute w-3 h-3 rounded-full bg-gold top-0 right-2"
                    style={{ boxShadow: "0 0 12px var(--gold)" }} />
                </div>
              )}
              <div
                className="absolute bottom-5 font-mono text-[0.52rem] tracking-[0.22em] uppercase px-4 py-1.5"
                style={{
                  color: featured.photo ? "#fff" : "var(--gold)",
                  borderColor: featured.photo ? "rgba(255,255,255,0.5)" : "rgba(184,147,58,0.3)",
                  border: "1px solid",
                  background: featured.photo ? "rgba(0,0,0,0.45)" : undefined,
                  backdropFilter: featured.photo ? "blur(4px)" : undefined,
                }}
              >
                {featured.dept}
              </div>
            </div>
            <div className="p-6 md:p-10">
              <div className="font-mono text-[0.55rem] tracking-[0.3em] uppercase text-gold/60 mb-2">
                // Head Pastor &amp; First Lady
              </div>
              <h3
                className="font-display text-cream mb-2"
                style={{ fontSize: "clamp(1.5rem,4vw,2.2rem)", fontVariationSettings: '"wdth" 120' }}
              >
                {featured.name}
              </h3>
              <div className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-gold mb-6">
                {featured.role}
              </div>
              <p className="text-off font-light leading-relaxed mb-6 max-w-xl"
                style={{ fontSize: "1rem" }}>
                {featured.bio}
              </p>
              {featured.quote && (
                <blockquote className="font-serif italic border-l-2 border-gold pl-5 text-gold-light text-[0.95rem] leading-relaxed">
                  &ldquo;{featured.quote}&rdquo;
                </blockquote>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-px">
          {leaders.slice(1).map((leader, i) => (
            <LeaderCard key={leader.initials} leader={leader} index={i + 1} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-px grid md:grid-cols-2 gap-px"
        >
          <div className="bg-card border border-gold/10 p-8">
            <div className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-gold mb-5">
              Our Ministers
            </div>
            <ul className="space-y-2">
              {ministers.map((name) => (
                <li key={name} className="text-off text-[0.9rem] font-light">{name}</li>
              ))}
            </ul>
          </div>
          <div className="bg-card border border-gold/10 p-8">
            <div className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-gold mb-5">
              Deacons &amp; Deaconesses
            </div>
            <ul className="space-y-2">
              {deacons.map((name) => (
                <li key={name} className="text-off text-[0.9rem] font-light">{name}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
