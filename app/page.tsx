// app/page.tsx
// app/page.tsx

import HeroSection from "@/components/hero/HeroSection";
import HomeSidebar from "@/components/nav/HomeSidebar";

export default function Home() {
  return (
    <main className="main-shell">
      <HomeSidebar />

      <div className="with-home-sidebar">
        <HeroSection />
      </div>
    </main>
  );
}