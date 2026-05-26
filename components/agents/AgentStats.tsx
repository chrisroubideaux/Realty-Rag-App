// components/agents/details/AgentStats.tsx

"use client";

import { motion } from "framer-motion";
import { FiAward, FiBriefcase, FiHome, FiStar } from "react-icons/fi";

type AgentStatsProps = {
  sales: string;
  rating: string;
  specialty: string;
  activeListings: number;
};

export default function AgentStats({
  sales,
  rating,
  specialty,
  activeListings,
}: AgentStatsProps) {
  const stats = [
    {
      label: "Closed volume",
      value: sales,
      icon: <FiAward />,
    },
    {
      label: "Client rating",
      value: rating,
      icon: <FiStar />,
    },
    {
      label: "Specialty",
      value: specialty,
      icon: <FiBriefcase />,
    },
    {
      label: "Active listings",
      value: activeListings,
      icon: <FiHome />,
    },
  ];

  return (
    <section className="agent-stats">
      <div className="agent-stats__grid">
        {stats.map((stat, index) => (
          <motion.div
            className="agent-stats__card glass-card-strong"
            key={stat.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{
              duration: 0.45,
              delay: index * 0.06,
              ease: "easeOut",
            }}
          >
            <div>{stat.icon}</div>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </motion.div>
        ))}
      </div>
    </section>
  );
}