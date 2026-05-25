// components/properties/PropertyCategories.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiBriefcase,
  FiGrid,
  FiHome,
  FiLayers,
  FiMap,
  FiMaximize2,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

type PropertyCategory = {
  id: string;
  title: string;
  description: string;
  count: string;
  href: string;
  icon: React.ReactNode;
  gradient: string;
};

const propertyCategories: PropertyCategory[] = [
  {
    id: "homes",
    title: "Homes",
    description: "Single-family homes built for space, comfort, and long-term value.",
    count: "48 listings",
    href: "/listings?type=home",
    icon: <FiHome />,
    gradient:
      "linear-gradient(135deg, rgba(250,103,129,0.9), rgba(255,154,172,0.7))",
  },
  {
    id: "apartments",
    title: "Apartments",
    description: "Modern rentals and city apartments close to work, dining, and lifestyle spots.",
    count: "26 listings",
    href: "/listings?type=apartment",
    icon: <FiLayers />,
    gradient:
      "linear-gradient(135deg, rgba(184,80,116,0.92), rgba(250,103,129,0.7))",
  },
  {
    id: "commercial",
    title: "Commercial",
    description: "Retail, office, and mixed-use properties for growing businesses.",
    count: "14 listings",
    href: "/listings?type=commercial",
    icon: <FiBriefcase />,
    gradient:
      "linear-gradient(135deg, rgba(31,31,36,0.9), rgba(250,103,129,0.72))",
  },
  {
    id: "land",
    title: "Land",
    description: "Build-ready lots, acreage, and development opportunities.",
    count: "19 listings",
    href: "/listings?type=land",
    icon: <FiMap />,
    gradient:
      "linear-gradient(135deg, rgba(255,250,247,0.95), rgba(250,103,129,0.62))",
  },
  {
    id: "luxury",
    title: "Luxury",
    description: "Premium properties with elevated finishes, privacy, and standout design.",
    count: "9 listings",
    href: "/listings?type=luxury",
    icon: <FiTrendingUp />,
    gradient:
      "linear-gradient(135deg, rgba(250,103,129,0.82), rgba(127,37,61,0.86))",
  },
  {
    id: "multi-family",
    title: "Multi-family",
    description: "Duplexes, small apartment buildings, and income-focused investments.",
    count: "11 listings",
    href: "/listings?type=multi-family",
    icon: <FiUsers />,
    gradient:
      "linear-gradient(135deg, rgba(255,154,172,0.82), rgba(184,49,82,0.78))",
  },
];

export default function PropertyCategories() {
  return (
    <section className="property-categories section-padding">
      <div className="app-container">
        <div className="property-categories__header">
          <div>
            <span className="brand-kicker">
              <FiGrid />
              Property categories
            </span>

            <h2>Browse by property type and find the right fit faster.</h2>
          </div>

          <p>
            These categories are static for now. Later, each card can show live
            listing counts from your backend API.
          </p>
        </div>

        <div className="property-categories__grid">
          {propertyCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.06,
                ease: "easeOut",
              }}
            >
              <Link href={category.href} className="property-category-card">
                <div
                  className="property-category-card__icon"
                  style={{ background: category.gradient }}
                >
                  {category.icon}
                </div>

                <div className="property-category-card__content">
                  <div>
                    <h3>{category.title}</h3>
                    <p>{category.description}</p>
                  </div>

                  <div className="property-category-card__footer">
                    <span>{category.count}</span>

                    <strong>
                      Explore
                      <FiArrowRight />
                    </strong>
                  </div>
                </div>

                <div className="property-category-card__orb" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}