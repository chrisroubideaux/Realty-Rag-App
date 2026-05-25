// componnents/misc/AiSearchPreview.tsx
"use client";

import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiCheckCircle,
  FiCommand,
  FiHome,
  FiMessageCircle,
  FiSearch,
  FiZap,
} from "react-icons/fi";

const examplePrompts = [
  "Find homes under $450k with a fenced yard.",
  "Compare condos near downtown Fargo.",
  "Show me commercial spaces with parking.",
  "Which listings are best for first-time buyers?",
];

const aiFeatures = [
  "Ask questions in plain English",
  "Compare listings before touring",
  "Understand property details faster",
];

export default function AiSearchPreview() {
  return (
    <section className="ai-search-preview section-padding">
      <div className="app-container">
        <div className="ai-search-preview__grid">
          <motion.div
            className="ai-search-preview__content"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <span className="brand-kicker">
              <FiZap />
              AI property search
            </span>

            <h2>
              Search real estate by lifestyle, budget, location, and questions.
            </h2>

            <p>
              Instead of digging through endless filters, ask the assistant what
              you actually care about. Later this section will connect directly
              to your RAG search API.
            </p>

            <div className="ai-search-preview__features">
              {aiFeatures.map((feature) => (
                <div key={feature} className="ai-search-preview__feature">
                  <FiCheckCircle />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <button className="btn-brand ai-search-preview__cta" type="button">
              Try AI search
              <FiArrowRight />
            </button>
          </motion.div>

          <motion.div
            className="ai-search-preview__panel glass-card-strong"
            initial={{ opacity: 0, scale: 0.96, y: 26 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.08 }}
          >
            <div className="ai-search-preview__panel-header">
              <div className="ai-search-preview__assistant">
                <span>
                  <FiMessageCircle />
                </span>

                <div>
                  <strong>Dakota Realty Assistant</strong>
                  <small>RAG-ready property intelligence</small>
                </div>
              </div>

              <div className="ai-search-preview__status">
                <span />
                Online
              </div>
            </div>

            <div className="ai-search-preview__search-box">
              <FiSearch />

              <div>
                <span>Ask anything about listings</span>
                <strong>
                  “Find homes near good schools with room for a home office.”
                </strong>
              </div>

              <button type="button" aria-label="Submit AI search">
                <FiArrowRight />
              </button>
            </div>

            <div className="ai-search-preview__prompts">
              {examplePrompts.map((prompt, index) => (
                <motion.button
                  key={prompt}
                  type="button"
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: 0.18 + index * 0.07,
                    ease: "easeOut",
                  }}
                >
                  <FiCommand />
                  <span>{prompt}</span>
                </motion.button>
              ))}
            </div>

            <div className="ai-search-preview__mini-results">
              <div className="ai-search-preview__mini-card">
                <span className="ai-search-preview__mini-icon">
                  <FiHome />
                </span>

                <div>
                  <strong>3 strong matches found</strong>
                  <small>Homes with updated kitchens, yard space, and value.</small>
                </div>
              </div>

              <div className="ai-search-preview__confidence">
                <span>Match confidence</span>
                <strong>92%</strong>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}