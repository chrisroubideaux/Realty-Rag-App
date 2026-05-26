// components/properties/listings/InvestmentListingsHero.tsx

"use client";

import { motion } from "framer-motion";
import {
  FiBarChart2,
  FiBriefcase,
  FiHome,
  FiMapPin,
  FiSearch,
  FiShield,
  FiTrendingUp,
} from "react-icons/fi";

export default function InvestmentListingsHero() {
  return (
    <section className="investment-listings-hero">
      <div className="app-container">
        <div className="investment-listings-hero__grid">
          <motion.div
            className="investment-listings-hero__content"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <span className="brand-kicker">
              <FiTrendingUp />
              Investment properties
            </span>

            <h1>
              Find properties built for{" "}
              <span className="text-gradient">long-term return.</span>
            </h1>

            <p>
              Explore duplexes, multi-family properties, income rentals,
              commercial investments, and land opportunities with clean
              comparison tools and AI-ready deal insights.
            </p>

            <div className="investment-listings-hero__search glass-card-strong">
              <div className="investment-listings-hero__search-icon">
                <FiSearch />
              </div>

              <div>
                <span>Try searching</span>
                <strong>
                  “Income properties under $500k with strong rental history”
                </strong>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="investment-listings-hero__panel glass-card-strong"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <div className="investment-listings-hero__visual">
              <div className="investment-listings-hero__visual-glow" />

              <div className="investment-listings-hero__floating investment-listings-hero__floating--top">
                <FiBriefcase />
                <div>
                  <span>Investment inventory</span>
                  <strong>11 active opportunities</strong>
                </div>
              </div>

              <div className="investment-listings-hero__floating investment-listings-hero__floating--middle">
                <FiMapPin />
                <div>
                  <span>High-interest markets</span>
                  <strong>Minot, Fargo, Bismarck</strong>
                </div>
              </div>

              <div className="investment-listings-hero__stats">
                <div>
                  <FiBarChart2 />
                  <strong>7.4%</strong>
                  <span>Example cap rate</span>
                </div>

                <div>
                  <FiHome />
                  <strong>Duplex</strong>
                  <span>Popular asset</span>
                </div>

                <div>
                  <FiShield />
                  <strong>AI</strong>
                  <span>ROI insights</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}