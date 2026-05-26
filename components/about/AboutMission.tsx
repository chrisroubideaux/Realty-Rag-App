// components/about/AboutMission.tsx

"use client";

import { motion } from "framer-motion";
import { FiCompass, FiHome, FiMap, FiUsers } from "react-icons/fi";

const missionCards = [
  {
    title: "Make real estate easier to understand",
    text: "Listings can feel overwhelming. Our goal is to organize property details, agent information, and search tools into a cleaner experience.",
    icon: <FiCompass />,
  },
  {
    title: "Support every property journey",
    text: "Whether someone is buying a home, renting an apartment, reviewing commercial space, or evaluating land, the interface should feel clear.",
    icon: <FiHome />,
  },
  {
    title: "Keep local expertise at the center",
    text: "AI helps speed up research, but agents and local market knowledge still matter. Dakota Realty AI is built around both.",
    icon: <FiUsers />,
  },
  {
    title: "Prepare for smarter property data",
    text: "The platform is being designed to support APIs, listing data, RAG search, and property-specific AI answers later.",
    icon: <FiMap />,
  },
];

export default function AboutMission() {
  return (
    <section className="about-mission section-padding">
      <div className="app-container">
        <div className="about-section-header">
          <span className="brand-kicker">
            <FiCompass />
            Our mission
          </span>

          <h2>Build a cleaner bridge between people and property decisions.</h2>

          <p>
            The app is designed to feel modern and easy to use while preparing
            for more advanced property intelligence behind the scenes.
          </p>
        </div>

        <div className="about-mission__grid">
          {missionCards.map((card, index) => (
            <motion.article
              className="about-mission-card glass-card-strong"
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.48,
                delay: index * 0.06,
                ease: "easeOut",
              }}
            >
              <div className="about-mission-card__icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}