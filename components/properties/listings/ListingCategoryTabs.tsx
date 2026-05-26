// components/properties/listings/ListingCategoryTabs.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiGrid,
  FiHome,
  FiLayers,
  FiMap,
  FiStar,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

type CategoryTab = {
  label: string;
  href: string;
  count: string;
  icon: React.ReactNode;
  isActive?: boolean;
};

const categoryTabs: CategoryTab[] = [
  {
    label: "All",
    href: "/listings",
    count: "126",
    icon: <FiGrid />,
    isActive: true,
  },
  {
    label: "Homes",
    href: "/listings/homes",
    count: "48",
    icon: <FiHome />,
  },
  {
    label: "Apartments",
    href: "/listings/apartments",
    count: "26",
    icon: <FiLayers />,
  },
  {
    label: "Commercial",
    href: "/listings/commercial",
    count: "14",
    icon: <FiBriefcase />,
  },
  {
    label: "Land",
    href: "/listings/land",
    count: "19",
    icon: <FiMap />,
  },
  {
    label: "Luxury",
    href: "/listings?type=luxury",
    count: "9",
    icon: <FiStar />,
  },
  {
    label: "Investment",
    href: "/listings?type=investment",
    count: "11",
    icon: <FiTrendingUp />,
  },
  {
    label: "Multi-family",
    href: "/listings?type=multi-family",
    count: "7",
    icon: <FiUsers />,
  },
];

export default function ListingCategoryTabs() {
  return (
    <section className="listing-category-tabs">
      <div className="app-container">
        <motion.div
          className="listing-category-tabs__shell"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="listing-category-tabs__header">
            <span>Browse by type</span>
            <strong>Choose a category</strong>
          </div>

          <div className="listing-category-tabs__scroller">
            {categoryTabs.map((tab) => (
              <Link
                href={tab.href}
                key={tab.label}
                className={
                  tab.isActive
                    ? "listing-category-tab listing-category-tab--active"
                    : "listing-category-tab"
                }
              >
                <span className="listing-category-tab__icon">{tab.icon}</span>

                <span className="listing-category-tab__copy">
                  <strong>{tab.label}</strong>
                  <small>{tab.count} listings</small>
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}