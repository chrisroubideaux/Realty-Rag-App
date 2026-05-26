// components/about/AboutHero.tsx

"use client";

import { motion } from "framer-motion";
import {
  FiHome,
  FiMapPin,
  FiSearch,
  FiShield,
  FiStar,
  FiTrendingUp,
} from "react-icons/fi";

export default function AboutHero() {
  return (
    <section className="about-hero">
      <div className="app-container">
        <div className="about-hero__grid">
          <motion.div
            className="about-hero__content"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <span className="brand-kicker">
              <FiStar />
              About Dakota Realty AI
            </span>

            <h1>
              Real estate search built with{" "}
              <span className="text-gradient">clarity, trust, and AI.</span>
            </h1>

            <p>
              Dakota Realty AI is designed to help buyers, renters, sellers,
              agents, and investors explore properties with cleaner data,
              smarter comparisons, and a modern search experience.
            </p>

            <div className="about-hero__search glass-card-strong">
              <div className="about-hero__search-icon">
                <FiSearch />
              </div>

              <div>
                <span>Platform focus</span>
                <strong>
                  Search properties, compare details, and ask AI questions before
                  making your next move.
                </strong>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about-hero__panel glass-card-strong"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <div className="about-hero__visual">
              <div className="about-hero__visual-glow" />

              <div className="about-hero__floating about-hero__floating--top">
                <FiHome />
                <div>
                  <span>Property types</span>
                  <strong>Homes, rentals, land, luxury, commercial</strong>
                </div>
              </div>

              <div className="about-hero__floating about-hero__floating--middle">
                <FiMapPin />
                <div>
                  <span>Local focus</span>
                  <strong>Dakota markets and neighborhood insights</strong>
                </div>
              </div>

              <div className="about-hero__stats">
                <div>
                  <FiTrendingUp />
                  <strong>AI</strong>
                  <span>Search intelligence</span>
                </div>

                <div>
                  <FiShield />
                  <strong>Trust</strong>
                  <span>Clear property flow</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}