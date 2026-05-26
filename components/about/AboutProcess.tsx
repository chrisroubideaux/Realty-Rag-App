// components/about/AboutProcess.tsx

"use client";

import { motion } from "framer-motion";
import { FiCalendar, FiCheckCircle, FiHome, FiMessageCircle } from "react-icons/fi";

const steps = [
  {
    number: "01",
    title: "Browse by property type",
    text: "Explore homes, apartments, commercial spaces, land, luxury listings, and investment properties from focused category pages.",
    icon: <FiHome />,
  },
  {
    number: "02",
    title: "Compare listing details",
    text: "Use clean listing cards and detail pages to review price, location, property facts, highlights, and agent information.",
    icon: <FiCheckCircle />,
  },
  {
    number: "03",
    title: "Ask smarter questions",
    text: "The AI assistant flow will help users ask questions about listings, property documents, markets, and next steps.",
    icon: <FiMessageCircle />,
  },
  {
    number: "04",
    title: "Schedule or connect",
    text: "When ready, users can contact agents, request showings, and move from research into action.",
    icon: <FiCalendar />,
  },
];

export default function AboutProcess() {
  return (
    <section className="about-process section-padding">
      <div className="app-container">
        <div className="about-section-header about-section-header--center">
          <span className="brand-kicker">How it works</span>

          <h2>A modern real estate workflow from search to showing.</h2>

          <p>
            The experience is designed to guide users from browsing to decision
            making without making the interface feel cluttered.
          </p>
        </div>

        <div className="about-process__grid">
          {steps.map((step, index) => (
            <motion.article
              className="about-process-card"
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{
                duration: 0.48,
                delay: index * 0.06,
                ease: "easeOut",
              }}
            >
              <div className="about-process-card__top">
                <span>{step.number}</span>
                <div>{step.icon}</div>
              </div>

              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}