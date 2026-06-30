"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const funds = [
  {
    id: "general",
    icon: "✝",
    name: "General Fund",
    desc: "Supports Sunday services, operations, staff, and everything that keeps CR running.",
    accent: "var(--gold)",
  },
  {
    id: "youth",
    icon: "⚡",
    name: "CR Youth Fund",
    desc: "Directly funds Friday nights, youth events, trips, and the next generation ministry.",
    accent: "var(--ember)",
  },
  {
    id: "outreach",
    icon: "🌍",
    name: "Outreach & Missions",
    desc: "Sends teams, feeds communities, and funds international mission partnerships.",
    accent: "var(--neon)",
  },
  {
    id: "building",
    icon: "🏛",
    name: "Building Fund",
    desc: "Working toward owning our own space. Every pound brings us closer to a permanent home.",
    accent: "var(--cobalt)",
  },
];

const presets = [5, 10, 20, 50, 100, 250];

const impactItems = [
  { amount: "£5", desc: "covers a youth session snack run" },
  { amount: "£20", desc: "helps print outreach materials for a week" },
  { amount: "£50", desc: "sponsors a young person's conference ticket" },
  { amount: "£100", desc: "funds a full Friday night youth session" },
  { amount: "£250", desc: "sends a team member on a mission trip" },
  { amount: "£500", desc: "contributes a month toward our building fund" },
];

export default function Give() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [activeFreq, setActiveFreq] = useState<"one-off" | "monthly">("one-off");
  const [activeFund, setActiveFund] = useState("general");
  const [amount, setAmount] = useState<number | null>(20);
  const [custom, setCustom] = useState("");
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const finalAmount = custom ? parseFloat(custom) : amount;

  const [giveError, setGiveError] = useState("");

  const handleGive = async () => {
    if (!finalAmount || finalAmount <= 0) return;
    setProcessing(true);
    setGiveError("");
    try {
      const res = await fetch("/api/give", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ amount: finalAmount, fund: activeFund, frequency: activeFreq }),
      });
      const data = await res.json();
      if (!res.ok) {
        setGiveError(data.error ?? "Something went wrong. Please try again.");
        setProcessing(false);
        return;
      }
      if (data.url) {
        window.location.href = data.url;
      } else {
        setDone(true);
        setProcessing(false);
      }
    } catch {
      setGiveError("Network error. Please try again.");
      setProcessing(false);
    }
  };

  const inputCls =
    "w-full px-5 py-3.5 bg-white/[0.04] border border-gold/12 text-cream font-body text-[0.95rem] placeholder:text-off/40 focus:outline-none focus:border-gold/50 transition-colors";

  return (
    <section id="give" className="relative bg-mid px-10 md:px-16 py-28 overflow-hidden">
      {/* Decorative glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(184,147,58,0.06) 0%, transparent 65%)",
        }}
      />

      <div ref={ref} className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="sec-label justify-center mb-5"
          >
            Give &amp; Support
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display leading-[0.88] mb-5"
            style={{
              fontSize: "clamp(3rem,7.5vw,8.5rem)",
              fontVariationSettings: '"wdth" 130',
            }}
          >
            GIVE TO THE
            <br />
            <span className="text-stroke-gold">COVENANT.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="text-off font-light leading-relaxed max-w-xl mx-auto"
            style={{ fontSize: "1rem" }}
          >
            Every pound you give plants something. It builds community,
            sends people, feeds families, and moves us toward our vision.
            Thank you for being part of this.
          </motion.p>
        </div>

        {/* Scripture banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="mb-12 border border-gold/15 p-6 flex items-center gap-6"
          style={{ background: "linear-gradient(135deg, rgba(184,147,58,0.07), transparent)" }}
        >
          <span className="text-4xl flex-shrink-0">📖</span>
          <blockquote className="font-serif italic text-gold-light leading-relaxed" style={{ fontSize: "0.95rem" }}>
            &ldquo;Each of you should give what you have decided in your heart to give,
            not reluctantly or under compulsion, for God loves a cheerful giver.&rdquo;
            <cite className="block not-italic font-mono text-[0.54rem] tracking-widest text-off mt-1.5">
              — 2 Corinthians 9:7
            </cite>
          </blockquote>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_380px] gap-px">

          {/* Left — fund selector + amount picker */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-card border border-gold/10 p-10 flex flex-col gap-8"
          >
            {done ? (
              <div className="flex flex-col items-center justify-center text-center py-10 gap-5 flex-1">
                <div
                  className="w-20 h-20 rounded-full border-2 border-gold/40 flex items-center justify-center text-4xl"
                  style={{ background: "rgba(184,147,58,0.1)" }}
                >
                  🙌
                </div>
                <h3
                  className="font-display text-gold"
                  style={{ fontSize: "2.2rem", fontVariationSettings: '"wdth" 120' }}
                >
                  THANK YOU.
                </h3>
                <p className="text-off font-light text-[0.95rem] leading-relaxed max-w-sm">
                  Your gift of{" "}
                  <span style={{ color: "var(--gold-light)" }}>
                    £{finalAmount?.toFixed(2)}
                  </span>{" "}
                  to the{" "}
                  <span style={{ color: "var(--gold-light)" }}>
                    {funds.find((f) => f.id === activeFund)?.name}
                  </span>{" "}
                  has been received. It will make a real difference.
                </p>
                <button
                  onClick={() => { setDone(false); setAmount(20); setCustom(""); }}
                  className="btn-ghost text-[0.6rem] mt-2"
                                 >
                  Give Again →
                </button>
              </div>
            ) : (
              <>
                {/* Frequency toggle */}
                <div>
                  <div className="font-mono text-[0.56rem] tracking-[0.25em] uppercase text-off mb-3">
                    Giving Frequency
                  </div>
                  <div className="flex gap-px">
                    {(["one-off", "monthly"] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => setActiveFreq(f)}
                        className={`flex-1 py-3 font-display tracking-[0.12em] uppercase transition-all duration-200 ${
                          activeFreq === f
                            ? "bg-gold text-black"
                            : "bg-white/[0.03] border border-gold/15 text-off hover:text-cream hover:border-gold/35"
                        }`}
                        style={{ fontSize: "0.9rem", fontVariationSettings: '"wdth" 120' }}
                      >
                        {f === "one-off" ? "One-Off Gift" : "Monthly Regular"}
                      </button>
                    ))}
                  </div>
                  {activeFreq === "monthly" && (
                    <p className="font-mono text-[0.54rem] tracking-[0.12em] uppercase text-neon mt-2">
                      ✦ Monthly givers get a quarterly impact report
                    </p>
                  )}
                </div>

                {/* Fund selector */}
                <div>
                  <div className="font-mono text-[0.56rem] tracking-[0.25em] uppercase text-off mb-3">
                    Choose a Fund
                  </div>
                  <div className="grid grid-cols-2 gap-px">
                    {funds.map(({ id, icon, name, desc, accent }) => (
                      <button
                        key={id}
                        onClick={() => setActiveFund(id)}
                        className={`text-left p-5 border transition-all duration-200 relative overflow-hidden ${
                          activeFund === id
                            ? "border-gold/40 bg-gold/6"
                            : "border-gold/10 hover:border-gold/25"
                        }`}
                                             >
                        {activeFund === id && (
                          <div
                            className="absolute top-0 left-0 right-0 h-px"
                            style={{ background: accent }}
                          />
                        )}
                        <div className="text-xl mb-2">{icon}</div>
                        <div
                          className="font-display text-cream mb-1"
                          style={{ fontSize: "0.95rem", fontVariationSettings: '"wdth" 115' }}
                        >
                          {name}
                        </div>
                        <div className="font-mono text-[0.5rem] tracking-[0.1em] uppercase text-off leading-snug">
                          {desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <div className="font-mono text-[0.56rem] tracking-[0.25em] uppercase text-off mb-3">
                    Amount
                  </div>
                  <div className="grid grid-cols-3 gap-px mb-3">
                    {presets.map((p) => (
                      <button
                        key={p}
                        onClick={() => { setAmount(p); setCustom(""); }}
                        className={`py-3.5 font-display tracking-wider transition-all duration-200 ${
                          amount === p && !custom
                            ? "bg-gold text-black"
                            : "bg-white/[0.03] border border-gold/12 text-off hover:border-gold/35 hover:text-cream"
                        }`}
                        style={{ fontSize: "1.05rem", fontVariationSettings: '"wdth" 130' }}
                      >
                        £{p}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <span
                      className="absolute left-5 top-1/2 -translate-y-1/2 font-display text-gold"
                      style={{ fontSize: "1.1rem", fontVariationSettings: '"wdth" 130' }}
                    >
                      £
                    </span>
                    <input
                      className={`${inputCls} pl-9`}
                      type="number"
                      min="1"
                      placeholder="Enter custom amount"
                      value={custom}
                      onChange={(e) => { setCustom(e.target.value); setAmount(null); }}
                    />
                  </div>
                </div>

                {/* Name fields */}
                <div className="grid grid-cols-2 gap-3">
                  <input className={inputCls} placeholder="First Name" />
                  <input className={inputCls} placeholder="Last Name" />
                  <input className={`${inputCls} col-span-2`} type="email" placeholder="Email (for receipt)" />
                </div>

                {/* CTA */}
                {giveError && (
                  <p className="font-mono text-[0.56rem] tracking-[0.14em] uppercase text-ember">{giveError}</p>
                )}

                <button
                  onClick={handleGive}
                  disabled={processing || !finalAmount}
                  className="btn-gold sheen relative overflow-hidden justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing
                    ? "Processing..."
                    : `Give ${finalAmount ? `£${Number(finalAmount).toFixed(2)}` : ""} ${activeFreq === "monthly" ? "Monthly" : "Now"}`}
                </button>

                <p className="font-mono text-[0.52rem] tracking-[0.12em] uppercase text-off/40 text-center">
                  🔒 Secure payment · Powered by Stripe · You&apos;ll receive a receipt by email
                </p>
              </>
            )}
          </motion.div>

          {/* Right — impact + other ways to give */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.38 }}
            className="flex flex-col gap-px"
          >
            {/* Impact panel */}
            <div className="bg-card border border-gold/10 p-8">
              <div className="font-mono text-[0.54rem] tracking-[0.25em] uppercase text-gold mb-5">
                // Your Impact
              </div>
              <div className="flex flex-col gap-4">
                {impactItems.map(({ amount: a, desc }) => (
                  <div key={a} className="flex items-start gap-4">
                    <span
                      className="font-display text-gold flex-shrink-0 w-14"
                      style={{ fontSize: "1.1rem", fontVariationSettings: '"wdth" 130' }}
                    >
                      {a}
                    </span>
                    <span className="text-off text-[0.82rem] font-light leading-snug">{desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Other ways */}
            <div className="bg-card border border-gold/10 p-8">
              <div className="font-mono text-[0.54rem] tracking-[0.25em] uppercase text-gold mb-5">
                // Other Ways to Give
              </div>
              <div className="flex flex-col gap-5">
                {[
                  { icon: "🏦", title: "Bank Transfer", detail: "Sort: 00-00-00 · Acc: 00000000 · Ref: GIVE" },
                  { icon: "📱", title: "PayPal", detail: "paypal.me/covenantrewers · No account needed" },
                  { icon: "✉️", title: "By Post", detail: "Cheques payable to Covenant Renewers Church" },
                  { icon: "🙏", title: "In Person", detail: "Sunday service offering — all welcome" },
                ].map(({ icon, title, detail }) => (
                  <div key={title} className="flex items-start gap-4">
                    <span className="text-xl flex-shrink-0 mt-0.5">{icon}</span>
                    <div>
                      <div className="font-mono text-[0.58rem] tracking-[0.15em] uppercase text-cream mb-0.5">
                        {title}
                      </div>
                      <div className="font-mono text-[0.52rem] tracking-[0.1em] text-off">{detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gift Aid (UK specific) */}
            <div
              className="border border-neon/20 p-6"
              style={{ background: "rgba(0,212,138,0.05)" }}
            >
              <div className="font-mono text-[0.54rem] tracking-[0.2em] uppercase text-neon mb-2">
                UK Taxpayers — Gift Aid
              </div>
              <p className="text-off text-[0.8rem] font-light leading-snug">
                If you&apos;re a UK taxpayer, tick Gift Aid and we can claim an
                extra 25p for every £1 you give at no cost to you.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
