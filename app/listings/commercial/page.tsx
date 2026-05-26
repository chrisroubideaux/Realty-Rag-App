// app/commercial/page.tsx
// app/listings/commercial/page.tsx

import HomeSidebar from "@/components/nav/HomeSidebar";
import CommercialListingsHero from "@/components/properties/listings/CommercialListingsHero";
import ListingCategoryTabs from "@/components/properties/listings/ListingCategoryTabs";
import ListingsGrid from "@/components/properties/listings/ListingsGrid";
import ListingsToolbar from "@/components/properties/listings/ListingsToolbar";
import type { ListingCardData } from "@/components/properties/listings/ListingCard";

const commercialListings: ListingCardData[] = [
  {
    id: "commercial-001",
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
    id: "commercial-002",
    title: "Downtown Office Loft",
    propertyType: "commercial",
    status: "For Lease",
    priceLabel: "$19/sqft",
    location: "Bismarck, ND",
    description:
      "Modern office loft with open work areas, conference room potential, natural light, and walkable downtown access.",
    sqft: 3200,
    tag: "Office Space",
    gradient:
      "linear-gradient(135deg, rgba(255,250,247,0.94), rgba(250,103,129,0.68)), radial-gradient(circle at 25% 25%, rgba(255,255,255,.95), transparent 16rem)",
  },
  {
    id: "commercial-003",
    title: "Fargo Mixed-Use Corner",
    propertyType: "commercial",
    status: "For Sale",
    priceLabel: "$890,000",
    location: "Fargo, ND",
    description:
      "Mixed-use corner property with street-level commercial frontage and upper-level residential or office potential.",
    sqft: 6900,
    tag: "Mixed Use",
    gradient:
      "linear-gradient(135deg, rgba(184,80,116,0.88), rgba(250,103,129,0.74)), radial-gradient(circle at 75% 25%, rgba(255,255,255,.86), transparent 15rem)",
  },
  {
    id: "commercial-004",
    title: "Industrial Flex Warehouse",
    propertyType: "commercial",
    status: "For Lease",
    priceLabel: "$14/sqft",
    location: "Minot, ND",
    description:
      "Flexible warehouse space with loading access, high ceilings, office buildout, and convenient highway access.",
    sqft: 12000,
    tag: "Industrial",
    gradient:
      "linear-gradient(135deg, rgba(31,31,36,0.9), rgba(250,103,129,0.68)), radial-gradient(circle at 30% 25%, rgba(255,255,255,.72), transparent 14rem)",
  },
  {
    id: "commercial-005",
    title: "South Bismarck Medical Office",
    propertyType: "commercial",
    status: "For Sale",
    priceLabel: "$1,150,000",
    location: "Bismarck, ND",
    description:
      "Professional medical office building with exam rooms, reception area, private offices, and accessible parking.",
    sqft: 7600,
    tag: "Medical",
    gradient:
      "linear-gradient(135deg, rgba(250,103,129,0.86), rgba(255,154,172,0.74)), radial-gradient(circle at 65% 20%, rgba(255,255,255,.86), transparent 15rem)",
  },
  {
    id: "commercial-006",
    title: "Mandan Restaurant Space",
    propertyType: "commercial",
    status: "Lease Available",
    priceLabel: "$28/sqft",
    location: "Mandan, ND",
    description:
      "Restaurant-ready commercial space with dining area potential, kitchen infrastructure, and strong local visibility.",
    sqft: 4200,
    tag: "Restaurant",
    gradient:
      "linear-gradient(135deg, rgba(184,49,82,0.9), rgba(255,154,172,0.72)), radial-gradient(circle at 80% 30%, rgba(255,255,255,.82), transparent 15rem)",
  },
];

export default function CommercialListingsPage() {
  return (
    <main className="main-shell">
      <HomeSidebar />

      <div className="with-home-sidebar">
        <CommercialListingsHero />
        <ListingCategoryTabs />
        <ListingsToolbar />

        <ListingsGrid
          listings={commercialListings}
          eyebrow="Commercial listings"
          heading="Available retail, office, industrial, and mixed-use spaces."
          description="Browse commercial mock listings for now. Later this page can fetch from /api/listings/commercial or /api/listings?type=commercial."
        />
      </div>
    </main>
  );
}