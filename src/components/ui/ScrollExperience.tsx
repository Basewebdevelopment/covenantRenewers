"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";

export default function ScrollExperience() {
  const reduceMotion = useReducedMotion();
  const [percent, setPercent] = useState("00%");
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  useMotionValueEvent(smoothProgress, "change", (value) => {
    setPercent(`${Math.round(value * 100).toString().padStart(2, "0")}%`);
  });

  if (reduceMotion) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[900] overflow-hidden" aria-hidden="true">
      <motion.div
        className="fixed left-0 top-0 h-[3px] origin-left bg-ember"
        style={{ scaleX: smoothProgress }}
      />
      <div className="hidden md:flex fixed bottom-8 right-8 items-center gap-3 font-mono text-[0.55rem] tracking-[0.24em] uppercase text-ember/70">
        <span className="h-px w-10 bg-ember/30" />
        <span>{percent}</span>
      </div>
    </div>
  );
}
