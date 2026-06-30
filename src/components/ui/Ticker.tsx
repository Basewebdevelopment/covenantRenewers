const items = [
  "REPLIB Birmingham",
  "Sunday Service · 10AM",
  "Youth · Every Friday 7PM",
  "Alive for CHRIST",
  "In Him We Preach",
  "Covenant Renewers",
  "Everyone Welcome",
  "There's A Place For You",
];

export default function Ticker() {
  const doubled = [...items, ...items];
  return (
    <div className="relative max-w-full overflow-hidden bg-[#111] py-3 whitespace-nowrap border-y border-black/10">
      <div className="ticker-track inline-flex">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-5 px-8 font-display font-display-wide text-[#fffaf2] text-sm tracking-[0.22em] uppercase"
            style={{ fontVariationSettings: '"wdth" 140' }}
          >
            {item}
            <span className="text-ember text-[0.5rem]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
