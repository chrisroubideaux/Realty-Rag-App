// app/listings/page.tsx
// app/listings/page.tsx

import ListingCategoryTabs from "@/components/properties/listings/ListingCategoryTabs";
import ListingsGrid from "@/components/properties/listings/ListingsGrid";
import ListingsHero from "@/components/properties/listings/ListingsHero";
import ListingsToolbar from "@/components/properties/listings/ListingsToolbar";
import HomeSidebar from "@/components/nav/HomeSidebar";
import type { ListingCardData } from "@/components/properties/listings/ListingCard";

const allListings: ListingCardData[] = [
  {
    id: "listing-001",
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
    id: "listing-002",
    title: "Downtown Glass Loft",
    propertyType: "apartment",
    status: "For Rent",
    priceLabel: "$2,150/mo",
    location: "Downtown Fargo, ND",
    description:
      "Luxury apartment with skyline views, smart-home finishes, garage parking, and walkable dining nearby.",
    beds: 2,
    baths: 2,
    sqft: 1180,
    tag: "Urban Living",
    gradient:
      "linear-gradient(135deg, rgba(184,80,116,0.92), rgba(250,103,129,0.76)), radial-gradient(circle at 75% 25%, rgba(255,255,255,.9), transparent 15rem)",
  },
  {
    id: "listing-003",
    title: "Westside Retail Suite",
    propertyType: "commercial",
    status: "Lease Available",
    priceLabel: "$24/sqft",
    location: "Mandan, ND",
    description:
      "High-visibility retail suite with flexible buildout options, strong traffic counts, and modern frontage.",
    sqft: 4800,
    tag: "Business Ready",
    gradient:
      "linear-gradient(135deg, rgba(31,31,36,0.86), rgba(250,103,129,0.78)), radial-gradient(circle at 30% 20%, rgba(255,255,255,.8), transparent 14rem)",
  },
  {
    id: "listing-004",
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
    id: "listing-005",
    title: "Luxury Riverfront Estate",
    propertyType: "luxury",
    status: "For Sale",
    priceLabel: "$1,250,000",
    location: "Bismarck, ND",
    description:
      "Private riverfront estate with premium finishes, chef kitchen, theater room, and outdoor entertaining space.",
    beds: 5,
    baths: 5,
    sqft: 5820,
    tag: "Luxury",
    gradient:
      "linear-gradient(135deg, rgba(127,37,61,0.9), rgba(250,103,129,0.72)), radial-gradient(circle at 30% 20%, rgba(255,255,255,.85), transparent 15rem)",
  },
  {
    id: "listing-006",
    title: "Northside Investment Duplex",
    propertyType: "investment",
    status: "For Sale",
    priceLabel: "$389,000",
    location: "Minot, ND",
    description:
      "Two-unit income property with updated interiors, strong rental history, and low-maintenance exterior.",
    beds: 6,
    baths: 4,
    sqft: 3100,
    tag: "Income Property",
    gradient:
      "linear-gradient(135deg, rgba(255,154,172,0.82), rgba(184,49,82,0.78)), radial-gradient(circle at 20% 20%, rgba(255,255,255,.8), transparent 15rem)",
  },
];

export default function ListingsPage() {
  return (
    <main className="main-shell">
      <HomeSidebar />

      <div className="with-home-sidebar">
        <ListingsHero />
        <ListingCategoryTabs />
        <ListingsToolbar />

        <ListingsGrid
          listings={allListings}
          eyebrow="Available listings"
          heading="Browse featured inventory across every property type."
          description="Showing static mock listings for now. Later this page will fetch from your general listings API."
        />
      </div>
    </main>
  );
}