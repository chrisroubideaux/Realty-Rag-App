// components/properties/details/PropertySummaryCard.tsx

import { FiMapPin } from "react-icons/fi";
import type { ListingDetail } from "@/app/listings/[id]/page";

type PropertySummaryCardProps = {
  listing: ListingDetail;
  typeLabel: string;
};

export default function PropertySummaryCard({
  listing,
  typeLabel,
}: PropertySummaryCardProps) {
  return (
    <aside className="listing-detail__summary glass-card-strong">
      <span>{typeLabel}</span>

      <h1>{listing.title}</h1>

      <div className="listing-detail__location">
        <FiMapPin />
        <strong>{listing.address}</strong>
        <small>{listing.location}</small>
      </div>

      <div className="listing-detail__price">{listing.priceLabel}</div>

      <div className="listing-detail__status">
        <span>{listing.status}</span>
      </div>
    </aside>
  );
}