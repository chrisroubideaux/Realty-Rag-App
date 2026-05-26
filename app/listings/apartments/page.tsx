// app/listings/apartments/page.tsx

import ApartmentListingsHero from "@/components/properties/listings/ApartmentListingsHero";
import ListingCategoryTabs from "@/components/properties/listings/ListingCategoryTabs";
import ListingsGrid from "@/components/properties/listings/ListingsGrid";
import ListingsToolbar from "@/components/properties/listings/ListingsToolbar";
import HomeSidebar from "@/components/nav/HomeSidebar";
import type { ListingCardData } from "@/components/properties/listings/ListingCard";

const apartmentListings: ListingCardData[] = [
  {
    id: "apartment-001",
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
    id: "apartment-002",
    title: "Pearl District Studio",
    propertyType: "apartment",
    status: "For Rent",
    priceLabel: "$1,325/mo",
    location: "Bismarck, ND",
    description:
      "Bright studio apartment with modern finishes, secure entry, in-unit laundry, and quick access to downtown amenities.",
    beds: 1,
    baths: 1,
    sqft: 640,
    tag: "Studio",
    gradient:
      "linear-gradient(135deg, rgba(255,250,247,0.95), rgba(250,103,129,0.66)), radial-gradient(circle at 25% 30%, rgba(255,255,255,.95), transparent 15rem)",
  },
  {
    id: "apartment-003",
    title: "Riverside Two-Bed Condo",
    propertyType: "condo",
    status: "For Sale",
    priceLabel: "$298,000",
    location: "Mandan, ND",
    description:
      "Updated condo near the river with private balcony, heated garage, open kitchen, and low-maintenance living.",
    beds: 2,
    baths: 2,
    sqft: 1320,
    tag: "Low Maintenance",
    gradient:
      "linear-gradient(135deg, rgba(250,103,129,0.86), rgba(255,154,172,0.74)), radial-gradient(circle at 70% 20%, rgba(255,255,255,.85), transparent 15rem)",
  },
  {
    id: "apartment-004",
    title: "Northside Modern Rental",
    propertyType: "apartment",
    status: "For Rent",
    priceLabel: "$1,875/mo",
    location: "Minot, ND",
    description:
      "Spacious rental with open living area, fitness center access, pet-friendly policy, and attached parking options.",
    beds: 3,
    baths: 2,
    sqft: 1450,
    tag: "Pet Friendly",
    gradient:
      "linear-gradient(135deg, rgba(31,31,36,0.84), rgba(250,103,129,0.72)), radial-gradient(circle at 30% 25%, rgba(255,255,255,.78), transparent 14rem)",
  },
  {
    id: "apartment-005",
    title: "West Fargo Townhome Rental",
    propertyType: "rental",
    status: "For Rent",
    priceLabel: "$2,350/mo",
    location: "West Fargo, ND",
    description:
      "Newer townhome rental with attached garage, three bedrooms, modern kitchen, and easy access to schools and shopping.",
    beds: 3,
    baths: 3,
    sqft: 1725,
    tag: "Townhome",
    gradient:
      "linear-gradient(135deg, rgba(184,49,82,0.88), rgba(255,154,172,0.74)), radial-gradient(circle at 80% 30%, rgba(255,255,255,.82), transparent 15rem)",
  },
  {
    id: "apartment-006",
    title: "Campus Edge Apartment",
    propertyType: "apartment",
    status: "For Rent",
    priceLabel: "$1,550/mo",
    location: "Grand Forks, ND",
    description:
      "Convenient apartment close to campus, transit, coffee shops, and daily essentials with flexible lease terms.",
    beds: 2,
    baths: 1,
    sqft: 940,
    tag: "Great Location",
    gradient:
      "linear-gradient(135deg, rgba(255,154,172,0.82), rgba(184,80,116,0.78)), radial-gradient(circle at 25% 70%, rgba(255,255,255,.82), transparent 15rem)",
  },
];

export default function ApartmentsListingsPage() {
  return (
    <main className="main-shell">
      <HomeSidebar />

      <div className="with-home-sidebar">
        <ApartmentListingsHero />
        <ListingCategoryTabs />
        <ListingsToolbar />

        <ListingsGrid
          listings={apartmentListings}
          eyebrow="Apartment listings"
          heading="Available apartments, condos, and rentals."
          description="Browse apartment-focused mock listings for now. Later this page can fetch from /api/listings/apartments or /api/listings?type=apartment."
        />
      </div>
    </main>
  );
}