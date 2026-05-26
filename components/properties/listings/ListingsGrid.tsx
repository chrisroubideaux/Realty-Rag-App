// components/properties/listings/ListingsGrid.tsx

"use client";

import { motion } from "framer-motion";
import ListingCard, { ListingCardData } from "./ListingCard";

type ListingsGridProps = {
  listings: ListingCardData[];
  heading?: string;
  eyebrow?: string;
  description?: string;
};

export default function ListingsGrid({
  listings,
  heading = "Browse featured inventory across every property type.",
  eyebrow = "Available listings",
  description = "Showing static mock listings for now. Later this grid will receive API data from your general listings endpoint and category filters.",
}: ListingsGridProps) {
  return (
    <section className="listings-grid-section section-padding-sm">
      <div className="app-container">
        <div className="listings-grid-section__header">
          <div>
            <span className="brand-kicker">{eyebrow}</span>
            <h2>{heading}</h2>
          </div>

          <p>{description}</p>
        </div>

        <div className="listings-grid">
          {listings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{
                duration: 0.45,
                delay: index * 0.05,
                ease: "easeOut",
              }}
            >
              <ListingCard listing={listing} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}