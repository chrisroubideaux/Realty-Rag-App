// components/properties/details/PropertyAgentCard.tsx

import type { ListingDetail } from "@/app/listings/[id]/page";

type PropertyAgentCardProps = {
  agent: ListingDetail["agent"];
};

export default function PropertyAgentCard({ agent }: PropertyAgentCardProps) {
  return (
    <div className="listing-detail__agent-card glass-card-strong">
      <span className="brand-kicker">Listing agent</span>

      <div className="listing-detail__agent-avatar">{getInitials(agent.name)}</div>

      <h3>{agent.name}</h3>

      <p>{agent.title}</p>

      <a href={`tel:${agent.phone}`}>{agent.phone}</a>

      <a href={`mailto:${agent.email}`}>{agent.email}</a>

      <button type="button">Request a showing</button>
    </div>
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