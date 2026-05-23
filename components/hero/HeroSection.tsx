"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowRight,
  FiHome,
  FiMapPin,
  FiSearch,
  
} from "react-icons/fi";

type HeroSlide = {
  id: number;
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  location: string;
  stat: string;
  gradient: string;
};

const slides: HeroSlide[] = [
  {
    id: 1,
    eyebrow: "AI-powered real estate search",
    title: "Find your next home with",
    highlight: "smarter property intelligence.",
    description:
      "Dakota Realty blends beautiful listings with AI-assisted search, local insights, and property Q&A built for modern buyers and sellers.",
    location: "Bismarck, North Dakota",
    stat: "120+ curated listings",
    gradient:
      "radial-gradient(circle at 20% 15%, rgba(255,255,255,.95), transparent 24rem), linear-gradient(135deg, #fff8f8 0%, #fa6781 45%, #9f314c 100%)",
  },
  {
    id: 2,
    eyebrow: "Ask questions before booking",
    title: "Explore listings using",
    highlight: "natural language search.",
    description:
      "Search by lifestyle, commute, budget, amenities, neighborhood feel, and listing details without digging through endless filters.",
    location: "Homes, condos, land, rentals",
    stat: "RAG-ready search",
    gradient:
      "radial-gradient(circle at 75% 20%, rgba(255,255,255,.9), transparent 22rem), linear-gradient(135deg, #fff4f6 0%, #ff9aac 42%, #c74363 100%)",
  },
  {
    id: 3,
    eyebrow: "Built for buyers, sellers, and agents",
    title: "A luxury real estate experience",
    highlight: "with AI at the center.",
    description:
      "Save homes, compare properties, request showings, and let the assistant answer questions from listing data and uploaded documents.",
    location: "Residential intelligence platform",
    stat: "Mobile-first experience",
    gradient:
      "radial-gradient(circle at 25% 75%, rgba(255,255,255,.9), transparent 24rem), linear-gradient(135deg, #fffafb 0%, #fa6781 48%, #7f253d 100%)",
  },
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSlide = slides[activeIndex];

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  const stats = useMemo(
    () => [
      { label: "AI search", value: "24/7" },
      { label: "Saved homes", value: "Smart" },
      { label: "Agent flow", value: "Ready" },
    ],
    []
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      nextSlide();
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="dakota-hero">
      <div className="app-container">
        <div className="row align-items-center g-4 g-xl-5">
          <div className="col-12 col-lg-6">
            <motion.div
              className="dakota-hero__content"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            >
              <div className="brand-kicker mb-3">
               
                {activeSlide.eyebrow}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                >
                  <h1 className="dakota-hero__title">
                    {activeSlide.title}{" "}
                    <span className="text-gradient">
                      {activeSlide.highlight}
                    </span>
                  </h1>

                  <p className="dakota-hero__description">
                    {activeSlide.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="dakota-hero__actions">
                <button className="btn-brand" type="button">
                  Start searching
                  <FiArrowRight />
                </button>

                <button className="btn-soft" type="button">
                  
                  Ask the AI assistant
                </button>
              </div>

              <div className="dakota-hero__stats">
                {stats.map((item) => (
                  <div className="dakota-hero__stat glass-card" key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="col-12 col-lg-6">
            <motion.div
              className="dakota-hero__visual-wrap"
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.75, ease: "easeOut", delay: 0.1 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide.id}
                  className="dakota-hero__visual"
                  style={{ background: activeSlide.gradient }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <div className="dakota-hero__visual-overlay" />

                  <div className="dakota-hero__property-card glass-card-strong">
                    <div className="dakota-hero__property-icon">
                      <FiHome />
                    </div>

                    <div>
                      <span>Featured market</span>
                      <strong>{activeSlide.location}</strong>
                    </div>
                  </div>

                  <div className="dakota-hero__floating-card glass-card">
                    <FiMapPin />
                    <div>
                      <span>Platform status</span>
                      <strong>{activeSlide.stat}</strong>
                    </div>
                  </div>

                  <div className="dakota-hero__slide-dots">
                    {slides.map((slide, index) => (
                      <button
                        key={slide.id}
                        type="button"
                        aria-label={`Show slide ${index + 1}`}
                        className={
                          index === activeIndex
                            ? "dakota-hero__dot dakota-hero__dot--active"
                            : "dakota-hero__dot"
                        }
                        onClick={() => setActiveIndex(index)}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              <motion.div
                className="dakota-hero__search glass-card-strong"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.35 }}
              >
                <div className="dakota-hero__search-icon">
                  <FiSearch />
                </div>

                <div className="dakota-hero__search-copy">
                  <span>Try asking</span>
                  <strong>
                    “Show me homes under $450k with a modern kitchen.”
                  </strong>
                </div>

                <button type="button" className="dakota-hero__search-btn">
                  Search
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dakota-hero {
          position: relative;
          min-height: calc(100vh - var(--navbar-height, 78px));
          display: flex;
          align-items: center;
          padding: 5.5rem 0 4rem;
          overflow: hidden;
        }

        .dakota-hero::before {
          content: "";
          position: absolute;
          width: 28rem;
          height: 28rem;
          top: 6%;
          right: -10rem;
          border-radius: 999px;
          background: rgba(250, 103, 129, 0.16);
          filter: blur(30px);
          z-index: -1;
        }

        .dakota-hero::after {
          content: "";
          position: absolute;
          width: 18rem;
          height: 18rem;
          left: -8rem;
          bottom: 8%;
          border-radius: 999px;
          background: rgba(255, 154, 172, 0.16);
          filter: blur(26px);
          z-index: -1;
        }

        .dakota-hero__content {
          max-width: 680px;
        }

        .dakota-hero__title {
          margin: 0;
          font-size: clamp(2.55rem, 6vw, 5.75rem);
          line-height: 0.95;
          letter-spacing: -0.07em;
          font-weight: 900;
          color: var(--text-main);
        }

        .dakota-hero__description {
          max-width: 610px;
          margin: 1.35rem 0 0;
          color: var(--text-muted);
          font-size: clamp(1rem, 2vw, 1.12rem);
          line-height: 1.8;
          font-weight: 500;
        }

        .dakota-hero__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.85rem;
          margin-top: 2rem;
        }

        .dakota-hero__stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.85rem;
          margin-top: 2rem;
          max-width: 560px;
        }

        .dakota-hero__stat {
          padding: 1rem;
          min-height: 92px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .dakota-hero__stat strong {
          font-size: 1.45rem;
          line-height: 1;
          color: var(--accent-deep);
        }

        .dakota-hero__stat span {
          margin-top: 0.4rem;
          color: var(--text-muted);
          font-size: 0.82rem;
          font-weight: 700;
        }

        .dakota-hero__visual-wrap {
          position: relative;
          width: 100%;
          max-width: 620px;
          margin-left: auto;
        }

        .dakota-hero__visual {
          position: relative;
          min-height: 620px;
          border-radius: 42px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.72);
          box-shadow: 0 30px 90px rgba(31, 31, 36, 0.16);
        }

        .dakota-hero__visual-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.18),
              rgba(255, 255, 255, 0.04)
            ),
            radial-gradient(
              circle at 50% 40%,
              transparent,
              rgba(31, 31, 36, 0.18)
            );
        }

        .dakota-hero__property-card {
          position: absolute;
          left: 1.5rem;
          top: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.9rem;
          padding: 1rem;
          width: min(82%, 320px);
        }

        .dakota-hero__property-icon,
        .dakota-hero__search-icon {
          width: 48px;
          height: 48px;
          flex: 0 0 48px;
          border-radius: 18px;
          display: grid;
          place-items: center;
          background: var(--gradient-brand);
          color: #fff;
          box-shadow: var(--shadow-brand);
          font-size: 1.25rem;
        }

        .dakota-hero__property-card span,
        .dakota-hero__floating-card span,
        .dakota-hero__search-copy span {
          display: block;
          color: var(--text-muted);
          font-size: 0.76rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.07em;
        }

        .dakota-hero__property-card strong,
        .dakota-hero__floating-card strong,
        .dakota-hero__search-copy strong {
          display: block;
          margin-top: 0.2rem;
          color: var(--text-main);
          font-size: 0.98rem;
          line-height: 1.25;
        }

        .dakota-hero__floating-card {
          position: absolute;
          right: 1.5rem;
          bottom: 6.5rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 1rem;
          width: min(78%, 280px);
        }

        .dakota-hero__floating-card svg {
          font-size: 1.45rem;
          color: var(--accent);
        }

        .dakota-hero__slide-dots {
          position: absolute;
          left: 50%;
          bottom: 1.4rem;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.5rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.28);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        .dakota-hero__dot {
          width: 0.7rem;
          height: 0.7rem;
          border: none;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.68);
          transition: width 0.2s ease, background 0.2s ease;
        }

        .dakota-hero__dot--active {
          width: 2rem;
          background: #fff;
        }

        .dakota-hero__search {
          position: absolute;
          left: 50%;
          bottom: -2.3rem;
          transform: translateX(-50%);
          width: min(calc(100% - 2rem), 520px);
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.95rem;
        }

        .dakota-hero__search-copy {
          flex: 1;
          min-width: 0;
        }

        .dakota-hero__search-btn {
          border: none;
          border-radius: 999px;
          padding: 0.8rem 1rem;
          background: var(--text-main);
          color: #fff;
          font-weight: 800;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .dakota-hero__search-btn:hover {
          transform: translateY(-2px);
          background: var(--accent-deep);
        }

        @media (max-width: 991px) {
          .dakota-hero {
            padding: 4.5rem 0 5rem;
            min-height: auto;
          }

          .dakota-hero__content {
            text-align: center;
            margin: 0 auto;
          }

          .dakota-hero__content :global(.brand-kicker) {
            margin-left: auto;
            margin-right: auto;
          }

          .dakota-hero__description {
            margin-left: auto;
            margin-right: auto;
          }

          .dakota-hero__actions {
            justify-content: center;
          }

          .dakota-hero__stats {
            margin-left: auto;
            margin-right: auto;
          }

          .dakota-hero__visual-wrap {
            margin: 1.5rem auto 0;
          }

          .dakota-hero__visual {
            min-height: 520px;
          }
        }

        @media (max-width: 768px) {
          .dakota-hero {
            padding-top: 3.25rem;
          }

          .dakota-hero__stats {
            grid-template-columns: 1fr;
          }

          .dakota-hero__stat {
            min-height: 76px;
            align-items: center;
            text-align: center;
          }

          .dakota-hero__visual {
            min-height: 480px;
            border-radius: 30px;
          }

          .dakota-hero__property-card,
          .dakota-hero__floating-card {
            left: 1rem;
            right: 1rem;
            width: auto;
          }

          .dakota-hero__floating-card {
            bottom: 5.8rem;
          }

          .dakota-hero__search {
            position: relative;
            left: auto;
            bottom: auto;
            transform: none;
            margin: -2rem auto 0;
            flex-direction: column;
            text-align: center;
          }

          .dakota-hero__search-btn {
            width: 100%;
            min-height: 46px;
          }
        }

        @media (max-width: 480px) {
          .dakota-hero__title {
            letter-spacing: -0.055em;
          }

          .dakota-hero__description {
            line-height: 1.7;
          }

          .dakota-hero__visual {
            min-height: 430px;
          }

          .dakota-hero__property-icon,
          .dakota-hero__search-icon {
            width: 44px;
            height: 44px;
            flex-basis: 44px;
          }

          .dakota-hero__property-card,
          .dakota-hero__floating-card {
            padding: 0.85rem;
          }
        }
      `}</style>
    </section>
  );
}