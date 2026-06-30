"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { crLeadership, crTeams, covenantRenewers, youthLeader } from "@/lib/church-content";

export default function Youth() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="youth" className="relative bg-black px-6 md:px-10 lg:px-16 py-16 md:py-28 overflow-hidden">
      {/* BG text */}
      <div
        className="pointer-events-none select-none absolute font-display text-[22vw] text-ember/[0.04] whitespace-nowrap top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
        style={{ fontVariationSettings: '"wdth" 150' }}
      >
        YOUTH
      </div>

      <div ref={ref} className="relative z-10 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div
              className="badge-ping inline-flex items-center gap-2 bg-ember px-5 py-2 mb-6 relative overflow-hidden"
            >
              <span
                className="font-display text-cream tracking-[0.2em] uppercase"
                style={{ fontSize: "0.85rem", fontVariationSettings: '"wdth" 130' }}
              >
                ⚡ {covenantRenewers.motto}
              </span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display leading-[0.88] mb-6"
            style={{ fontSize: "clamp(3rem,7vw,7rem)", fontVariationSettings: '"wdth" 130' }}
          >
            THE YOUTH
            <br />
            DEPARTMENT
            <br />
            <span style={{ color: "var(--ember)" }}>OF REPLIB.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-off font-light leading-relaxed mb-8"
            style={{ fontSize: "1.05rem" }}
          >
            {covenantRenewers.tagline} We stand for truth — the saving knowledge of Jesus —
            and proclaim the good news through music, spoken word, and creative arts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="mb-10 border border-ember/25 bg-white/[0.03] p-6"
          >
            <div className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-ember mb-5">
              Youth Leader
            </div>
            <div className="flex gap-5 items-start">
              <div
                className="relative w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center border-2"
                style={{
                  borderColor: "rgba(214,48,16,0.5)",
                  background: "radial-gradient(135deg, rgba(214,48,16,0.15), transparent)",
                }}
              >
                <span
                  className="font-display text-lg text-ember"
                  style={{ fontVariationSettings: '"wdth" 130' }}
                >
                  {youthLeader.initials}
                </span>
              </div>
              <div>
                <h3
                  className="font-display text-cream mb-1"
                  style={{ fontSize: "1.35rem", fontVariationSettings: '"wdth" 115' }}
                >
                  {youthLeader.name}
                </h3>
                <div className="font-mono text-[0.58rem] tracking-[0.18em] uppercase text-ember mb-3">
                  {youthLeader.role}
                </div>
                <p className="text-off text-[0.88rem] font-light leading-relaxed mb-4">
                  {youthLeader.bio}
                </p>
                {youthLeader.quote && (
                  <blockquote
                    className="font-serif italic border-l-2 border-ember pl-4 text-[0.82rem] leading-relaxed text-ember/80"
                  >
                    &ldquo;{youthLeader.quote}&rdquo;
                  </blockquote>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.42 }}
            className="mb-10"
          >
            <div className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-ember mb-4">
              Our Teams
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {crTeams.map((team) => (
                <div key={team} className="flex items-start gap-3 text-off text-[0.88rem] font-light">
                  <span className="mt-[6px] w-[5px] h-[5px] bg-ember flex-shrink-0" />
                  {team}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.48 }}
            className="mb-10 border border-white/10 p-6"
          >
            <div className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-ember mb-4">
              Youth Leadership Team
            </div>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
              {crLeadership.map(({ name, role }) => (
                <div key={name} className="text-off text-[0.88rem] font-light">
                  <span className="text-cream">{name}</span>
                  <span className="text-off/60"> · {role}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.52 }}
            className="flex gap-4 flex-wrap"
          >
            <a href="#connect" className="btn-gold sheen relative overflow-hidden" style={{ background: "var(--ember)" }}>
              Join CR Youth
            </a>
            <a href="#store" className="btn-ghost">
              Shop Youth Merch →
            </a>
          </motion.div>
        </div>

        {/* Youth visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden min-h-[520px] items-center justify-center md:flex"
        >
          <div
            className="absolute h-[420px] w-[420px] rounded-full pointer-events-none gold-pulse"
            style={{ background: "radial-gradient(ellipse, rgba(214,48,16,0.16) 0%, transparent 70%)" }}
          />
          <div className="relative h-[500px] w-full max-w-[520px]">
            <div className="absolute inset-x-8 inset-y-0 border border-ember/20" />
            <div className="absolute left-0 top-8 h-[74%] w-[74%] overflow-hidden border border-white/60 bg-card shadow-[0_24px_60px_rgba(17,17,17,0.18)]">
              <Image
                src="/images/church/R6II7808.jpg"
                alt="CR Youth worship moment"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 0px, 38vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-white/10" />
              <div className="absolute bottom-5 left-5 font-display text-cream" style={{ fontSize: "2rem", fontVariationSettings: '"wdth" 130' }}>
                CR
              </div>
            </div>
            <div className="absolute bottom-7 right-0 h-[42%] w-[52%] overflow-hidden border-[6px] border-cream bg-card shadow-[0_18px_46px_rgba(17,17,17,0.18)]">
              <Image
                src="/images/church/R6II7708.jpg"
                alt="Young people serving at Covenant Renewers"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 0px, 22vw"
              />
            </div>
            <div className="absolute right-8 top-0 bg-ember px-5 py-3 font-mono text-[0.55rem] uppercase tracking-[0.25em] text-white shadow-[0_14px_38px_rgba(199,34,42,0.25)]">
              Alive for Christ
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
