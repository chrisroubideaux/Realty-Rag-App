// components/misc/Testimonials.tsx
"use client";

import { motion } from "framer-motion";
import { FiHome, FiMessageCircle, FiStar } from "react-icons/fi";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  location: string;
  rating: number;
  gradient: string;
};

const testimonials: Testimonial[] = [
  {
    id: "testimonial-001",
    name: "Maya Thompson",
    role: "First-time buyer",
    location: "Bismarck, ND",
    rating: 5,
    quote:
      "Dakota Realty made the search feel less overwhelming. I could compare homes quickly and understand what actually mattered before scheduling a showing.",
    gradient:
      "linear-gradient(135deg, rgba(250,103,129,0.9), rgba(255,154,172,0.68))",
  },
  {
    id: "testimonial-002",
    name: "Ethan Brooks",
    role: "Property investor",
    location: "Fargo, ND",
    rating: 5,
    quote:
      "The AI-assisted search preview is exactly where real estate is going. It helped me think through value, location, and long-term upside faster.",
    gradient:
      "linear-gradient(135deg, rgba(31,31,36,0.88), rgba(250,103,129,0.72))",
  },
  {
    id: "testimonial-003",
    name: "Lauren Mitchell",
    role: "Home seller",
    location: "Mandan, ND",
    rating: 5,
    quote:
      "The experience feels polished and modern. It gives buyers a better way to explore listings, which makes the whole selling process feel smarter.",
    gradient:
      "linear-gradient(135deg, rgba(255,250,247,0.95), rgba(250,103,129,0.58))",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials-section section-padding">
      <div className="app-container">
        <div className="testimonials-section__header">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <span className="brand-kicker">
              <FiMessageCircle />
              Client stories
            </span>

            <h2>
              A smarter real estate experience built around trust, clarity, and
              better decisions.
            </h2>

            <p>
              Static testimonials for now — later these can come from your API,
              admin dashboard, or approved client reviews.
            </p>
          </motion.div>
        </div>

        <div className="testimonials-section__grid">
          {testimonials.map((testimonial, index) => (
            <motion.article
              className="testimonial-card"
              key={testimonial.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: "easeOut",
              }}
            >
              <div
                className="testimonial-card__avatar"
                style={{ background: testimonial.gradient }}
              >
                <FiHome />
              </div>

              <div className="testimonial-card__stars">
                {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                  <FiStar key={starIndex} />
                ))}
              </div>

              <p className="testimonial-card__quote">
                “{testimonial.quote}”
              </p>

              <div className="testimonial-card__footer">
                <div>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </div>

                <small>{testimonial.location}</small>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}