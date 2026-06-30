"use client";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

interface HeroPhoto {
  src: string;
  alt: string;
  className: string;
  objectPosition?: string;
  /* card-shuffle motion: where the card drifts on scroll + resting tilt */
  restRotate: number;
  driftX: number;
  driftY: number;
  driftRotate: number;
}

const heroPhotos: HeroPhoto[] = [
  {
    src: "/images/church/R6II7735.jpg",
    alt: "Covenant Renewers community worship moment",
    className: "left-0 top-8 h-[52%] w-[72%]",
    objectPosition: "36% center",
    restRotate: -2.2,
    driftX: -56,
    driftY: 26,
    driftRotate: -7,
  },
  {
    src: "/images/church/R6II7774.jpg",
    alt: "Covenant Renewers congregation in worship",
    className: "right-0 top-[31%] h-[42%] w-[56%]",
    restRotate: 2.4,
    driftX: 62,
    driftY: -20,
    driftRotate: 8,
  },
  {
    src: "/images/church/R6II7728.jpg",
    alt: "Covenant Renewers preaching moment",
    className: "bottom-0 left-[16%] h-[32%] w-[52%]",
    restRotate: -1.6,
    driftX: -34,
    driftY: 48,
    driftRotate: 5,
  },
];

/* A photo that deals in like a card and shuffles apart on scroll */
function ShuffleCard({
  photo,
  index,
  scrollYProgress,
}: {
  photo: HeroPhoto;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  /* outer layer: scroll-driven drift (the "shuffle") */
  const x = useTransform(scrollYProgress, [0, 1], [0, photo.driftX]);
  const y = useTransform(scrollYProgress, [0, 1], [0, photo.driftY]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, photo.driftRotate]);

  return (
    <motion.div
      className={`absolute ${photo.className}`}
      style={{ x, y, rotate, transformOrigin: "center 80%" }}
    >
      {/* inner layer: deal-in entrance — starts stacked low with extra tilt, settles into the fan */}
      <motion.figure
        className="absolute inset-0 overflow-hidden border border-white/65 bg-white shadow-[0_24px_60px_rgba(17,17,17,0.16)]"
        initial={{ opacity: 0, y: 70, rotate: photo.restRotate * 3.5, scale: 0.88 }}
        animate={{ opacity: 1, y: 0, rotate: photo.restRotate, scale: 1 }}
        transition={{
          duration: 0.85,
          delay: 0.48 + index * 0.16,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        whileHover={{ scale: 1.03, transition: { duration: 0.25 } }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover"
          style={{ objectPosition: photo.objectPosition ?? "50% 50%" }}
          sizes="(max-width: 1024px) 0px, 40vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/10" />
      </motion.figure>
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);
  const haloY = useTransform(scrollYProgress, [0, 1], [0, -210]);
  const haloScale = useTransform(scrollYProgress, [0, 1], [1, 1.24]);
  const gridOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.18]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden px-6 md:px-16"
    >
      {/* Grid floor */}
      <motion.div className="grid-floor absolute inset-0 z-0" style={{ opacity: gridOpacity }} />

      {/* Brand accents */}
      <div
        className="absolute right-0 top-0 h-full w-[28vw] min-w-[220px] pointer-events-none z-0"
        style={{
          background: "linear-gradient(180deg, rgba(199,34,42,0.16), rgba(199,34,42,0.04))",
        }}
      />
      <div
        className="absolute bottom-10 left-6 h-px w-[calc(100%-3rem)] bg-black/10 pointer-events-none z-0 md:left-16 md:w-[calc(100%-8rem)]"
      />

      {/* Right side visual — live church moments with futuristic framing */}
      <motion.div
        initial={{ opacity: 0, x: 36, scale: 0.96 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.85, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute right-[4%] top-1/2 hidden aspect-[0.9] -translate-y-1/2 lg:block"
        style={{ y: haloY, scale: haloScale, width: "clamp(380px, 35vw, 560px)" }}
      >
        <div
          className="absolute inset-4 border border-black/10 pointer-events-none"
          style={{ transform: "translate(12px, 12px)" }}
        />
        <div className="absolute inset-4 border border-ember/20 pointer-events-none" />

        {[
          "top-4 left-4 border-t-2 border-l-2",
          "top-4 right-4 border-t-2 border-r-2",
          "bottom-4 left-4 border-b-2 border-l-2",
          "bottom-4 right-4 border-b-2 border-r-2",
        ].map((cls, i) => (
          <div
            key={i}
            className={`absolute w-5 h-5 border-ember/60 ${cls} pointer-events-none`}
          />
        ))}

        {heroPhotos.map((photo, index) => (
          <ShuffleCard
            key={photo.src}
            photo={photo}
            index={index}
            scrollYProgress={scrollYProgress}
          />
        ))}

        <div className="absolute right-10 top-10 flex h-20 w-20 items-center justify-center bg-cream/92 p-3 shadow-[0_12px_34px_rgba(17,17,17,0.14)]">
          <Image src="/brand/covenant-renewers-logo.png" alt="Covenant Renewers" fill className="object-contain" sizes="80px" />
        </div>

        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap border-x border-b border-ember/20 bg-cream px-4 py-1 font-mono text-[0.48rem] uppercase tracking-[0.3em] text-ember/70"
        >
          Birmingham, UK · Alive for Christ
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-[2] max-w-3xl pt-28 pb-20"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          {...fade(0.2)}
          className="sec-label mb-8"
        >
          REPLIB Birmingham · Covenant Renewers Youth
        </motion.div>

        <motion.div
          {...fade(0.28)}
          className="relative mb-9 h-[260px] overflow-hidden border border-black/10 bg-white shadow-[0_18px_48px_rgba(17,17,17,0.12)] lg:hidden"
        >
          <Image
            src="/images/church/R6II7735.jpg"
            alt="Covenant Renewers community worship moment"
            fill
            className="object-cover"
            style={{ objectPosition: "36% center" }}
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-white/10" />
          <div className="absolute bottom-4 left-4 bg-cream/92 px-3 py-2 font-mono text-[0.5rem] uppercase tracking-[0.2em] text-ember">
            Alive for Christ
          </div>
        </motion.div>

        <h1 className="leading-[0.88] mb-8">
          <motion.span
            {...fade(0.38)}
            className="font-display block text-[#111]"
            style={{
              fontSize: "clamp(3.25rem, 11vw, 10rem)",
              fontVariationSettings: '"wdth" 130',
              letterSpacing: "0",
            }}
          >
            RENEWED
          </motion.span>
          <motion.span
            {...fade(0.5)}
            className="font-display block"
            style={{
              fontSize: "clamp(3.25rem, 11vw, 10rem)",
              fontVariationSettings: '"wdth" 130',
              letterSpacing: "0",
              color: "var(--ember)",
            }}
          >
            BY FAITH.
          </motion.span>
          <motion.span
            {...fade(0.62)}
            className="font-serif block italic"
            style={{
              fontSize: "clamp(2.05rem, 5.5vw, 5.5rem)",
              color: "#111",
              lineHeight: 1.1,
            }}
          >
            Alive for CHRIST.
          </motion.span>
        </h1>

        <motion.p
          {...fade(0.76)}
          className="font-body text-off font-light leading-relaxed mb-10 max-w-lg"
          style={{ fontSize: "1.05rem" }}
        >
          The youth department of Resurrection Power and Living Bread Ministries
          Birmingham. Alive for Christ — proclaiming the gospel through worship,
          spoken word, and creative arts.
        </motion.p>

        <motion.div {...fade(0.88)} className="flex flex-wrap gap-4">
          <a href="#connect" className="btn-gold sheen relative overflow-hidden">
            Join The Family
          </a>
          <a href="#events" className="btn-ghost">
            Upcoming Events →
          </a>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          {...fade(1.05)}
          className="flex items-center gap-4 mt-14"
        >
          <div className="relative w-12 h-px bg-black/15 overflow-hidden">
            <span
              className="absolute top-0 h-full w-full bg-ember"
              style={{ animation: "scroll-line 2s ease-in-out infinite", left: "-100%" }}
            />
          </div>
          <span className="font-mono text-[0.52rem] tracking-[0.3em] text-off/60 uppercase">
            Scroll to explore
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
