// // components/properties/listings/ApartmentListingsHero.tsx

"use client";

import { motion } from "framer-motion";
import {
  FiClock,
  FiHome,
  FiLayers,
  FiMapPin,
  FiSearch,
  FiShield,
  FiStar,
} from "react-icons/fi";

export default function ApartmentListingsHero() {
  return (
    <section className="apartment-listings-hero">
      <div className="app-container">
        <div className="apartment-listings-hero__grid">
          <motion.div
            className="apartment-listings-hero__content"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <span className="brand-kicker">
              <FiLayers />
              Apartments & condos
            </span>

            <h1>
              Find modern apartments with{" "}
              <span className="text-gradient">smarter rental search.</span>
            </h1>

            <p>
              Explore apartments, condos, lofts, and rentals across Dakota
              markets with clean filters, AI-ready search, and property details
              built for fast decisions.
            </p>

            <div className="apartment-listings-hero__search glass-card-strong">
              <div className="apartment-listings-hero__search-icon">
                <FiSearch />
              </div>

              <div>
                <span>Try searching</span>
                <strong>
                  “Pet-friendly apartments near downtown Fargo with garage
                  parking”
                </strong>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="apartment-listings-hero__panel glass-card-strong"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <div className="apartment-listings-hero__visual">
              <div className="apartment-listings-hero__visual-glow" />

              <div className="apartment-listings-hero__floating apartment-listings-hero__floating--top">
                <FiHome />
                <div>
                  <span>Rental inventory</span>
                  <strong>26 available apartments</strong>
                </div>
              </div>

              <div className="apartment-listings-hero__floating apartment-listings-hero__floating--middle">
                <FiMapPin />
                <div>
                  <span>Popular areas</span>
                  <strong>Downtown Fargo, Bismarck, Mandan</strong>
                </div>
              </div>

              <div className="apartment-listings-hero__stats">
                <div>
                  <FiStar />
                  <strong>$2.1K</strong>
                  <span>Avg. monthly rent</span>
                </div>

                <div>
                  <FiClock />
                  <strong>18</strong>
                  <span>Avg. days listed</span>
                </div>

                <div>
                  <FiShield />
                  <strong>AI</strong>
                  <span>Rental matching</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}