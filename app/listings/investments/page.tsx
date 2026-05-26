// app/listings/investments/page.tsx

import HomeSidebar from "@/components/nav/HomeSidebar";
import InvestmentListingsHero from "@/components/properties/listings/InvestmentListingsHero";
import ListingCategoryTabs from "@/components/properties/listings/ListingCategoryTabs";
import ListingsGrid from "@/components/properties/listings/ListingsGrid";
import ListingsToolbar from "@/components/properties/listings/ListingsToolbar";
import type { ListingCardData } from "@/components/properties/listings/ListingCard";

const investmentListings: ListingCardData[] = [
  {
    id: "investment-001",
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
  {
    id: "investment-002",
    title: "Northside Fourplex",
    propertyType: "investment",
    status: "For Sale",
    priceLabel: "$745,000",
    location: "Fargo, ND",
    description:
      "Four-unit rental property with steady occupancy, updated units, shared laundry, and strong neighborhood demand.",
    beds: 8,
    baths: 4,
    sqft: 4860,
    tag: "Multi-Unit",
    gradient:
      "linear-gradient(135deg, rgba(31,31,36,0.88), rgba(250,103,129,0.72)), radial-gradient(circle at 30% 25%, rgba(255,255,255,.78), transparent 14rem)",
  },
  {
    id: "investment-003",
    title: "Mandan Commercial Pad Site",
    propertyType: "investment",
    status: "For Sale",
    priceLabel: "$390,000",
    location: "Mandan, ND",
    description:
      "Commercial pad site near active traffic corridors with strong visibility, access potential, and flexible development options.",
    acres: 2.2,
    tag: "Land Investment",
    gradient:
      "linear-gradient(135deg, rgba(255,250,247,0.94), rgba(250,103,129,0.68)), radial-gradient(circle at 25% 25%, rgba(255,255,255,.95), transparent 16rem)",
  },
  {
    id: "investment-004",
    title: "Downtown Mixed-Use Corner",
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
    id: "investment-005",
    title: "Bismarck Rental Portfolio",
    propertyType: "investment",
    status: "For Sale",
    priceLabel: "$1,125,000",
    location: "Bismarck, ND",
    description:
      "Small portfolio of rental homes with established leases, diverse locations, and potential for long-term appreciation.",
    beds: 12,
    baths: 8,
    sqft: 7600,
    tag: "Portfolio",
    gradient:
      "linear-gradient(135deg, rgba(127,37,61,0.9), rgba(250,103,129,0.72)), radial-gradient(circle at 30% 20%, rgba(255,255,255,.85), transparent 15rem)",
  },
  {
    id: "investment-006",
    title: "Industrial Lease Asset",
    propertyType: "commercial",
    status: "For Sale",
    priceLabel: "$1,450,000",
    location: "Minot, ND",
    description:
      "Industrial investment property with warehouse space, office buildout, tenant potential, and convenient highway access.",
    sqft: 14200,
    tag: "Industrial Asset",
    gradient:
      "linear-gradient(135deg, rgba(184,49,82,0.9), rgba(255,154,172,0.72)), radial-gradient(circle at 80% 30%, rgba(255,255,255,.82), transparent 15rem)",
  },
];

export default function InvestmentsListingsPage() {
  return (
    <main className="main-shell">
      <HomeSidebar />

      <div className="with-home-sidebar">
        <InvestmentListingsHero />
        <ListingCategoryTabs />
        <ListingsToolbar />

        <ListingsGrid
          listings={investmentListings}
          eyebrow="Investment listings"
          heading="Available income properties, portfolios, and investment opportunities."
          description="Browse investment-focused mock listings for now. Later this page can fetch from /api/listings/investments or /api/listings?type=investment."
        />
      </div>
    </main>
  );
}