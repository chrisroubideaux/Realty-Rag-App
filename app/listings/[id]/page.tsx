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

  // Homes page IDs
  {
    id: "home-001",
    title: "Modern Prairie Home",
    propertyType: "home",
    status: "For Sale",
    priceLabel: "$485,000",
    location: "Bismarck, ND",
    address: "1842 Prairie View Lane",
    description:
      "Open-concept living, oversized windows, finished basement, and a fenced backyard near schools and parks.",
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
      "Open-concept layout",
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
    id: "home-002",
    title: "Southridge Ranch House",
    propertyType: "home",
    status: "For Sale",
    priceLabel: "$398,000",
    location: "Mandan, ND",
    address: "612 Southridge Drive",
    description:
      "Well-kept ranch-style home with main-floor laundry, updated flooring, attached garage, and a quiet neighborhood setting.",
    beds: 3,
    baths: 2,
    sqft: 2180,
    yearBuilt: 2014,
    tag: "Move-In Ready",
    gradient:
      "linear-gradient(135deg, rgba(255,250,247,0.94), rgba(250,103,129,0.68)), radial-gradient(circle at 25% 25%, rgba(255,255,255,.95), transparent 16rem)",
    highlights: [
      "Main-floor laundry",
      "Attached garage",
      "Updated flooring",
      "Quiet neighborhood",
    ],
    agent: {
      name: "Ava Reynolds",
      title: "Senior Residential Agent",
      phone: "(701) 555-0148",
      email: "ava@dakotarealty.ai",
    },
  },

  // Apartment page IDs
  {
    id: "apartment-001",
    title: "Downtown Glass Loft",
    propertyType: "apartment",
    status: "For Rent",
    priceLabel: "$2,150/mo",
    location: "Downtown Fargo, ND",
    address: "77 Broadway North, Unit 1408",
    description:
      "Luxury apartment with skyline views, smart-home finishes, garage parking, and walkable dining nearby.",
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
      "Smart-home finishes",
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
    id: "apartment-002",
    title: "Pearl District Studio",
    propertyType: "apartment",
    status: "For Rent",
    priceLabel: "$1,325/mo",
    location: "Bismarck, ND",
    address: "214 Pearl Street, Unit 304",
    description:
      "Bright studio apartment with modern finishes, secure entry, in-unit laundry, and quick access to downtown amenities.",
    beds: 1,
    baths: 1,
    sqft: 640,
    yearBuilt: 2020,
    tag: "Studio",
    gradient:
      "linear-gradient(135deg, rgba(255,250,247,0.95), rgba(250,103,129,0.66)), radial-gradient(circle at 25% 30%, rgba(255,255,255,.95), transparent 15rem)",
    highlights: [
      "In-unit laundry",
      "Secure entry",
      "Modern finishes",
      "Downtown access",
    ],
    agent: {
      name: "Sofia Bennett",
      title: "Luxury Listing Specialist",
      phone: "(701) 555-0182",
      email: "sofia@dakotarealty.ai",
    },
  },

  // Commercial page IDs
  {
    id: "commercial-001",
    title: "Westside Retail Suite",
    propertyType: "commercial",
    status: "Lease Available",
    priceLabel: "$24/sqft",
    location: "Mandan, ND",
    address: "415 West Main Street",
    description:
      "High-visibility retail suite with flexible buildout options, strong traffic counts, and modern frontage.",
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
    id: "commercial-002",
    title: "Downtown Office Loft",
    propertyType: "commercial",
    status: "For Lease",
    priceLabel: "$19/sqft",
    location: "Bismarck, ND",
    address: "128 North 5th Street",
    description:
      "Modern office loft with open work areas, conference room potential, natural light, and walkable downtown access.",
    sqft: 3200,
    yearBuilt: 2019,
    tag: "Office Space",
    gradient:
      "linear-gradient(135deg, rgba(255,250,247,0.94), rgba(250,103,129,0.68)), radial-gradient(circle at 25% 25%, rgba(255,255,255,.95), transparent 16rem)",
    highlights: [
      "Open work areas",
      "Conference room potential",
      "Natural light",
      "Downtown access",
    ],
    agent: {
      name: "Marcus Hale",
      title: "Commercial Property Advisor",
      phone: "(701) 555-0194",
      email: "marcus@dakotarealty.ai",
    },
  },

  // Land page IDs
  {
    id: "land-001",
    title: "River Ridge Development Lot",
    propertyType: "land",
    status: "For Sale",
    priceLabel: "$165,000",
    location: "Lincoln, ND",
    address: "Lot 12 River Ridge Drive",
    description:
      "Build-ready residential lot with utilities nearby, wide frontage, and excellent long-term appreciation potential.",
    acres: 1.8,
    tag: "Growth Area",
    gradient:
      "linear-gradient(135deg, rgba(255,250,247,0.92), rgba(250,103,129,0.72)), radial-gradient(circle at 75% 75%, rgba(184,49,82,.55), transparent 15rem)",
    highlights: [
      "Build-ready lot",
      "Utilities nearby",
      "Wide frontage",
      "Growth area",
    ],
    agent: {
      name: "Noah Carter",
      title: "Land & Investment Agent",
      phone: "(701) 555-0127",
      email: "noah@dakotarealty.ai",
    },
  },
  {
    id: "land-002",
    title: "Prairie View Acreage",
    propertyType: "land",
    status: "For Sale",
    priceLabel: "$245,000",
    location: "Bismarck, ND",
    address: "8801 Prairie View Road",
    description:
      "Open acreage with wide prairie views, flexible residential potential, and room for a custom build or hobby setup.",
    acres: 5.4,
    tag: "Acreage",
    gradient:
      "linear-gradient(135deg, rgba(255,250,247,0.95), rgba(250,103,129,0.62)), radial-gradient(circle at 25% 25%, rgba(255,255,255,.95), transparent 16rem)",
    highlights: [
      "Wide prairie views",
      "Custom build potential",
      "Room for shop",
      "Flexible residential use",
    ],
    agent: {
      name: "Noah Carter",
      title: "Land & Investment Agent",
      phone: "(701) 555-0127",
      email: "noah@dakotarealty.ai",
    },
  },

  // Luxury page IDs
  {
    id: "luxury-001",
    title: "Luxury Riverfront Estate",
    propertyType: "luxury",
    status: "For Sale",
    priceLabel: "$1,250,000",
    location: "Bismarck, ND",
    address: "22 Riverfront Court",
    description:
      "Private riverfront estate with premium finishes, chef kitchen, theater room, and expansive outdoor entertaining space.",
    beds: 5,
    baths: 5,
    sqft: 5820,
    yearBuilt: 2020,
    tag: "Riverfront",
    gradient:
      "linear-gradient(135deg, rgba(127,37,61,0.9), rgba(250,103,129,0.72)), radial-gradient(circle at 30% 20%, rgba(255,255,255,.85), transparent 15rem)",
    highlights: [
      "Riverfront setting",
      "Chef kitchen",
      "Theater room",
      "Outdoor entertaining space",
    ],
    agent: {
      name: "Sofia Bennett",
      title: "Luxury Listing Specialist",
      phone: "(701) 555-0182",
      email: "sofia@dakotarealty.ai",
    },
  },
  {
    id: "luxury-002",
    title: "Executive Prairie Manor",
    propertyType: "luxury",
    status: "For Sale",
    priceLabel: "$975,000",
    location: "Fargo, ND",
    address: "901 Prairie Manor Drive",
    description:
      "Executive home with grand entry, designer kitchen, private office, spa-inspired primary suite, and oversized garage.",
    beds: 5,
    baths: 4,
    sqft: 4960,
    yearBuilt: 2019,
    tag: "Executive",
    gradient:
      "linear-gradient(135deg, rgba(184,49,82,0.9), rgba(255,154,172,0.72)), radial-gradient(circle at 80% 30%, rgba(255,255,255,.82), transparent 15rem)",
    highlights: [
      "Grand entry",
      "Designer kitchen",
      "Private office",
      "Spa-inspired suite",
    ],
    agent: {
      name: "Sofia Bennett",
      title: "Luxury Listing Specialist",
      phone: "(701) 555-0182",
      email: "sofia@dakotarealty.ai",
    },
  },

  // Investment page IDs
  {
    id: "investment-001",
    title: "Minot Investment Duplex",
    propertyType: "investment",
    status: "For Sale",
    priceLabel: "$389,000",
    location: "Minot, ND",
    address: "411 Northside Avenue",
    description:
      "Two-unit residential income property with updated interiors, strong rental history, and low-maintenance exterior.",
    beds: 6,
    baths: 4,
    sqft: 3100,
    yearBuilt: 2012,
    tag: "Income Property",
    gradient:
      "linear-gradient(135deg, rgba(255,154,172,0.82), rgba(184,49,82,0.78)), radial-gradient(circle at 20% 20%, rgba(255,255,255,.8), transparent 15rem)",
    highlights: [
      "Two rental units",
      "Strong rental history",
      "Updated interiors",
      "Low-maintenance exterior",
    ],
    agent: {
      name: "Noah Carter",
      title: "Land & Investment Agent",
      phone: "(701) 555-0127",
      email: "noah@dakotarealty.ai",
    },
  },
  {
    id: "investment-002",
    title: "Northside Fourplex",
    propertyType: "investment",
    status: "For Sale",
    priceLabel: "$745,000",
    location: "Fargo, ND",
    address: "840 Northside Circle",
    description:
      "Four-unit rental property with steady occupancy, updated units, shared laundry, and strong neighborhood demand.",
    beds: 8,
    baths: 4,
    sqft: 4860,
    yearBuilt: 2010,
    tag: "Multi-Unit",
    gradient:
      "linear-gradient(135deg, rgba(31,31,36,0.88), rgba(250,103,129,0.72)), radial-gradient(circle at 30% 25%, rgba(255,255,255,.78), transparent 14rem)",
    highlights: [
      "Four rental units",
      "Steady occupancy",
      "Updated units",
      "Strong rental demand",
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
{/*
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

*/}