// components/agents/details/AgentAvatar.tsx

type AgentAvatarProps = {
  name: string;
  imageUrl?: string | null;
  gradient: string;
  size?: "sm" | "md" | "lg";
};

export default function AgentAvatar({
  name,
  imageUrl,
  gradient,
  size = "lg",
}: AgentAvatarProps) {
  return (
    <div className={`agent-avatar agent-avatar--${size}`} style={{ background: gradient }}>
      {imageUrl ? (
        <img src={imageUrl} alt={name} />
      ) : (
        <span>{getInitials(name)}</span>
      )}
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