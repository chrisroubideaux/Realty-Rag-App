// components/properties/listings/LandListingsHero.tsx

"use client";

import { motion } from "framer-motion";
import {
  FiMap,
  FiMapPin,
  FiSearch,
  FiShield,
  FiStar,
  FiTrendingUp,
  FiTool,
} from "react-icons/fi";

export default function LandListingsHero() {
  return (
    <section className="land-listings-hero">
      <div className="app-container">
        <div className="land-listings-hero__grid">
          <motion.div
            className="land-listings-hero__content"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <span className="brand-kicker">
              <FiMap />
              Land & development
            </span>

            <h1>
              Find land with{" "}
              <span className="text-gradient">room for what comes next.</span>
            </h1>

            <p>
              Browse residential lots, acreage, build-ready parcels, development
              land, and long-term investment opportunities across Dakota
              markets.
            </p>

            <div className="land-listings-hero__search glass-card-strong">
              <div className="land-listings-hero__search-icon">
                <FiSearch />
              </div>

              <div>
                <span>Try searching</span>
                <strong>
                  “Build-ready land near Bismarck with utilities nearby”
                </strong>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="land-listings-hero__panel glass-card-strong"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <div className="land-listings-hero__visual">
              <div className="land-listings-hero__visual-glow" />

              <div className="land-listings-hero__floating land-listings-hero__floating--top">
                <FiMap />
                <div>
                  <span>Land inventory</span>
                  <strong>19 active parcels</strong>
                </div>
              </div>

              <div className="land-listings-hero__floating land-listings-hero__floating--middle">
                <FiMapPin />
                <div>
                  <span>Growth areas</span>
                  <strong>Lincoln, Mandan, Bismarck</strong>
                </div>
              </div>

              <div className="land-listings-hero__stats">
                <div>
                  <FiTrendingUp />
                  <strong>1.8</strong>
                  <span>Avg. acres</span>
                </div>

                <div>
                  <FiTool />
                  <strong>Build</strong>
                  <span>Top use case</span>
                </div>

                <div>
                  <FiShield />
                  <strong>AI</strong>
                  <span>Site insights</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}