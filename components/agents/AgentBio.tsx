// components/agents/details/AgentBio.tsx

import { FiUserCheck } from "react-icons/fi";

type AgentBioProps = {
  name: string;
  bio: string;
  highlights: string[];
};

export default function AgentBio({ name, bio, highlights }: AgentBioProps) {
  return (
    <section className="agent-bio glass-card-strong">
      <span className="brand-kicker">
        <FiUserCheck />
        About {name.split(" ")[0]}
      </span>

      <h2>Local guidance with a modern real estate workflow.</h2>

      <p>{bio}</p>

      <div className="agent-bio__highlights">
        {highlights.map((highlight) => (
          <span key={highlight}>{highlight}</span>
        ))}
      </div>
    </section>
  );
}