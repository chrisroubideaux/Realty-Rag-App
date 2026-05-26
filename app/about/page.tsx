// app/about/page.tsx

import AboutAiSection from "@/components/about/AboutAiSection";
import AboutHero from "@/components/about/AboutHero";
import AboutMission from "@/components/about/AboutMission";
import AboutProcess from "@/components/about/AboutProcess";
import AboutValues from "@/components/about/AboutValues";
import HomeSidebar from "@/components/nav/HomeSidebar";
import Footer from '@/components/nav/Footer';

export default function AboutPage() {
  return (
    <main className="main-shell">
      <HomeSidebar />

      <div className="with-home-sidebar">
        <AboutHero />
        <AboutMission />
        <AboutAiSection />
        <AboutProcess />
        <AboutValues />
          <Footer />
      </div>
    
    </main>
  );
}