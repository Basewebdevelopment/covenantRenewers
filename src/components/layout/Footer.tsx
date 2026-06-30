const cols = [
  {
    heading: "Church",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Departments", href: "#departments" },
      { label: "Leadership", href: "#leadership" },
      { label: "CR Youth", href: "#youth" },
      { label: "Events", href: "#events" },
      { label: "Join Us", href: "#connect" },
    ],
  },
  {
    heading: "Store",
    links: [
      { label: "New Arrivals", href: "#store" },
      { label: "Apparel", href: "#store" },
      { label: "Youth Merch", href: "#store" },
      { label: "Accessories", href: "#store" },
      { label: "Books", href: "#store" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Prayer Request", href: "#prayer" },
      { label: "Give / Donate", href: "#give" },
      { label: "Sunday: 10AM", href: "#" },
      { label: "Youth: Fri 7PM", href: "#" },
      { label: "Contact Us", href: "#connect" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{ backgroundColor: "#1a1610", borderColor: "rgba(184,147,58,0.12)" }}
    >
      <div className="px-6 md:px-10 lg:px-16 pt-12 md:pt-16 pb-10">
        <div className="grid md:grid-cols-[2.2fr_1fr_1fr_1fr] gap-8 md:gap-12 mb-10 md:mb-14">
          {/* Brand */}
          <div>
            <div
              className="font-display mb-1"
              style={{
                fontSize: "2.2rem",
                fontVariationSettings: '"wdth" 130',
                letterSpacing: "0.12em",
                color: "#f6f1e8",
              }}
            >
              COVENANT{" "}
              <span style={{ color: "var(--gold)" }}>RENEWERS</span>
            </div>
            <blockquote
              className="font-serif italic border-l-2 pl-4 mt-4 mb-5 leading-relaxed text-[0.88rem]"
              style={{ borderColor: "var(--gold)", color: "var(--gold-light)" }}
            >
              &ldquo;I will give you a new heart and put a new spirit in you.&rdquo;
              <br />
              <cite
                className="not-italic font-mono text-[0.55rem] tracking-widest"
                style={{ color: "#8a8070" }}
              >
                — Ezekiel 36:26
              </cite>
            </blockquote>
            <p
              className="text-[0.85rem] font-light leading-relaxed"
              style={{ color: "#8a8070" }}
            >
              Birmingham, UK · Sunday Services 10AM
              <br />
              All are welcome. No exceptions.
            </p>
            {/* Socials */}
            <div className="flex gap-2 mt-5">
              {["📘", "📸", "🎵", "▶️"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center text-base transition-all duration-200"
                  style={{
                  border: "1px solid rgba(184,147,58,0.2)",
                  }}
                  aria-label="Social link"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Columns */}
          {cols.map(({ heading, links }) => (
            <div key={heading}>
              <div
                className="font-mono text-[0.57rem] tracking-[0.3em] uppercase mb-5"
                style={{ color: "var(--gold)" }}
              >
                {heading}
              </div>
              <ul className="flex flex-col gap-2.5 list-none p-0">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="footer-link text-[0.9rem] font-light transition-colors duration-200 tracking-[0.04em]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-3"
          style={{ borderColor: "rgba(184,147,58,0.08)" }}
        >
          <p
            className="font-mono text-[0.52rem] tracking-[0.15em] uppercase"
            style={{ color: "rgba(246,241,232,0.3)" }}
          >
            © 2026 Covenant Renewers Church · All Rights Reserved
          </p>
          <p
            className="font-mono text-[0.52rem] tracking-[0.15em] uppercase"
            style={{ color: "rgba(246,241,232,0.3)" }}
          >
            Renewed By Faith · Alive for CHRIST · Birmingham, UK
          </p>
        </div>
      </div>
    </footer>
  );
}
