// app/listings/page.tsx
import ListingCategoryTabs from "@/components/properties/listings/ListingCategoryTabs";
import ListingsGrid from "@/components/properties/listings/ListingsGrid";
import ListingsHero from "@/components/properties/listings/ListingsHero";
import ListingsToolbar from "@/components/properties/listings/ListingsToolbar";
import HomeSidebar from "@/components/nav/HomeSidebar";

export default function ListingsPage() {
  return (
    <main className="main-shell">
      <HomeSidebar />

      <div className="with-home-sidebar">
        <ListingsHero />
        <ListingCategoryTabs />
        <ListingsToolbar />
        <ListingsGrid />
      </div>
    </main>
  );
}