// components/properties/listings/HomeListingsHero.tsx

"use client";

import { motion } from "framer-motion";
import {
  FiHome,
  FiMapPin,
  FiSearch,
  FiShield,
  FiStar,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

export default function HomeListingsHero() {
  return (
    <section className="home-listings-hero">
      <div className="app-container">
        <div className="home-listings-hero__grid">
          <motion.div
            className="home-listings-hero__content"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <span className="brand-kicker">
              <FiHome />
              Homes for sale
            </span>

            <h1>
              Find family homes with{" "}
              <span className="text-gradient">room to grow.</span>
            </h1>

            <p>
              Browse single-family homes, luxury houses, townhomes, and
              investment-ready residential properties with clean search tools
              and AI-ready listing intelligence.
            </p>

            <div className="home-listings-hero__search glass-card-strong">
              <div className="home-listings-hero__search-icon">
                <FiSearch />
              </div>

              <div>
                <span>Try searching</span>
                <strong>
                  “Homes under $500k with a fenced yard and finished basement”
                </strong>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="home-listings-hero__panel glass-card-strong"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <div className="home-listings-hero__visual">
              <div className="home-listings-hero__visual-glow" />

              <div className="home-listings-hero__floating home-listings-hero__floating--top">
                <FiHome />
                <div>
                  <span>Residential inventory</span>
                  <strong>48 available homes</strong>
                </div>
              </div>

              <div className="home-listings-hero__floating home-listings-hero__floating--middle">
                <FiMapPin />
                <div>
                  <span>Popular markets</span>
                  <strong>Bismarck, Mandan, Fargo</strong>
                </div>
              </div>

              <div className="home-listings-hero__stats">
                <div>
                  <FiTrendingUp />
                  <strong>$485K</strong>
                  <span>Avg. home price</span>
                </div>

                <div>
                  <FiUsers />
                  <strong>4 Bed</strong>
                  <span>Popular layout</span>
                </div>

                <div>
                  <FiShield />
                  <strong>AI</strong>
                  <span>Buyer matching</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}