// components/properties/listings/ListingsToolbar.tsx
"use client";

import { motion } from "framer-motion";
import {
  FiFilter,
  FiGrid,
  FiList,
  FiSearch,
  FiSliders,
} from "react-icons/fi";

export default function ListingsToolbar() {
  return (
    <section className="listings-toolbar-section">
      <div className="app-container">
        <motion.div
          className="listings-toolbar"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="listings-toolbar__search">
            <FiSearch />
            <input
              type="search"
              placeholder="Search by city, address, neighborhood, or keyword..."
              aria-label="Search listings"
            />
          </div>

          <div className="listings-toolbar__controls">
            <button className="listings-toolbar__filter-btn" type="button">
              <FiSliders />
              Filters
            </button>

            <label className="listings-toolbar__sort">
              <span>Sort</span>
              <select defaultValue="featured" aria-label="Sort listings">
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="newest">Newest</option>
                <option value="sqft">Largest sqft</option>
              </select>
            </label>

            <div className="listings-toolbar__view-toggle" aria-label="View mode">
              <button
                className="listings-toolbar__view-btn listings-toolbar__view-btn--active"
                type="button"
                aria-label="Grid view"
              >
                <FiGrid />
              </button>

              <button
                className="listings-toolbar__view-btn"
                type="button"
                aria-label="List view"
              >
                <FiList />
              </button>
            </div>
          </div>

          <div className="listings-toolbar__summary">
            <FiFilter />
            <span>Showing 126 listings across Dakota markets</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}