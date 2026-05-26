// components/properties/listings/ListingCard.tsx
"use client";

import Link from "next/link";
import { FiArrowRight, FiBriefcase, FiHeart, FiHome, FiMapPin, FiMaximize2, FiTrendingUp } from "react-icons/fi";

export type ListingType =
  | "home"
  | "apartment"
  | "condo"
  | "commercial"
  | "land"
  | "luxury"
  | "rental"
  | "investment";

export type ListingCardData = {
  id: string;
  title: string;
  propertyType: ListingType;
  status: string;
  priceLabel: string;
  location: string;
  description: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  acres?: number;
  tag?: string;
  imageUrl?: string | null;
  gradient?: string;
};

type ListingCardProps = {
  listing: ListingCardData;
};

export default function ListingCard({ listing }: ListingCardProps) {
  const icon = getListingIcon(listing.propertyType);
  const typeLabel = getListingTypeLabel(listing.propertyType);

  return (
    <article className="listing-card">
      <div
        className="listing-card__media"
        style={{
          background:
            listing.imageUrl || listing.gradient
              ? listing.gradient
              : "linear-gradient(135deg, rgba(250,103,129,0.86), rgba(255,154,172,0.72))",
        }}
      >
        <div className="listing-card__media-glow" />

        {listing.tag && <span className="listing-card__tag">{listing.tag}</span>}

        <button
          className="listing-card__save"
          type="button"
          aria-label={`Save ${listing.title}`}
        >
          <FiHeart />
        </button>

        <div className="listing-card__type-icon">{icon}</div>
      </div>

      <div className="listing-card__body">
        <div className="listing-card__topline">
          <span>{typeLabel}</span>
          <strong>{listing.status}</strong>
        </div>

        <h3>{listing.title}</h3>

        <div className="listing-card__location">
          <FiMapPin />
          <span>{listing.location}</span>
        </div>

        <p>{listing.description}</p>

        <div className="listing-card__features">
          {typeof listing.beds === "number" && (
            <span>
              <FiHome />
              {listing.beds} Beds
            </span>
          )}

          {typeof listing.baths === "number" && (
            <span>
              <FiHome />
              {listing.baths} Baths
            </span>
          )}

          {typeof listing.sqft === "number" && (
            <span>
              <FiMaximize2 />
              {listing.sqft.toLocaleString()} sqft
            </span>
          )}

          {typeof listing.acres === "number" && (
            <span>
              <FiTrendingUp />
              {listing.acres} Acres
            </span>
          )}
        </div>

        <div className="listing-card__footer">
          <strong>{listing.priceLabel}</strong>

          <Link href={`/listings/${listing.id}`}>
            Details
            <FiArrowRight />
          </Link>
        </div>
      </div>
    </article>
  );
}

function getListingTypeLabel(type: ListingType) {
  const labels: Record<ListingType, string> = {
    home: "Home",
    apartment: "Apartment",
    condo: "Condo",
    commercial: "Commercial",
    land: "Land",
    luxury: "Luxury",
    rental: "Rental",
    investment: "Investment",
  };

  return labels[type];
}

function getListingIcon(type: ListingType) {
  if (type === "commercial") return <FiBriefcase />;
  if (type === "land" || type === "investment") return <FiTrendingUp />;
  return <FiHome />;
}