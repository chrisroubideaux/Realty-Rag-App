// app/page.tsx
import FeaturedListings from "@/components/listings/FeaturedListings";
import HeroSection from "@/components/hero/HeroSection";
import HomeSidebar from "@/components/nav/HomeSidebar";
import Testimonials from "@/components/misc/Testimonials";
import Footer from "@/components/nav/Footer";

export default function Home() {
  return (
    <main className="main-shell">
      <HomeSidebar />

      <div className="with-home-sidebar">
        <HeroSection />
        <FeaturedListings />
        <Testimonials />
        <Footer />
      </div>
    </main>
  );
}