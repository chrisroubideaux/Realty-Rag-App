// components/about/AboutValues.tsx

"use client";

import { motion } from "framer-motion";
import { FiEye, FiHeart, FiMapPin, FiShield } from "react-icons/fi";

const values = [
  {
    title: "Clarity",
    text: "Every page should help users understand what they are looking at quickly.",
    icon: <FiEye />,
  },
  {
    title: "Trust",
    text: "Property information should be easy to verify, compare, and discuss with an agent.",
    icon: <FiShield />,
  },
  {
    title: "Local context",
    text: "Real estate is local. The app is shaped around markets, neighborhoods, and practical next steps.",
    icon: <FiMapPin />,
  },
  {
    title: "Human-first AI",
    text: "AI should support better decisions, not replace the human side of real estate.",
    icon: <FiHeart />,
  },
];

export default function AboutValues() {
  return (
    <section className="about-values section-padding">
      <div className="app-container">
        <div className="about-values__shell glass-card-strong">
          <div className="about-values__header">
            <span className="brand-kicker">What guides the platform</span>

            <h2>Technology should make the process feel less confusing.</h2>

            <p>
              Dakota Realty AI is built around clean design, local expertise,
              and practical AI tools that help people move with more confidence.
            </p>
          </div>

          <div className="about-values__grid">
            {values.map((value, index) => (
              <motion.article
                className="about-value-card"
                key={value.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.06,
                  ease: "easeOut",
                }}
              >
                <div>{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}