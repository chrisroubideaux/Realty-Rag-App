// components/properties/listings/ListingsHero.tsx
// components/properties/listings/ListingsHero.tsx

"use client";

import { motion } from "framer-motion";
import {
  FiBarChart2,
  FiHome,
  FiMapPin,
  FiSearch,
  FiShield,
  FiStar,
} from "react-icons/fi";

export default function ListingsHero() {
  return (
    <section className="listings-hero">
      <div className="app-container">
        <div className="listings-hero__grid">
          <motion.div
            className="listings-hero__content"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <span className="brand-kicker">
              <FiStar />
              Smart property search
            </span>

            <h1>
              Browse Dakota listings with{" "}
              <span className="text-gradient">AI-powered clarity.</span>
            </h1>

            <p>
              Explore homes, apartments, commercial spaces, land, rentals, and
              investment opportunities from one clean listing experience.
            </p>

            <div className="listings-hero__search glass-card-strong">
              <div className="listings-hero__search-icon">
                <FiSearch />
              </div>

              <div>
                <span>Try searching</span>
                <strong>
                  “Homes under $450k with a finished basement in Bismarck”
                </strong>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="listings-hero__panel glass-card-strong"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <div className="listings-hero__visual">
              <div className="listings-hero__visual-glow" />

              <div className="listings-hero__floating-card listings-hero__floating-card--top">
                <FiHome />
                <div>
                  <span>Inventory</span>
                  <strong>126 active listings</strong>
                </div>
              </div>

              <div className="listings-hero__floating-card listings-hero__floating-card--middle">
                <FiMapPin />
                <div>
                  <span>Markets</span>
                  <strong>Bismarck, Fargo, Mandan</strong>
                </div>
              </div>

              <div className="listings-hero__stats">
                <div>
                  <FiBarChart2 />
                  <strong>$342K</strong>
                  <span>Median price</span>
                </div>

                <div>
                  <FiShield />
                  <strong>AI</strong>
                  <span>RAG-ready</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}