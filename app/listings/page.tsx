// app/listings/page.tsx
// app/listings/page.tsx

import ListingCategoryTabs from "@/components/properties/listings/ListingCategoryTabs";
import ListingsGrid from "@/components/properties/listings/ListingsGrid";
import ListingsHero from "@/components/properties/listings/ListingsHero";
import HomeSidebar from "@/components/nav/HomeSidebar";

export default function ListingsPage() {
  return (
    <main className="main-shell">
      <HomeSidebar />

      <div className="with-home-sidebar">
        <ListingsHero />
        <ListingCategoryTabs />
        <ListingsGrid />
      </div>
    </main>
  );
}
