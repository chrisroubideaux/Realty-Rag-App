// components/properties/listings/EmptyListingsState.tsx
"use client";

import { motion } from "framer-motion";
import {
  FiHome,
  FiRefreshCcw,
  FiSearch,
  FiSliders,
  FiSparkles,
} from "react-icons/fi";

type EmptyListingsStateProps = {
  title?: string;
  message?: string;
  onReset?: () => void;
};

export default function EmptyListingsState({
  title = "No listings found",
  message = "Try adjusting your search, clearing filters, or exploring another property category.",
  onReset,
}: EmptyListingsStateProps) {
  return (
    <motion.div
      className="empty-listings-state"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="empty-listings-state__visual">
        <div className="empty-listings-state__icon">
          <FiSearch />
        </div>

        <span className="empty-listings-state__orb empty-listings-state__orb--one">
          <FiHome />
        </span>

        <span className="empty-listings-state__orb empty-listings-state__orb--two">
          <FiSliders />
        </span>

        <span className="empty-listings-state__orb empty-listings-state__orb--three">
          <FiSparkles />
        </span>
      </div>

      <div className="empty-listings-state__content">
        <span className="brand-kicker">Search results</span>

        <h2>{title}</h2>

        <p>{message}</p>

        <div className="empty-listings-state__actions">
          <button type="button" onClick={onReset}>
            <FiRefreshCcw />
            Reset search
          </button>

          <button type="button" className="empty-listings-state__soft-btn">
            <FiSparkles />
            Ask AI for help
          </button>
        </div>
      </div>
    </motion.div>
  );
}