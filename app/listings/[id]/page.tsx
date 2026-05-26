// app/listings/[id]/page.tsx
// app/listings/[id]/page.tsx
// app/listings/[id]/page.tsx

import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

import HomeSidebar from "@/components/nav/HomeSidebar";
import PropertyAgentCard from "@/components/properties/details/PropertyAgentCard";
import PropertyAiCard from "@/components/properties/details/PropertyAiCard";
import PropertyDetailTopbar from "@/components/properties/details/PropertyDetailTopbar";
import PropertyFacts from "@/components/properties/details/PropertyFacts";
import PropertyHighlights from "@/components/properties/details/PropertyHighlights";
import PropertyImageSlider from "@/components/properties/details/PropertyImageSlider";
import PropertyOverview from "@/components/properties/details/PropertyOverview";
import PropertySummaryCard from "@/components/properties/details/PropertySummaryCard";

export type ListingType =
  | "home"
  | "apartment"
  | "condo"
  | "commercial"
  | "land"
  | "luxury"
  | "rental"
  | "investment";

export type ListingDetail = {
  id: string;
  title: string;
  propertyType: ListingType;
  status: string;
  priceLabel: string;
  location: string;
  address: string;
  description: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  acres?: number;
  yearBuilt?: number;
  tag: string;
  gradient: string;
  highlights: string[];
  agent: {
    name: string;
    title: string;
    phone: string;
    email: string;
  };
};

type ListingDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const mockListings: ListingDetail[] = [
  {
    id: "listing-001",
    title: "Modern Prairie Home",
    propertyType: "home",
    status: "For Sale",
    priceLabel: "$485,000",
    location: "Bismarck, ND",
    address: "1842 Prairie View Lane",
    description:
      "A modern single-family home with open-concept living, oversized windows, finished basement, and a fenced backyard near schools, parks, and shopping.",
    beds: 4,
    baths: 3,
    sqft: 2640,
    yearBuilt: 2018,
    tag: "Family Favorite",
    gradient:
      "linear-gradient(135deg, rgba(250,103,129,0.92), rgba(255,154,172,0.84)), radial-gradient(circle at 20% 20%, rgba(255,255,255,.95), transparent 16rem)",
    highlights: [
      "Finished basement",
      "Fenced backyard",
      "Updated kitchen",
      "Near schools and parks",
    ],
    agent: {
      name: "Ava Reynolds",
      title: "Senior Residential Agent",
      phone: "(701) 555-0148",
      email: "ava@dakotarealty.ai",
    },
  },
  {
    id: "listing-002",
    title: "Downtown Glass Loft",
    propertyType: "apartment",
    status: "For Rent",
    priceLabel: "$2,150/mo",
    location: "Downtown Fargo, ND",
    address: "77 Broadway North, Unit 1408",
    description:
      "A luxury downtown apartment with skyline views, smart-home finishes, garage parking, and walkable access to dining, coffee shops, and entertainment.",
    beds: 2,
    baths: 2,
    sqft: 1180,
    yearBuilt: 2021,
    tag: "Urban Living",
    gradient:
      "linear-gradient(135deg, rgba(184,80,116,0.92), rgba(250,103,129,0.76)), radial-gradient(circle at 75% 25%, rgba(255,255,255,.9), transparent 15rem)",
    highlights: [
      "Skyline views",
      "Garage parking",
      "Smart-home features",
      "Walkable downtown location",
    ],
    agent: {
      name: "Sofia Bennett",
      title: "Luxury Listing Specialist",
      phone: "(701) 555-0182",
      email: "sofia@dakotarealty.ai",
    },
  },
  {
    id: "listing-003",
    title: "Westside Retail Suite",
    propertyType: "commercial",
    status: "Lease Available",
    priceLabel: "$24/sqft",
    location: "Mandan, ND",
    address: "415 West Main Street",
    description:
      "A high-visibility commercial retail suite with flexible buildout options, modern frontage, parking access, and strong traffic counts.",
    sqft: 4800,
    yearBuilt: 2016,
    tag: "Business Ready",
    gradient:
      "linear-gradient(135deg, rgba(31,31,36,0.86), rgba(250,103,129,0.78)), radial-gradient(circle at 30% 20%, rgba(255,255,255,.8), transparent 14rem)",
    highlights: [
      "High-visibility frontage",
      "Flexible buildout",
      "Strong traffic counts",
      "Retail or office use",
    ],
    agent: {
      name: "Marcus Hale",
      title: "Commercial Property Advisor",
      phone: "(701) 555-0194",
      email: "marcus@dakotarealty.ai",
    },
  },
  {
    id: "listing-004",
    title: "River Ridge Development Lot",
    propertyType: "land",
    status: "For Sale",
    priceLabel: "$165,000",
    location: "Lincoln, ND",
    address: "Lot 12 River Ridge Drive",
    description:
      "A build-ready residential lot with utilities nearby, wide frontage, and excellent long-term appreciation potential in a growing area.",
    acres: 1.8,
    tag: "Growth Area",
    gradient:
      "linear-gradient(135deg, rgba(255,250,247,0.92), rgba(250,103,129,0.72)), radial-gradient(circle at 75% 75%, rgba(184,49,82,.55), transparent 15rem)",
    highlights: [
      "Build-ready lot",
      "Utilities nearby",
      "Wide frontage",
      "Growing residential area",
    ],
    agent: {
      name: "Noah Carter",
      title: "Land & Investment Agent",
      phone: "(701) 555-0127",
      email: "noah@dakotarealty.ai",
    },
  },
];

export default async function ListingDetailPage({
  params,
}: ListingDetailPageProps) {
  const { id } = await params;
  const listing = getMockListingById(id);

  if (!listing) {
    return <MissingListing />;
  }

  const typeLabel = getListingTypeLabel(listing.propertyType);

  return (
    <main className="main-shell">
      <HomeSidebar />

      <div className="with-home-sidebar">
        <section className="listing-detail">
          <div className="app-container">
            <PropertyDetailTopbar />

            <div className="listing-detail__hero">
              <PropertyImageSlider
                title={listing.title}
                tag={listing.tag}
                gradient={listing.gradient}
                propertyTypeLabel={typeLabel}
              />

              <PropertySummaryCard listing={listing} typeLabel={typeLabel} />
            </div>

            <div className="listing-detail__content-grid">
              <div className="listing-detail__main">
                <PropertyOverview listing={listing} />
                <PropertyFacts listing={listing} />
                <PropertyHighlights highlights={listing.highlights} />
              </div>

              <aside className="listing-detail__sidebar">
                <PropertyAgentCard agent={listing.agent} />
                <PropertyAiCard listingId={listing.id} />
              </aside>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function MissingListing() {
  return (
    <main className="main-shell">
      <HomeSidebar />

      <div className="with-home-sidebar">
        <section className="listing-detail listing-detail--missing">
          <div className="app-container">
            <div className="listing-detail__missing-card glass-card-strong">
              <span className="brand-kicker">Listing not found</span>

              <h1>This property could not be found.</h1>

              <p>
                It may have been removed, sold, or the listing ID may be
                incorrect.
              </p>

              <Link href="/listings" className="listing-detail__back-link">
                <FiArrowLeft />
                Back to listings
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function getMockListingById(id: string) {
  return mockListings.find((listing) => listing.id === id);
}

function getListingTypeLabel(type: ListingType) {
  const labels: Record<ListingType, string> = {
    home: "Single-family home",
    apartment: "Apartment",
    condo: "Condo",
    commercial: "Commercial property",
    land: "Land",
    luxury: "Luxury property",
    rental: "Rental",
    investment: "Investment property",
  };

  return labels[type];
}