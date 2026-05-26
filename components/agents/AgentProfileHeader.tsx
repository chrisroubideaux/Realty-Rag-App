// components/agents/AgentProfileHeader.tsx

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiAward,
  FiCalendar,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiStar,
} from "react-icons/fi";
import AgentAvatar from "./AgentAvatar";

type AgentProfileHeaderProps = {
  agent: {
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
    backgroundGradient: string;
  };
};

export default function AgentProfileHeader({ agent }: AgentProfileHeaderProps) {
  return (
    <section className="agent-profile-header">
      <div className="app-container">
        <div className="agent-profile-header__topbar">
          <Link href="/agents" className="agent-profile-header__back">
            <FiArrowLeft />
            Back to agents
          </Link>
        </div>

        <motion.div
          className="agent-profile-header__shell"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <div
            className="agent-profile-header__background"
            style={{ background: agent.backgroundGradient }}
          >
            <div className="agent-profile-header__glow" />

            <div className="agent-profile-header__floating-card agent-profile-header__floating-card--top">
              <FiAward />
              <div>
                <span>Closed volume</span>
                <strong>{agent.sales}</strong>
              </div>
            </div>

            <div className="agent-profile-header__floating-card agent-profile-header__floating-card--bottom">
              <FiStar />
              <div>
                <span>Client rating</span>
                <strong>{agent.rating}/5.0</strong>
              </div>
            </div>
          </div>

          <div className="agent-profile-header__profile glass-card-strong">
            <AgentAvatar
              name={agent.name}
              gradient={agent.gradient}
              size="lg"
            />

            <span className="brand-kicker">
              <FiStar />
              Featured agent
            </span>

            <h1>{agent.name}</h1>

            <p>{agent.title}</p>

            <div className="agent-profile-header__location">
              <FiMapPin />
              <span>{agent.location}</span>
            </div>

            <div className="agent-profile-header__specialty">
              {agent.specialty}
            </div>

            <div className="agent-profile-header__actions">
              <Link href={`/showings?agent=${agent.id}`}>
                <FiCalendar />
                Schedule showing
              </Link>

              <a href={`tel:${agent.phone}`}>
                <FiPhone />
                Call
              </a>

              <Link href={`/assistant?agent=${agent.id}`}>
                <FiMessageCircle />
                Ask AI
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}