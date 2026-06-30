"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const categories = [
  "Health & Healing",
  "Family",
  "Work & Finance",
  "Relationships",
  "Mental Health",
  "Missions & Church",
  "Personal Faith",
  "Other",
];

const testimonies = [
  { text: "I submitted a prayer for my mum's surgery — three elders reached out within hours. She came through perfectly.", name: "CR Member", dept: "Birmingham" },
  { text: "The prayer team carried me through the hardest season of my life. I never felt alone.", name: "CR Youth Member", dept: "CR Youth" },
  { text: "After weeks of prayer through this community, I got the job. God is not slow on His promises.", name: "Anonymous", dept: "Marketplace Dept" },
];

export default function PrayerRequest() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [selected, setSelected] = useState<string | null>(null);
  const [anonymous, setAnonymous] = useState(false);
  const [urgent, setUrgent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [prayerText, setPrayerText] = useState("");

  const handleSubmit = async () => {
    if (!prayerText.trim()) { setError("Please write your prayer request."); return; }
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/prayer", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, category: selected ?? "Other", request: prayerText, anonymous, urgent }),
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

  const inputCls =
    "w-full max-w-full px-5 py-3.5 bg-white/[0.04] border border-gold/12 text-cream font-body text-[0.95rem] placeholder:text-off/40 focus:outline-none focus:border-gold/50 transition-colors";

  return (
    <section id="prayer" className="relative bg-black px-6 py-20 md:px-16 md:py-28 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: "100%",
          height: "min(600px, 100vw)",
          background:
            "radial-gradient(ellipse at 100% 0%, rgba(184,147,58,0.08) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 pointer-events-none"
        style={{
          width: "100%",
          height: "min(500px, 100vw)",
          background:
            "radial-gradient(ellipse at 0% 100%, rgba(26,53,212,0.07) 0%, transparent 65%)",
        }}
      />

      <div ref={ref} className="relative z-10">
        {/* Header */}
        <div className="grid min-w-0 gap-10 md:grid-cols-2 md:items-end md:gap-12 mb-12 md:mb-16">
          <div className="min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="sec-label mb-4"
            >
              Prayer Team
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display leading-[0.88]"
              style={{
                fontSize: "clamp(2.6rem,6vw,6rem)",
                fontVariationSettings: '"wdth" 125',
              }}
            >
              LET US
              <br />
              <span style={{ color: "var(--gold)" }}>PRAY</span>
              <br />
              <span
                className="text-stroke-cream"
                style={{ fontSize: "clamp(2rem,4vw,4rem)" }}
              >
                WITH YOU.
              </span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="min-w-0"
          >
            <p className="text-off font-light leading-relaxed mb-6" style={{ fontSize: "1rem" }}>
              You don&apos;t have to carry it alone. Our prayer team reads every
              request and prays over each one. If you mark it urgent, a pastor
              or elder will personally reach out.
            </p>
            {/* Stats row */}
            <div className="grid grid-cols-1 gap-px sm:grid-cols-3">
              {[
                { num: "100%", label: "Read by a human" },
                { num: "24h", label: "Response on urgent" },
                { num: "∞", label: "Confidential" },
              ].map(({ num, label }) => (
                <div key={label} className="bg-card border border-gold/10 p-5">
                  <div
                    className="font-display text-gold mb-1"
                    style={{ fontSize: "1.8rem", fontVariationSettings: '"wdth" 140' }}
                  >
                    {num}
                  </div>
                  <div className="font-mono text-[0.55rem] tracking-[0.18em] uppercase text-off">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid min-w-0 gap-px lg:grid-cols-[minmax(0,1fr)_minmax(320px,400px)]">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="min-w-0 bg-card border border-gold/10 p-5 sm:p-8 md:p-10"
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10 gap-5">
                <div
                  className="w-20 h-20 rounded-full border-2 border-neon/40 flex items-center justify-center"
                  style={{ background: "rgba(0,212,138,0.08)" }}
                >
                  <span className="h-9 w-9 border border-neon/50" />
                </div>
                <h3
                  className="font-display text-neon"
                  style={{ fontSize: "2rem", fontVariationSettings: '"wdth" 120' }}
                >
                  RECEIVED.
                </h3>
                <p className="text-off font-light text-[0.95rem] leading-relaxed max-w-sm">
                  Your prayer request has been received. Our prayer team will
                  be lifting you up.{" "}
                  {urgent && (
                    <span style={{ color: "var(--gold)" }}>
                      A pastor will reach out within 24 hours.
                    </span>
                  )}
                </p>
                <button
                  onClick={() => { setSubmitted(false); setSelected(null); setUrgent(false); setAnonymous(false); setFirstName(""); setLastName(""); setEmail(""); setPrayerText(""); setError(""); }}
                  className="btn-ghost text-[0.6rem] mt-2"
                                 >
                  Submit Another →
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <div
                  className="font-display text-gold mb-2"
                  style={{ fontSize: "1.5rem", fontVariationSettings: '"wdth" 120' }}
                >
                  SUBMIT YOUR REQUEST
                </div>

                {/* Category selector */}
                <div>
                  <div className="font-mono text-[0.56rem] tracking-[0.22em] uppercase text-off mb-3">
                    Category
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                    {categories.map((label, index) => (
                      <button
                        key={label}
                        onClick={() => setSelected(label)}
                        className={`min-h-20 min-w-0 border p-3 text-center transition-all duration-200 ${
                          selected === label
                            ? "border-gold/60 bg-gold/8 text-gold"
                            : "border-gold/10 text-off hover:border-gold/30 hover:text-cream"
                        }`}
                                             >
                        <span className="mb-2 block font-display text-lg leading-none text-ember/70">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="block break-words font-mono text-[0.48rem] tracking-[0.12em] uppercase leading-tight">
                          {label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name fields — hidden if anonymous */}
                {!anonymous && (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <input className={inputCls} placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <input className={inputCls} placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                )}

                <input
                  className={inputCls}
                  type="email"
                  placeholder={anonymous ? "Email (optional — for follow-up only)" : "Email Address"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <textarea
                  className={`${inputCls} resize-none`}
                  rows={5}
                  placeholder="Share your prayer request here. Be as open as you feel comfortable — this is a safe space..."
                  value={prayerText}
                  onChange={(e) => setPrayerText(e.target.value)}
                />

                {/* Toggles */}
                <div className="flex flex-col gap-3">
                  {[
                    { label: "Submit anonymously — keep my name private", state: anonymous, set: setAnonymous },
                    { label: "This is urgent — I need pastoral contact within 24 hours", state: urgent, set: setUrgent },
                  ].map(({ label, state, set }) => (
                    <label
                      key={label}
                      className="flex items-start gap-3 cursor-none group"
                      onClick={() => set(!state)}
                    >
                      <div
                        className={`mt-0.5 w-5 h-5 border flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
                          state ? "bg-gold border-gold" : "border-gold/25 group-hover:border-gold/50"
                        }`}
                      >
                        {state && <span className="text-black text-xs font-bold">✓</span>}
                      </div>
                      <span className="min-w-0 break-words font-mono text-[0.58rem] tracking-[0.12em] uppercase text-off leading-relaxed">
                        {label}
                      </span>
                    </label>
                  ))}
                </div>

                {error && (
                  <p className="font-mono text-[0.56rem] tracking-[0.14em] uppercase text-ember">{error}</p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="btn-gold sheen relative overflow-hidden mt-1 justify-center disabled:opacity-50"
                >
                  {submitting ? "Sending..." : urgent ? "Send Urgent Prayer Request" : "Send My Prayer Request"}
                </button>
              </div>
            )}
          </motion.div>

          {/* Sidebar — testimonies + prayer promise */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="min-w-0 flex flex-col gap-px"
          >
            {/* Scripture */}
            <div
              className="bg-card border border-gold/15 p-8"
              style={{
                background:
                  "linear-gradient(135deg, rgba(184,147,58,0.08), rgba(26,53,212,0.05))",
              }}
            >
              <div className="font-mono text-[0.54rem] tracking-[0.25em] uppercase text-gold mb-4">
                // His Promise
              </div>
              <blockquote
                className="font-serif italic leading-relaxed"
                style={{ fontSize: "1.05rem", color: "var(--gold-light)" }}
              >
                &ldquo;The prayer of a righteous person is powerful and effective.&rdquo;
              </blockquote>
              <cite className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-off mt-3 block not-italic">
                — James 5:16
              </cite>
            </div>

            {/* Testimonies */}
            <div className="bg-card border border-gold/10 p-8 flex-1">
              <div className="font-mono text-[0.54rem] tracking-[0.25em] uppercase text-gold mb-6">
                // Prayer Stories
              </div>
              <div className="flex flex-col gap-6">
                {testimonies.map(({ text, name, dept }) => (
                  <div
                    key={name + dept}
                    className="border-l-2 border-gold/20 pl-4"
                  >
                    <p className="text-off text-[0.82rem] font-light leading-relaxed mb-2">
                      &ldquo;{text}&rdquo;
                    </p>
                    <div className="font-mono text-[0.52rem] tracking-[0.15em] uppercase" style={{ color: "var(--gold)" }}>
                      {name}
                    </div>
                    <div className="font-mono text-[0.48rem] tracking-[0.15em] uppercase text-off/50">
                      {dept}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct contact note */}
            <div className="bg-ember/8 border border-ember/20 p-6">
              <div className="font-mono text-[0.54rem] tracking-[0.2em] uppercase text-ember mb-2">
                Need to talk now?
              </div>
              <p className="text-off text-[0.82rem] font-light leading-snug mb-3">
                For immediate pastoral support, contact us directly.
              </p>
              <a
                href="#connect"
                className="font-mono text-[0.58rem] tracking-[0.18em] uppercase text-ember flex items-center gap-2 hover:gap-4 transition-all duration-200"
                             >
                Contact A Pastor →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
