// components/about/AboutAiSection.tsx

"use client";

import { motion } from "framer-motion";
import {
  FiDatabase,
  FiMessageCircle,
  FiSearch,
  FiShield,
  FiZap,
} from "react-icons/fi";

export default function AboutAiSection() {
  return (
    <section className="about-ai">
      <div className="app-container">
        <div className="about-ai__grid">
          <motion.div
            className="about-ai__panel glass-card-strong"
            initial={{ opacity: 0, x: -26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="about-ai__visual">
              <div className="about-ai__visual-glow" />

              <div className="about-ai__node about-ai__node--one">
                <FiSearch />
                <span>Listing search</span>
              </div>

              <div className="about-ai__node about-ai__node--two">
                <FiDatabase />
                <span>Property data</span>
              </div>

              <div className="about-ai__node about-ai__node--three">
                <FiMessageCircle />
                <span>Ask AI</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about-ai__content"
            initial={{ opacity: 0, x: 26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          >
            <span className="brand-kicker">
              <FiZap />
              AI-ready platform
            </span>

            <h2>Built for property search today and RAG intelligence later.</h2>

            <p>
              Dakota Realty AI is being structured so listings, agents,
              documents, property notes, and market data can eventually work
              with a RAG-powered assistant. The goal is simple: ask better
              questions and get clearer answers about the properties you care
              about.
            </p>

            <div className="about-ai__features">
              <div>
                <FiSearch />
                <span>Natural-language property search</span>
              </div>

              <div>
                <FiDatabase />
                <span>Future listing and document retrieval</span>
              </div>

              <div>
                <FiShield />
                <span>Clearer context before showings or offers</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}