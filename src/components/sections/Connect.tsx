"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { covenantRenewers } from "@/lib/church-content";

const pathways = [
  { icon: "🙏", title: "New to CR?", desc: "First time? Plan a visit, know what to expect, and let us welcome you. No pressure, just family.", cta: "Plan My Visit", href: "#connect" },
  { icon: "⚡", title: "Join a Department", desc: "Find your tribe. From worship to tech to outreach — there's a team waiting for someone exactly like you.", cta: "See Departments", href: "#departments" },
  { icon: "📩", title: "Stay Connected", desc: "Get updates on events, drops, sermons, and everything CR straight to your inbox.", cta: "Subscribe Now", href: "#connect" },
];

export default function Connect() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");

  const handleSubmit = async () => {
    if (!email.trim()) { setError("Email address is required."); return; }
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/connect", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, phone, interest }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Something went wrong. Please try again.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = "w-full px-5 py-3.5 bg-white/[0.04] border border-gold/12 text-cream font-body text-[0.95rem] placeholder:text-off/40 focus:outline-none focus:border-gold/50 transition-colors";

  return (
    <section id="connect" className="relative bg-deep px-6 md:px-10 lg:px-16 py-16 md:py-28 overflow-hidden">
      {/* Radial bg */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(184,147,58,0.09) 0%, transparent 65%)" }}
      />

      <div ref={ref} className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="sec-label justify-center mb-6"
        >
          Join The Family
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display leading-[0.88] mb-6"
          style={{ fontSize: "clamp(2.8rem,8vw,9rem)", fontVariationSettings: '"wdth" 130' }}
        >
          THIS IS
          <br />
          <span className="text-stroke-gold">YOUR PLACE.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-off font-light leading-relaxed mb-6 max-w-xl mx-auto"
          style={{ fontSize: "1.05rem" }}
        >
          Whether you&apos;re visiting or already part of the church family, there is a
          place for you here. Take the first step and become part of the Covenant Renewers family.
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="font-serif italic border-l-2 border-gold pl-5 text-gold-light text-[0.95rem] leading-relaxed mb-14 max-w-lg mx-auto text-left"
        >
          &ldquo;{covenantRenewers.scripture.text}&rdquo;
          <cite className="not-italic block font-mono text-[0.55rem] tracking-widest text-off mt-2">
            — {covenantRenewers.scripture.ref}
          </cite>
        </motion.blockquote>

        {/* Pathway cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-px mb-16 text-left"
        >
          {pathways.map(({ icon, title, desc, cta, href }) => (
            <div
              key={title}
              className="group bg-card border border-gold/10 hover:border-gold/30 p-6 md:p-10 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div className="text-3xl mb-5">{icon}</div>
              <h3
                className="font-display text-cream mb-3"
                style={{ fontSize: "1.4rem", fontVariationSettings: '"wdth" 115' }}
              >
                {title}
              </h3>
              <p className="text-off text-[0.88rem] font-light leading-relaxed mb-6">{desc}</p>
              <a
                href={href}
                className="font-mono text-[0.58rem] tracking-[0.2em] uppercase text-gold flex items-center gap-2 hover:gap-4 transition-all duration-200"
                             >
                {cta} →
              </a>
            </div>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.42 }}
          className="max-w-2xl mx-auto text-left"
        >
          <div
            className="font-display text-gold mb-6"
            style={{ fontSize: "1.8rem", fontVariationSettings: '"wdth" 120' }}
          >
            REGISTER YOUR INTEREST
          </div>

          {submitted ? (
            <div className="bg-neon/10 border border-neon/30 p-8 text-center">
              <div className="text-4xl mb-3">✓</div>
              <div
                className="font-display text-neon"
                style={{ fontSize: "1.6rem", fontVariationSettings: '"wdth" 120' }}
              >
                YOU&apos;RE IN — WELCOME TO THE FAMILY!
              </div>
              <p className="text-off text-sm mt-2">We&apos;ll be in touch very soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input className={inputCls} placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <input className={inputCls} placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              <input className={`${inputCls} sm:col-span-2`} type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input className={inputCls} type="tel" placeholder="Phone (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <select
                className={`${inputCls} text-off/60`}
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
              >
                <option value="" disabled>I&apos;m interested in...</option>
                <option>Attending Sunday Service</option>
                <option>Joining CR Youth</option>
                <option>Joining a Department</option>
                <option>Just Staying Updated</option>
                <option>Volunteering</option>
              </select>
              {error && (
                <p className="sm:col-span-2 font-mono text-[0.56rem] tracking-[0.14em] uppercase text-ember">{error}</p>
              )}
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="sm:col-span-2 py-4 bg-gold hover:bg-gold-bright text-black font-display tracking-[0.18em] uppercase transition-colors duration-200 mt-1 sheen relative overflow-hidden disabled:opacity-50"
                style={{ fontSize: "1rem", fontVariationSettings: '"wdth" 130' }}
              >
                {submitting ? "Submitting..." : "Lock In — Join The Family"}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
