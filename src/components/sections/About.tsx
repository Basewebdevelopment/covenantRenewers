"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { beliefs, covenantRenewers, replib } from "@/lib/church-content";

const pillars = [
  { icon: "✝", name: "New Covenant", desc: "Written on our hearts — not in stone. (Jeremiah 31:33)" },
  { icon: "🔥", name: "Alive for Christ", desc: covenantRenewers.motto },
  { icon: "📖", name: replib.motto, desc: `${replib.mottoRef}` },
];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="px-10 md:px-16 py-28">
      <div className="grid md:grid-cols-2 gap-20 items-center">

        {/* Visual */}
        <Reveal>
          <div className="relative min-h-[460px]">
            <div className="absolute left-0 top-0 h-[78%] w-[82%] overflow-hidden border border-black/10 bg-card shadow-[0_28px_70px_rgba(17,17,17,0.12)]">
              <Image
                src="/images/church/R6II7788.jpg"
                alt="Covenant Renewers worship and community"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 82vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-white/10" />
              <div className="absolute bottom-5 left-5 border border-white/45 bg-black/35 px-4 py-2 font-mono text-[0.52rem] uppercase tracking-[0.24em] text-white backdrop-blur">
                REPLIB Birmingham · Est. {replib.founded}
              </div>
            </div>
            <div className="absolute bottom-0 right-0 h-[46%] w-[48%] overflow-hidden border-[6px] border-cream bg-card shadow-[0_18px_46px_rgba(17,17,17,0.16)]">
              <Image
                src="/images/church/R6II7742.jpg"
                alt="Covenant Renewers service moment"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 48vw, 20vw"
              />
            </div>
            <div className="absolute right-8 top-8 hidden h-28 w-28 items-center justify-center border border-ember/25 bg-cream/92 p-4 shadow-[0_12px_34px_rgba(17,17,17,0.12)] md:flex">
              <Image src="/brand/covenant-renewers-logo.png" alt="" fill className="object-contain" sizes="112px" />
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <div className="flex flex-col gap-7">
          <Reveal>
            <div className="sec-label">Who We Are</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              className="font-display leading-[0.88]"
              style={{ fontSize: "clamp(2.8rem,5.5vw,5.5rem)", fontVariationSettings: '"wdth" 125' }}
            >
              ABOUT <span style={{ color: "var(--gold)" }}>COVENANT</span>{" "}
              RENEWERS
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <blockquote
              className="font-serif italic border-l-2 pl-5 leading-relaxed"
              style={{ borderColor: "var(--gold)", color: "var(--gold-light)", fontSize: "1rem" }}
            >
              &ldquo;I will put my law in their minds and write it on their hearts.&rdquo;
              <br />
              <cite className="not-italic font-mono text-[0.6rem] tracking-widest text-off">
                — Jeremiah 31:33
              </cite>
            </blockquote>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="text-off font-light leading-relaxed" style={{ fontSize: "1.05rem" }}>
              {covenantRenewers.tagline} {replib.name} was founded in {replib.founded} by{" "}
              {replib.founder}.
            </p>
            <p className="text-off font-light leading-relaxed mt-4" style={{ fontSize: "1.05rem" }}>
              {covenantRenewers.meaning} {covenantRenewers.mission}
            </p>
          </Reveal>
          <Reveal delay={0.32}>
            <div className="grid grid-cols-3 gap-px mt-2">
              {pillars.map(({ icon, name, desc }) => (
                <div
                  key={name}
                  className="group bg-card border border-gold/10 hover:border-gold/35 p-6 relative overflow-hidden transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
                  <div className="text-2xl mb-3">{icon}</div>
                  <div
                    className="font-display text-cream mb-1"
                    style={{ fontSize: "1rem", fontVariationSettings: '"wdth" 120' }}
                  >
                    {name}
                  </div>
                  <div className="text-off text-[0.8rem] font-light leading-snug">{desc}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="flex flex-wrap gap-2 pt-2">
              {beliefs.map(({ topic, ref }) => (
                <span
                  key={topic}
                  className="font-mono text-[0.52rem] uppercase tracking-[0.16em] text-off border border-gold/15 px-3 py-1.5"
                >
                  {topic} · {ref}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
