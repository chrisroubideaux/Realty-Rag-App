// app/listings/luxury/page.tsx

import HomeSidebar from "@/components/nav/HomeSidebar";
import LuxuryListingsHero from "@/components/properties/listings/LuxuryListingsHero";
import ListingCategoryTabs from "@/components/properties/listings/ListingCategoryTabs";
import ListingsGrid from "@/components/properties/listings/ListingsGrid";
import ListingsToolbar from "@/components/properties/listings/ListingsToolbar";
import type { ListingCardData } from "@/components/properties/listings/ListingCard";

const luxuryListings: ListingCardData[] = [
  {
    id: "luxury-001",
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
    tag: "Riverfront",
    gradient:
      "linear-gradient(135deg, rgba(127,37,61,0.9), rgba(250,103,129,0.72)), radial-gradient(circle at 30% 20%, rgba(255,255,255,.85), transparent 15rem)",
  },
  {
    id: "luxury-002",
    title: "Executive Prairie Manor",
    propertyType: "luxury",
    status: "For Sale",
    priceLabel: "$975,000",
    location: "Fargo, ND",
    description:
      "Executive home with grand entry, designer kitchen, private office, spa-inspired primary suite, and oversized garage.",
    beds: 5,
    baths: 4,
    sqft: 4960,
    tag: "Executive",
    gradient:
      "linear-gradient(135deg, rgba(184,49,82,0.9), rgba(255,154,172,0.72)), radial-gradient(circle at 80% 30%, rgba(255,255,255,.82), transparent 15rem)",
  },
  {
    id: "luxury-003",
    title: "Modern Hilltop Residence",
    propertyType: "luxury",
    status: "For Sale",
    priceLabel: "$1,475,000",
    location: "Bismarck, ND",
    description:
      "Architectural residence with panoramic views, floor-to-ceiling glass, custom finishes, and a resort-style outdoor patio.",
    beds: 4,
    baths: 5,
    sqft: 5380,
    tag: "Modern Design",
    gradient:
      "linear-gradient(135deg, rgba(31,31,36,0.88), rgba(250,103,129,0.72)), radial-gradient(circle at 30% 25%, rgba(255,255,255,.78), transparent 14rem)",
  },
  {
    id: "luxury-004",
    title: "Penthouse Condo Suite",
    propertyType: "condo",
    status: "For Sale",
    priceLabel: "$820,000",
    location: "Downtown Fargo, ND",
    description:
      "Top-floor condo with city views, premium appliances, private terrace, secure parking, and concierge-style amenities.",
    beds: 3,
    baths: 3,
    sqft: 2840,
    tag: "Penthouse",
    gradient:
      "linear-gradient(135deg, rgba(255,250,247,0.94), rgba(250,103,129,0.68)), radial-gradient(circle at 25% 25%, rgba(255,255,255,.95), transparent 16rem)",
  },
  {
    id: "luxury-005",
    title: "Private Country Estate",
    propertyType: "luxury",
    status: "For Sale",
    priceLabel: "$1,850,000",
    location: "Rural Burleigh County, ND",
    description:
      "Private acreage estate with custom home, guest quarters, shop space, luxury finishes, and wide-open prairie views.",
    beds: 6,
    baths: 6,
    sqft: 7200,
    tag: "Private Estate",
    gradient:
      "linear-gradient(135deg, rgba(250,103,129,0.86), rgba(255,154,172,0.74)), radial-gradient(circle at 65% 20%, rgba(255,255,255,.86), transparent 15rem)",
  },
  {
    id: "luxury-006",
    title: "Lakeview Custom Home",
    propertyType: "luxury",
    status: "For Sale",
    priceLabel: "$1,095,000",
    location: "Mandan, ND",
    description:
      "Custom lakeview home with open living spaces, high-end finishes, lower-level entertainment area, and premium outdoor space.",
    beds: 4,
    baths: 4,
    sqft: 4620,
    tag: "Lakeview",
    gradient:
      "linear-gradient(135deg, rgba(184,80,116,0.88), rgba(250,103,129,0.74)), radial-gradient(circle at 75% 25%, rgba(255,255,255,.86), transparent 15rem)",
  },
];

export default function LuxuryListingsPage() {
  return (
    <main className="main-shell">
      <HomeSidebar />

      <div className="with-home-sidebar">
        <LuxuryListingsHero />
        <ListingCategoryTabs />
        <ListingsToolbar />

        <ListingsGrid
          listings={luxuryListings}
          eyebrow="Luxury listings"
          heading="Available luxury homes, estates, and premium residences."
          description="Browse luxury-focused mock listings for now. Later this page can fetch from /api/listings/luxury or /api/listings?type=luxury."
        />
      </div>
    </main>
  );
}