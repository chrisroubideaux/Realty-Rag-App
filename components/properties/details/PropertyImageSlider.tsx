// components/properties/details/PropertyImageSlider.tsx
"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowRight,
  FiImage,
  FiMaximize2,
} from "react-icons/fi";

type PropertyImageSliderProps = {
  title: string;
  tag?: string;
  gradient: string;
  propertyTypeLabel: string;
};

type Slide = {
  id: string;
  label: string;
  gradient: string;
};

export default function PropertyImageSlider({
  title,
  tag,
  gradient,
  propertyTypeLabel,
}: PropertyImageSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = useMemo<Slide[]>(
    () => [
      {
        id: "main",
        label: "Main view",
        gradient,
      },
      {
        id: "interior",
        label: "Interior preview",
        gradient:
          "linear-gradient(135deg, rgba(255,250,247,0.94), rgba(250,103,129,0.72)), radial-gradient(circle at 25% 25%, rgba(255,255,255,.95), transparent 16rem)",
      },
      {
        id: "neighborhood",
        label: "Neighborhood",
        gradient:
          "linear-gradient(135deg, rgba(31,31,36,0.84), rgba(250,103,129,0.76)), radial-gradient(circle at 70% 20%, rgba(255,255,255,.82), transparent 16rem)",
      },
      {
        id: "details",
        label: "Property details",
        gradient:
          "linear-gradient(135deg, rgba(184,80,116,0.9), rgba(255,154,172,0.76)), radial-gradient(circle at 30% 75%, rgba(255,255,255,.82), transparent 16rem)",
      },
    ],
    [gradient]
  );

  const activeSlide = slides[activeIndex];

  const goPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? slides.length - 1 : current - 1
    );
  };

  const goNext = () => {
    setActiveIndex((current) =>
      current === slides.length - 1 ? 0 : current + 1
    );
  };

  return (
    <div className="property-slider">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide.id}
          className="property-slider__media"
          style={{ background: activeSlide.gradient }}
          initial={{ opacity: 0, scale: 1.025 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.985 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="property-slider__media-glow" />

          <div className="property-slider__topbar">
            {tag && <span className="property-slider__tag">{tag}</span>}

            <span className="property-slider__type">
              <FiImage />
              {propertyTypeLabel}
            </span>
          </div>

          <div className="property-slider__caption glass-card">
            <span>{activeSlide.label}</span>
            <strong>{title}</strong>
          </div>

          <button
            className="property-slider__expand"
            type="button"
            aria-label="Expand gallery"
          >
            <FiMaximize2 />
          </button>

          <div className="property-slider__controls">
            <button type="button" onClick={goPrevious} aria-label="Previous image">
              <FiArrowLeft />
            </button>

            <div className="property-slider__dots">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Show ${slide.label}`}
                  className={
                    index === activeIndex
                      ? "property-slider__dot property-slider__dot--active"
                      : "property-slider__dot"
                  }
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>

            <button type="button" onClick={goNext} aria-label="Next image">
              <FiArrowRight />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}