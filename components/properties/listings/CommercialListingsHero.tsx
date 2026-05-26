// components/properties/listings/CommercialListingsHero.tsx

"use client";

import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiMapPin,
  FiSearch,
  FiShield,
  FiStar,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

export default function CommercialListingsHero() {
  return (
    <section className="commercial-listings-hero">
      <div className="app-container">
        <div className="commercial-listings-hero__grid">
          <motion.div
            className="commercial-listings-hero__content"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <span className="brand-kicker">
              <FiBriefcase />
              Commercial properties
            </span>

            <h1>
              Find commercial spaces built for{" "}
              <span className="text-gradient">business growth.</span>
            </h1>

            <p>
              Browse retail suites, office spaces, mixed-use properties,
              warehouses, and investment-ready commercial opportunities across
              Dakota markets.
            </p>

            <div className="commercial-listings-hero__search glass-card-strong">
              <div className="commercial-listings-hero__search-icon">
                <FiSearch />
              </div>

              <div>
                <span>Try searching</span>
                <strong>
                  “Retail space in Mandan with parking and high traffic”
                </strong>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="commercial-listings-hero__panel glass-card-strong"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <div className="commercial-listings-hero__visual">
              <div className="commercial-listings-hero__visual-glow" />

              <div className="commercial-listings-hero__floating commercial-listings-hero__floating--top">
                <FiBriefcase />
                <div>
                  <span>Commercial inventory</span>
                  <strong>14 active spaces</strong>
                </div>
              </div>

              <div className="commercial-listings-hero__floating commercial-listings-hero__floating--middle">
                <FiMapPin />
                <div>
                  <span>Business markets</span>
                  <strong>Mandan, Fargo, Bismarck</strong>
                </div>
              </div>

              <div className="commercial-listings-hero__stats">
                <div>
                  <FiTrendingUp />
                  <strong>$24</strong>
                  <span>Avg. lease / sqft</span>
                </div>

                <div>
                  <FiUsers />
                  <strong>Retail</strong>
                  <span>Top demand</span>
                </div>

                <div>
                  <FiShield />
                  <strong>AI</strong>
                  <span>Deal insights</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}