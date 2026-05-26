// app/listings/land/page.tsx

import HomeSidebar from "@/components/nav/HomeSidebar";
import LandListingsHero from "@/components/properties/listings/LandListingsHero";
import ListingCategoryTabs from "@/components/properties/listings/ListingCategoryTabs";
import ListingsGrid from "@/components/properties/listings/ListingsGrid";
import ListingsToolbar from "@/components/properties/listings/ListingsToolbar";
import type { ListingCardData } from "@/components/properties/listings/ListingCard";

const landListings: ListingCardData[] = [
  {
    id: "land-001",
    title: "River Ridge Development Lot",
    propertyType: "land",
    status: "For Sale",
    priceLabel: "$165,000",
    location: "Lincoln, ND",
    description:
      "Build-ready residential lot with utilities nearby, wide frontage, and excellent long-term appreciation potential.",
    acres: 1.8,
    tag: "Growth Area",
    gradient:
      "linear-gradient(135deg, rgba(255,250,247,0.92), rgba(250,103,129,0.72)), radial-gradient(circle at 75% 75%, rgba(184,49,82,.55), transparent 15rem)",
  },
  {
    id: "land-002",
    title: "Prairie View Acreage",
    propertyType: "land",
    status: "For Sale",
    priceLabel: "$245,000",
    location: "Bismarck, ND",
    description:
      "Open acreage with wide prairie views, flexible residential potential, and room for a custom build or hobby setup.",
    acres: 5.4,
    tag: "Acreage",
    gradient:
      "linear-gradient(135deg, rgba(255,250,247,0.95), rgba(250,103,129,0.62)), radial-gradient(circle at 25% 25%, rgba(255,255,255,.95), transparent 16rem)",
  },
  {
    id: "land-003",
    title: "Mandan Commercial Pad Site",
    propertyType: "land",
    status: "For Sale",
    priceLabel: "$390,000",
    location: "Mandan, ND",
    description:
      "Commercial pad site near active traffic corridors with strong visibility, access potential, and flexible development options.",
    acres: 2.2,
    tag: "Commercial Land",
    gradient:
      "linear-gradient(135deg, rgba(31,31,36,0.84), rgba(250,103,129,0.72)), radial-gradient(circle at 70% 20%, rgba(255,255,255,.78), transparent 14rem)",
  },
  {
    id: "land-004",
    title: "North Fargo Residential Lots",
    propertyType: "land",
    status: "For Sale",
    priceLabel: "$98,000",
    location: "Fargo, ND",
    description:
      "Platted residential lots in a growing neighborhood with access to nearby schools, shopping, and community amenities.",
    acres: 0.42,
    tag: "Residential Lots",
    gradient:
      "linear-gradient(135deg, rgba(250,103,129,0.86), rgba(255,154,172,0.74)), radial-gradient(circle at 65% 20%, rgba(255,255,255,.86), transparent 15rem)",
  },
  {
    id: "land-005",
    title: "Minot Edge Development Parcel",
    propertyType: "land",
    status: "For Sale",
    priceLabel: "$525,000",
    location: "Minot, ND",
    description:
      "Larger development parcel on the edge of town with long-term growth potential and multiple possible site plans.",
    acres: 12.6,
    tag: "Development",
    gradient:
      "linear-gradient(135deg, rgba(184,80,116,0.88), rgba(250,103,129,0.74)), radial-gradient(circle at 75% 25%, rgba(255,255,255,.86), transparent 15rem)",
  },
  {
    id: "land-006",
    title: "Quiet Country Build Site",
    propertyType: "land",
    status: "For Sale",
    priceLabel: "$132,000",
    location: "Rural Burleigh County, ND",
    description:
      "Peaceful rural build site with open sky views, privacy, and space for a custom home, shop, or small acreage lifestyle.",
    acres: 3.1,
    tag: "Country Living",
    gradient:
      "linear-gradient(135deg, rgba(184,49,82,0.82), rgba(255,154,172,0.72)), radial-gradient(circle at 80% 30%, rgba(255,255,255,.82), transparent 15rem)",
  },
];

export default function LandListingsPage() {
  return (
    <main className="main-shell">
      <HomeSidebar />

      <div className="with-home-sidebar">
        <LandListingsHero />
        <ListingCategoryTabs />
        <ListingsToolbar />

        <ListingsGrid
          listings={landListings}
          eyebrow="Land listings"
          heading="Available lots, acreage, and development land."
          description="Browse land-focused mock listings for now. Later this page can fetch from /api/listings/land or /api/listings?type=land."
        />
      </div>
    </main>
  );
}