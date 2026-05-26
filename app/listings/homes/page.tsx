// app/listings/homes/page.tsx
// app/listings/homes/page.tsx

import HomeSidebar from "@/components/nav/HomeSidebar";
import HomeListingsHero from "@/components/properties/listings/HomeListingsHero";
import ListingCategoryTabs from "@/components/properties/listings/ListingCategoryTabs";
import ListingsGrid from "@/components/properties/listings/ListingsGrid";
import ListingsToolbar from "@/components/properties/listings/ListingsToolbar";
import type { ListingCardData } from "@/components/properties/listings/ListingCard";

const homeListings: ListingCardData[] = [
  {
    id: "home-001",
    title: "Modern Prairie Home",
    propertyType: "home",
    status: "For Sale",
    priceLabel: "$485,000",
    location: "Bismarck, ND",
    description:
      "Open-concept living, oversized windows, finished basement, and a fenced backyard near schools and parks.",
    beds: 4,
    baths: 3,
    sqft: 2640,
    tag: "Family Favorite",
    gradient:
      "linear-gradient(135deg, rgba(250,103,129,0.92), rgba(255,154,172,0.84)), radial-gradient(circle at 20% 20%, rgba(255,255,255,.95), transparent 16rem)",
  },
  {
    id: "home-002",
    title: "Southridge Ranch House",
    propertyType: "home",
    status: "For Sale",
    priceLabel: "$398,000",
    location: "Mandan, ND",
    description:
      "Well-kept ranch-style home with main-floor laundry, updated flooring, attached garage, and a quiet neighborhood setting.",
    beds: 3,
    baths: 2,
    sqft: 2180,
    tag: "Move-In Ready",
    gradient:
      "linear-gradient(135deg, rgba(255,250,247,0.94), rgba(250,103,129,0.68)), radial-gradient(circle at 25% 25%, rgba(255,255,255,.95), transparent 16rem)",
  },
  {
    id: "home-003",
    title: "Luxury Riverfront Estate",
    propertyType: "luxury",
    status: "For Sale",
    priceLabel: "$1,250,000",
    location: "Bismarck, ND",
    description:
      "Private riverfront estate with premium finishes, chef kitchen, theater room, and expansive outdoor entertaining space.",
    beds: 5,
    baths: 5,
    sqft: 5820,
    tag: "Luxury",
    gradient:
      "linear-gradient(135deg, rgba(127,37,61,0.9), rgba(250,103,129,0.72)), radial-gradient(circle at 30% 20%, rgba(255,255,255,.85), transparent 15rem)",
  },
  {
    id: "home-004",
    title: "North Fargo Family Home",
    propertyType: "home",
    status: "For Sale",
    priceLabel: "$545,000",
    location: "Fargo, ND",
    description:
      "Spacious two-story home with large bedrooms, finished lower level, oversized garage, and a fenced backyard.",
    beds: 4,
    baths: 4,
    sqft: 3420,
    tag: "Spacious",
    gradient:
      "linear-gradient(135deg, rgba(184,80,116,0.88), rgba(250,103,129,0.74)), radial-gradient(circle at 75% 25%, rgba(255,255,255,.86), transparent 15rem)",
  },
  {
    id: "home-005",
    title: "Lincoln New Build",
    propertyType: "home",
    status: "For Sale",
    priceLabel: "$425,000",
    location: "Lincoln, ND",
    description:
      "New construction home with open kitchen, energy-efficient systems, three-car garage, and modern exterior styling.",
    beds: 3,
    baths: 3,
    sqft: 2360,
    tag: "New Build",
    gradient:
      "linear-gradient(135deg, rgba(31,31,36,0.84), rgba(250,103,129,0.72)), radial-gradient(circle at 30% 25%, rgba(255,255,255,.78), transparent 14rem)",
  },
  {
    id: "home-006",
    title: "Minot Investment Duplex",
    propertyType: "investment",
    status: "For Sale",
    priceLabel: "$389,000",
    location: "Minot, ND",
    description:
      "Two-unit residential income property with updated interiors, strong rental history, and low-maintenance exterior.",
    beds: 6,
    baths: 4,
    sqft: 3100,
    tag: "Income Property",
    gradient:
      "linear-gradient(135deg, rgba(255,154,172,0.82), rgba(184,49,82,0.78)), radial-gradient(circle at 20% 20%, rgba(255,255,255,.8), transparent 15rem)",
  },
];

export default function HomesListingsPage() {
  return (
    <main className="main-shell">
      <HomeSidebar />

      <div className="with-home-sidebar">
        <HomeListingsHero />
        <ListingCategoryTabs />
        <ListingsToolbar />

        <ListingsGrid
          listings={homeListings}
          eyebrow="Home listings"
          heading="Available homes, luxury houses, and residential investments."
          description="Browse home-focused mock listings for now. Later this page can fetch from /api/listings/homes or /api/listings?type=home."
        />
      </div>
    </main>
  );
}