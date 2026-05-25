// componeents/properties/MarketInsights.tsx
"use client";

import { motion } from "framer-motion";
import {
  FiActivity,
  FiArrowRight,
  FiBarChart2,
  FiClock,
  FiHome,
  FiMapPin,
  FiStar,
  FiTrendingUp,
} from "react-icons/fi";

type MarketStat = {
  id: string;
  label: string;
  value: string;
  detail: string;
  icon: React.ReactNode;
};

const marketStats: MarketStat[] = [
  {
    id: "median-price",
    label: "Median price",
    value: "$342K",
    detail: "+4.8% from last quarter",
    icon: <FiTrendingUp />,
  },
  {
    id: "active-listings",
    label: "Active listings",
    value: "126",
    detail: "Across featured Dakota markets",
    icon: <FiHome />,
  },
  {
    id: "days-market",
    label: "Avg. days on market",
    value: "31",
    detail: "Move-in-ready homes are moving faster",
    icon: <FiClock />,
  },
  {
    id: "buyer-demand",
    label: "Buyer demand",
    value: "High",
    detail: "Strongest under $450K",
    icon: <FiActivity />,
  },
];

const neighborhoodTrends = [
  {
    area: "Bismarck",
    trend: "Family homes",
    value: "+6.2%",
  },
  {
    area: "Mandan",
    trend: "Commercial leases",
    value: "+3.9%",
  },
  {
    area: "Fargo",
    trend: "Apartments",
    value: "+7.4%",
  },
];

export default function MarketInsights() {
  return (
    <section className="market-insights section-padding">
      <div className="app-container">
        <div className="market-insights__header">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <span className="brand-kicker">
              <FiBarChart2 />
              Market insights
            </span>

            <h2>Understand the market before you make your next move.</h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
          >
            Static insight cards for now. Later, this section can pull live
            listing data, neighborhood trends, and AI-generated market summaries.
          </motion.p>
        </div>

        <div className="market-insights__grid">
          <motion.div
            className="market-insights__stats"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            {marketStats.map((stat, index) => (
              <motion.article
                className="market-stat-card"
                key={stat.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.06,
                  ease: "easeOut",
                }}
              >
                <div className="market-stat-card__icon">{stat.icon}</div>

                <div>
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                  <p>{stat.detail}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <motion.div
            className="market-insights__ai-card glass-card-strong"
            initial={{ opacity: 0, scale: 0.96, y: 26 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
          >
            <div className="market-insights__ai-top">
              <div className="market-insights__ai-icon">
                <FiStar />
              </div>

              <div>
                <span>AI market summary</span>
                <strong>Dakota buyer activity is strongest in mid-range homes.</strong>
              </div>
            </div>

            <p>
              Buyers are showing the most interest in homes between $280K and
              $450K, especially properties with updated kitchens, finished
              basements, garage space, and flexible rooms for remote work.
            </p>

            <div className="market-insights__trend-list">
              {neighborhoodTrends.map((item) => (
                <div className="market-insights__trend" key={item.area}>
                  <div>
                    <FiMapPin />
                    <span>{item.area}</span>
                  </div>

                  <strong>{item.trend}</strong>

                  <small>{item.value}</small>
                </div>
              ))}
            </div>

            <button className="market-insights__button" type="button">
              View full market report
              <FiArrowRight />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}