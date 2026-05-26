// components/properties/details/PropertyAiCard.tsx

import Link from "next/link";
import { FiMessageCircle } from "react-icons/fi";

type PropertyAiCardProps = {
  listingId: string;
};

export default function PropertyAiCard({ listingId }: PropertyAiCardProps) {
  return (
    <div className="listing-detail__ai-card glass-card-strong">
      <span className="brand-kicker">
        <FiMessageCircle />
        Ask AI
      </span>

      <h3>Have questions about this property?</h3>

      <p>
        Later, this card can ask the RAG assistant questions using this listing
        and any uploaded documents.
      </p>

      <Link href={`/assistant?listing=${listingId}`}>Ask about this listing</Link>
    </div>
  );
}