// components/agents/AgentSpotlight.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiAward,
  FiBriefcase,
  FiHome,
  FiMail,
  FiMapPin,
  FiPhone,
  FiStar,
  FiUserCheck,
} from "react-icons/fi";

type Agent = {
  id: string;
  name: string;
  title: string;
  location: string;
  specialty: string;
  sales: string;
  rating: string;
  phone: string;
  email: string;
  gradient: string;
};

const agents: Agent[] = [
  {
    id: "agent-001",
    name: "Ava Reynolds",
    title: "Senior Residential Agent",
    location: "Bismarck, ND",
    specialty: "Single-family homes",
    sales: "$18M+",
    rating: "4.9",
    phone: "(701) 555-0148",
    email: "ava@dakotarealty.ai",
    gradient:
      "linear-gradient(135deg, rgba(250,103,129,0.92), rgba(255,154,172,0.72))",
  },
  {
    id: "agent-002",
    name: "Marcus Hale",
    title: "Commercial Property Advisor",
    location: "Mandan, ND",
    specialty: "Retail & office spaces",
    sales: "$24M+",
    rating: "5.0",
    phone: "(701) 555-0194",
    email: "marcus@dakotarealty.ai",
    gradient:
      "linear-gradient(135deg, rgba(31,31,36,0.9), rgba(250,103,129,0.72))",
  },
  {
    id: "agent-003",
    name: "Sofia Bennett",
    title: "Luxury Listing Specialist",
    location: "Fargo, ND",
    specialty: "Luxury homes & condos",
    sales: "$31M+",
    rating: "4.9",
    phone: "(701) 555-0182",
    email: "sofia@dakotarealty.ai",
    gradient:
      "linear-gradient(135deg, rgba(184,80,116,0.92), rgba(250,103,129,0.7))",
  },
  {
    id: "agent-004",
    name: "Noah Carter",
    title: "Land & Investment Agent",
    location: "Lincoln, ND",
    specialty: "Land, lots & investment",
    sales: "$15M+",
    rating: "4.8",
    phone: "(701) 555-0127",
    email: "noah@dakotarealty.ai",
    gradient:
      "linear-gradient(135deg, rgba(255,250,247,0.95), rgba(250,103,129,0.62))",
  },
];

export default function AgentSpotlight() {
  return (
    <section className="agent-spotlight section-padding">
      <div className="app-container">
        <div className="agent-spotlight__header">
          <div>
            <span className="brand-kicker">
              <FiUserCheck />
              Local experts
            </span>

            <h2>Work with agents who understand your next move.</h2>
          </div>

          <p>
            Static agent cards for now. Later, this section can fetch featured
            agents from your API and show live specialties, regions, and contact
            details.
          </p>
        </div>

        <div className="agent-spotlight__grid">
          {agents.map((agent, index) => (
            <motion.article
              className="agent-card"
              key={agent.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{
                duration: 0.5,
                delay: index * 0.07,
                ease: "easeOut",
              }}
            >
              <div className="agent-card__top">
                <div
                  className="agent-card__avatar"
                  style={{ background: agent.gradient }}
                >
                  <span>{getInitials(agent.name)}</span>
                </div>

                <div className="agent-card__badge">
                  <FiStar />
                  {agent.rating}
                </div>
              </div>

              <div className="agent-card__body">
                <h3>{agent.name}</h3>
                <span className="agent-card__title">{agent.title}</span>

                <div className="agent-card__location">
                  <FiMapPin />
                  <span>{agent.location}</span>
                </div>

                <div className="agent-card__meta">
                  <div>
                    <FiBriefcase />
                    <span>{agent.specialty}</span>
                  </div>

                  <div>
                    <FiAward />
                    <span>{agent.sales} closed</span>
                  </div>
                </div>

                <div className="agent-card__contact">
                  <a href={`tel:${agent.phone}`}>
                    <FiPhone />
                    <span>{agent.phone}</span>
                  </a>

                  <a href={`mailto:${agent.email}`}>
                    <FiMail />
                    <span>Email agent</span>
                  </a>
                </div>
              </div>

              <div className="agent-card__footer">
                <Link href={`/agents/${agent.id}`}>
                  View profile
                  <FiArrowRight />
                </Link>

                <Link href={`/showings?agent=${agent.id}`}>
                  Schedule
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}