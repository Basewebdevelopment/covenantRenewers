import type { Metadata } from "next";
import { Anybody, DM_Serif_Display, Azeret_Mono } from "next/font/google";
import "./globals.css";

// Anybody: condensed variable — muscular, editorial, NOT Bebas
const anybody = Anybody({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
});

// DM Serif Display: sharp, high-contrast old-style serif — elegant but edgy
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

// Azeret Mono: wide, modern mono — replaces boring Space Mono
const azeretMono = Azeret_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://covenantrewers.co.uk"
  ),
  title: "Covenant Renewers — CR Church",
  description:
    "Covenant Renewers — the youth department of REPLIB Birmingham. Alive for Christ through worship, spoken word, and creative arts.",
  openGraph: {
    title: "Covenant Renewers — Birmingham, UK",
    description: "Renewed by faith. Alive for CHRIST. A bold church community in Birmingham.",
    siteName: "Covenant Renewers",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/images/church/R6II7735.jpg",
        width: 1200,
        height: 630,
        alt: "Covenant Renewers Birmingham",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Covenant Renewers — Birmingham, UK",
    description: "Renewed by faith. Alive for CHRIST.",
    images: ["/images/church/R6II7735.jpg"],
  },
  keywords: ["church", "Birmingham", "Covenant Renewers", "Christian", "worship", "youth", "community"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${anybody.variable} ${dmSerif.variable} ${azeretMono.variable} bg-black text-cream antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
