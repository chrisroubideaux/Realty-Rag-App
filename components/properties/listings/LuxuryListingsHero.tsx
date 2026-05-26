// components/properties/listings/LuxuryListingsHero.tsx

"use client";

import { motion } from "framer-motion";
import {
  FiAward,
  FiHome,
  FiMapPin,
  FiSearch,
  FiShield,
  FiStar,
  FiTrendingUp,
} from "react-icons/fi";

export default function LuxuryListingsHero() {
  return (
    <section className="luxury-listings-hero">
      <div className="app-container">
        <div className="luxury-listings-hero__grid">
          <motion.div
            className="luxury-listings-hero__content"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <span className="brand-kicker">
              <FiAward />
              Luxury properties
            </span>

            <h1>
              Explore premium homes with{" "}
              <span className="text-gradient">elevated living.</span>
            </h1>

            <p>
              Browse luxury estates, riverfront homes, executive residences,
              penthouse condos, and premium properties across Dakota markets.
            </p>

            <div className="luxury-listings-hero__search glass-card-strong">
              <div className="luxury-listings-hero__search-icon">
                <FiSearch />
              </div>

              <div>
                <span>Try searching</span>
                <strong>
                  “Luxury riverfront homes with chef kitchens and private suites”
                </strong>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="luxury-listings-hero__panel glass-card-strong"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <div className="luxury-listings-hero__visual">
              <div className="luxury-listings-hero__visual-glow" />

              <div className="luxury-listings-hero__floating luxury-listings-hero__floating--top">
                <FiHome />
                <div>
                  <span>Luxury inventory</span>
                  <strong>9 premium properties</strong>
                </div>
              </div>

              <div className="luxury-listings-hero__floating luxury-listings-hero__floating--middle">
                <FiMapPin />
                <div>
                  <span>Featured markets</span>
                  <strong>Bismarck, Fargo, Riverfront</strong>
                </div>
              </div>

              <div className="luxury-listings-hero__stats">
                <div>
                  <FiTrendingUp />
                  <strong>$1.2M</strong>
                  <span>Avg. luxury price</span>
                </div>

                <div>
                  <FiStar />
                  <strong>Elite</strong>
                  <span>Premium finishes</span>
                </div>

                <div>
                  <FiShield />
                  <strong>AI</strong>
                  <span>Private matching</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}