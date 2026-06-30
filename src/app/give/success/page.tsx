import Link from "next/link";
import Nav from "@/components/layout/Nav";

export const metadata = { title: "Gift Received — Covenant Renewers" };

export default function GiveSuccess() {
  return (
    <>
      <Nav />
      <main className="min-h-screen flex items-center justify-center px-6 pt-28 pb-20 bg-white">
        <div className="text-center max-w-lg">
          <div
            className="w-20 h-20 rounded-full border-2 border-gold/40 flex items-center justify-center text-4xl mx-auto mb-8"
            style={{ background: "rgba(184,147,58,0.1)" }}
          >
            🙌
          </div>
          <div className="sec-label justify-center mb-4">Gift Received</div>
          <h1
            className="font-display text-black leading-[0.88] mb-5"
            style={{ fontSize: "clamp(2.5rem,6vw,5rem)", fontVariationSettings: '"wdth" 125' }}
          >
            THANK YOU FOR <span className="text-ember">YOUR GENEROSITY.</span>
          </h1>
          <p className="text-off font-light leading-relaxed mb-8 text-base">
            Your gift has been received. It will make a real difference in our community.
            A receipt has been sent to your email.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/#give" className="btn-gold">
              Give Again
            </Link>
            <Link href="/" className="btn-ghost">
              Back to Home →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
