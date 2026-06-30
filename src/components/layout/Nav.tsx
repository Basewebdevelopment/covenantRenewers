"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#departments", label: "Departments" },
  { href: "/#youth", label: "Youth" },
  { href: "/#events", label: "Events" },
  { href: "/shop", label: "Store" },
  { href: "/#give", label: "Give" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[800] h-[76px] flex items-center justify-between px-5 md:px-10 transition-all duration-300 ${
          scrolled
            ? "bg-[#f6f1e8]/92 backdrop-blur-xl border-b border-black/10"
            : "bg-[#f6f1e8]/78 backdrop-blur-md"
        }`}
      >
        {/* Logo */}
        <Link href="#" className="flex items-center gap-3 group">
          <span className="relative block h-11 w-11 overflow-hidden">
            <Image
              src="/brand/covenant-renewers-logo.png"
              alt="Covenant Renewers"
              fill
              className="object-contain"
              sizes="44px"
            />
          </span>
          <div>
            <div
              className="font-display text-[#111] text-sm tracking-[0.2em] uppercase leading-none"
              style={{ fontVariationSettings: '"wdth" 125' }}
            >
              Covenant
            </div>
            <div
              className="font-display text-ember text-[0.58rem] tracking-[0.24em] uppercase leading-none"
              style={{ fontVariationSettings: '"wdth" 110' }}
            >
              Renewers
            </div>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-0 list-none">
          {links.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="font-mono text-[0.58rem] tracking-[0.18em] uppercase text-[#3a332e]/70 hover:text-ember px-4 py-2 transition-colors duration-200 relative group block"
                             >
                {label}
                <span className="absolute bottom-0 left-4 right-4 h-px bg-ember scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="/shop" className="btn-ghost text-[0.58rem] py-2 px-4">
            Shop
          </a>
          <a href="/#connect" className="btn-gold text-[0.72rem] py-2.5 px-5">
            Join Us
          </a>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden flex flex-col gap-[5px] p-2"
                   aria-label="Open menu"
        >
          <span className="w-6 h-[1.5px] bg-black block" />
          <span className="w-4 h-[1.5px] bg-ember block" />
          <span className="w-5 h-[1.5px] bg-black block" />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`mobile-menu fixed inset-0 z-[900] backdrop-blur-xl flex flex-col items-center justify-center gap-8 ${open ? "open" : ""}`}
        style={{ backgroundColor: "rgba(17,13,10,0.98)" }}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-6 right-8 font-mono text-sm tracking-widest uppercase"
          style={{ color: "var(--gold)" }}
        >
          ✕ Close
        </button>
        {[...links, { href: "/#connect", label: "Join Us" }].map(({ href, label }) => (
          <a
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className="mobile-nav-link font-display text-5xl tracking-wider uppercase transition-colors duration-200"
            style={{ fontVariationSettings: '"wdth" 125' }}
          >
            {label}
          </a>
        ))}
      </div>
    </>
  );
}
