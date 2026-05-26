// components/agents/details/AgentContactCard.tsx

import Link from "next/link";
import {
  FiCalendar,
  FiMail,
  FiMessageCircle,
  FiPhone,
  FiShield,
} from "react-icons/fi";
import AgentAvatar from "./AgentAvatar";

type AgentContactCardProps = {
  agent: {
    id: string;
    name: string;
    title: string;
    phone: string;
    email: string;
    gradient: string;
  };
};

export default function AgentContactCard({ agent }: AgentContactCardProps) {
  return (
    <aside className="agent-contact-card glass-card-strong">
      <span className="brand-kicker">
        <FiShield />
        Contact agent
      </span>

      <div className="agent-contact-card__identity">
        <AgentAvatar name={agent.name} gradient={agent.gradient} size="md" />

        <div>
          <h3>{agent.name}</h3>
          <p>{agent.title}</p>
        </div>
      </div>

      <div className="agent-contact-card__links">
        <a href={`tel:${agent.phone}`}>
          <FiPhone />
          {agent.phone}
        </a>

        <a href={`mailto:${agent.email}`}>
          <FiMail />
          {agent.email}
        </a>
      </div>

      <div className="agent-contact-card__actions">
        <Link href={`/showings?agent=${agent.id}`}>
          <FiCalendar />
          Schedule showing
        </Link>

        <Link href={`/assistant?agent=${agent.id}`}>
          <FiMessageCircle />
          Ask AI
        </Link>
      </div>
    </aside>
  );
}