"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { churchDepartments, replib, type ChurchDepartment } from "@/lib/church-content";

const ministryPhotos = [
  { src: "/images/church/R6II7647.jpg", alt: "Prayer ministry at Covenant Renewers" },
  { src: "/images/church/R6II7655.jpg", alt: "Worship at Covenant Renewers" },
  { src: "/images/church/R6II7681.jpg", alt: "Covenant Renewers prayer moment" },
];

function DeptCard({ dept, index }: { dept: ChurchDepartment; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 4) * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`group relative border-t border-black/15 py-7 transition-colors duration-300 hover:border-ember/55 ${dept.featured ? "md:col-span-2 md:pr-12" : ""}`}
    >
      <div className="mb-5 flex items-center justify-between gap-5">
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ember">
          {dept.eyebrow}
        </span>
        <span className="font-display text-3xl leading-none text-black/10 transition-colors duration-300 group-hover:text-ember/25">
          {dept.n}
        </span>
      </div>

      <h3
        className="mb-4 max-w-xl font-display leading-[0.98] text-black"
        style={{
          fontSize: dept.featured ? "clamp(2.5rem,4.4vw,4.4rem)" : "clamp(1.75rem,2.4vw,2.55rem)",
          fontVariationSettings: '"wdth" 124',
          letterSpacing: "0",
        }}
      >
        {dept.name}
      </h3>
      <p className="mb-6 max-w-md text-[0.98rem] font-light leading-relaxed text-off">
        {dept.desc}
      </p>
      <a
        href={dept.name === "Covenant Renewers" ? "#youth" : "#connect"}
        className="inline-flex items-center gap-3 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-black transition-colors duration-200 hover:text-ember"
      >
        {dept.link}
        <span className="h-px w-8 bg-ember transition-all duration-200 group-hover:w-12" />
      </a>
    </motion.article>
  );
}

export default function Departments() {
  return (
    <section id="departments" className="bg-deep px-6 py-24 md:px-16 md:py-32">
      <div className="mb-16 grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-end">
        <div>
          <div className="sec-label mb-5">{replib.shortName} Ministries</div>
          <h2
            className="font-display leading-[0.9] text-black"
            style={{ fontSize: "clamp(3.4rem,7vw,7.5rem)", fontVariationSettings: '"wdth" 130' }}
          >
            WHERE DO YOU <span className="text-ember">FIT IN?</span>
          </h2>
        </div>

        <div className="relative border-l border-black/15 pl-6">
          <p className="max-w-md text-base font-light leading-relaxed text-off">
            Whether you&apos;re visiting or already part of the church family, there is a
            place for you here. Explore the ministries of {replib.shortName} Birmingham.
          </p>
          <div className="mt-8 grid max-w-md grid-cols-3 gap-2">
            {ministryPhotos.map((photo, index) => (
              <div
                key={photo.src}
                className="relative h-24 overflow-hidden border border-black/10 bg-card"
                style={{ transform: index === 1 ? "translateY(12px)" : undefined }}
              >
                <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="(max-width: 768px) 33vw, 160px" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-x-12 gap-y-2 md:grid-cols-2">
        {churchDepartments.map((dept, index) => (
          <DeptCard key={dept.n} dept={dept} index={index} />
        ))}
      </div>
    </section>
  );
}
