// app/page.tsx
import FeaturedListings from "@/components/properties/listings/FeaturedListings";
import HeroSection from "@/components/hero/HeroSection";
import HomeSidebar from "@/components/nav/HomeSidebar";
import Testimonials from "@/components/misc/Testimonials";
import AiSearchPreview from "@/components/misc/AiSearchPreview";
import PropertyCategories from "@/components/properties/PropertyCategories";
import MarketInsights from "@/components/properties/MarketInsights";
import AgentSpotlight from "@/components/agents/AgentSpotlight";
import Footer from "@/components/nav/Footer";


export default function Home() {
  return (
    <main className="main-shell">
      <HomeSidebar />

      <div className="with-home-sidebar">
        <HeroSection />
        <FeaturedListings />
        <Testimonials />
         <AiSearchPreview />
        <PropertyCategories />
        <MarketInsights />
        <AgentSpotlight />
        <Footer />
      </div>
    </main>
  );
}