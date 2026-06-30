import Nav from "@/components/layout/Nav";
import Hero from "@/components/sections/Hero";
import Ticker from "@/components/ui/Ticker";
import About from "@/components/sections/About";
import Departments from "@/components/sections/Departments";
import Leadership from "@/components/sections/Leadership";
import Youth from "@/components/sections/Youth";
import Events from "@/components/sections/Events";
import Store from "@/components/sections/Store";
import PrayerRequest from "@/components/sections/PrayerRequest";
import Give from "@/components/sections/Give";
import Connect from "@/components/sections/Connect";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/components/ui/CartFab";
import ScrollExperience from "@/components/ui/ScrollExperience";
import { readProducts } from "@/lib/products";
import { readEvents } from "@/lib/events";

export default async function Home() {
  const [products, events] = await Promise.all([readProducts(), readEvents()]);

  return (
    <CartProvider>
      <ScrollExperience />
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Departments />
        <Leadership />
        <Youth />
        <Events initialEvents={events} />
        <Store initialProducts={products} />
        <PrayerRequest />
        <Give />
        <Connect />
      </main>
      <Footer />
    </CartProvider>
  );
}
