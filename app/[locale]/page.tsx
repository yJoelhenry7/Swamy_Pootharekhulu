import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Products from "../components/Products";
import About from "../components/About";
import Features from "../components/Features";
import SpecialOffers from "../components/SpecialOffers";
import Contact from "../components/Contact";
import Founders from "../components/Founders";
import LocationMap from "../components/LocationMap";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Products />
        <About />
        <Features />
        <SpecialOffers />
        <Contact />
        <Founders />
        <LocationMap />
      </main>
      <Footer />
    </div>
  );
}
