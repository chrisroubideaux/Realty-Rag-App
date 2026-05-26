// components/listings/FeaturedListings.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiDroplet,
  FiBriefcase,
  FiHeart,
  FiHome,
  FiMapPin,
  FiMaximize2,
  FiTrendingUp,
} from "react-icons/fi";

type FeaturedListing = {
  id: string;
  title: string;
  category: string;
  status: string;
  price: string;
  location: string;
  description: string;
  beds?: string;
  baths?: string;
  sqft: string;
  tag: string;
  icon: React.ReactNode;
  gradient: string;
};

const featuredListings: FeaturedListing[] = [
  {
    id: "listing-001",
    title: "Modern Prairie Home",
    category: "Single-Family Home",
    status: "For Sale",
    price: "$485,000",
    location: "Bismarck, ND",
    description:
      "Open-concept living, oversized windows, finished basement, and a fenced backyard near schools and parks.",
    beds: "4 Beds",
    baths: "3 Baths",
    sqft: "2,640 sqft",
    tag: "Family Favorite",
    icon: <FiHome />,
    gradient:
      "linear-gradient(135deg, rgba(250, 103, 129, 0.92), rgba(255, 154, 172, 0.84)), radial-gradient(circle at 20% 20%, rgba(255,255,255,.95), transparent 16rem)",
  },
  {
    id: "listing-002",
    title: "Downtown Glass Loft",
    category: "Apartment / Condo",
    status: "For Rent",
    price: "$2,150/mo",
    location: "Downtown Fargo, ND",
    description:
      "Luxury apartment with skyline views, smart-home finishes, garage parking, and walkable dining nearby.",
    beds: "2 Beds",
    baths: "2 Baths",
    sqft: "1,180 sqft",
    tag: "Urban Living",
    icon: <FiMaximize2 />,
    gradient:
      "linear-gradient(135deg, rgba(184, 80, 116, 0.92), rgba(250, 103, 129, 0.76)), radial-gradient(circle at 75% 25%, rgba(255,255,255,.9), transparent 15rem)",
  },
  {
    id: "listing-003",
    title: "Westside Retail Suite",
    category: "Commercial",
    status: "Lease Available",
    price: "$24/sqft",
    location: "Mandan, ND",
    description:
      "High-visibility retail suite with flexible buildout options, strong traffic counts, and modern frontage.",
    sqft: "4,800 sqft",
    tag: "Business Ready",
    icon: <FiBriefcase />,
    gradient:
      "linear-gradient(135deg, rgba(31,31,36,0.86), rgba(250,103,129,0.78)), radial-gradient(circle at 30% 20%, rgba(255,255,255,.8), transparent 14rem)",
  },
  {
    id: "listing-004",
    title: "River Ridge Development Lot",
    category: "Land",
    status: "For Sale",
    price: "$165,000",
    location: "Lincoln, ND",
    description:
      "Build-ready residential lot with utilities nearby, wide frontage, and excellent long-term appreciation potential.",
    sqft: "1.8 Acres",
    tag: "Growth Area",
    icon: <FiTrendingUp />,
    gradient:
      "linear-gradient(135deg, rgba(255, 250, 247, 0.92), rgba(250, 103, 129, 0.72)), radial-gradient(circle at 75% 75%, rgba(184,49,82,.55), transparent 15rem)",
  },
];

export default function FeaturedListings() {
  return (
    <section className="featured-listings section-padding">
      <div className="app-container">
        <div className="featured-listings__header">
          <div>
            <span className="brand-kicker">Featured properties</span>

            <h2>
              Explore homes, apartments, commercial spaces, and investment
              opportunities.
            </h2>
          </div>

          <Link href="/listings" className="featured-listings__view-all">
            View all listings
            <FiArrowRight />
          </Link>
        </div>

        <div className="featured-listings__grid">
          {featuredListings.map((listing, index) => (
            <motion.article
              className="featured-listing-card"
              key={listing.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: "easeOut",
              }}
            >
              <div
                className="featured-listing-card__media"
                style={{ background: listing.gradient }}
              >
                <div className="featured-listing-card__media-glow" />

                <span className="featured-listing-card__tag">
                  {listing.tag}
                </span>

                <button
                  className="featured-listing-card__save"
                  type="button"
                  aria-label={`Save ${listing.title}`}
                >
                  <FiHeart />
                </button>

                <div className="featured-listing-card__icon">
                  {listing.icon}
                </div>
              </div>

              <div className="featured-listing-card__body">
                <div className="featured-listing-card__topline">
                  <span>{listing.category}</span>
                  <strong>{listing.status}</strong>
                </div>

                <h3>{listing.title}</h3>

                <div className="featured-listing-card__location">
                  <FiMapPin />
                  <span>{listing.location}</span>
                </div>

                <p>{listing.description}</p>

                <div className="featured-listing-card__features">
                  {listing.beds && (
                    <span>
                      <FiHome />
                      {listing.beds}
                    </span>
                  )}

                  {listing.baths && (
                    <span>
                      <FiDroplet />
                      {listing.baths}
                    </span>
                  )}

                  <span>
                    <FiMaximize2 />
                    {listing.sqft}
                  </span>
                </div>

                <div className="featured-listing-card__footer">
                  <strong>{listing.price}</strong>

                  <Link href={`/listings/${listing.id}`}>
                    Details
                    <FiArrowRight />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}