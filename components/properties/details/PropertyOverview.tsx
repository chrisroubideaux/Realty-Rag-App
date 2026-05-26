// components/properties/details/PropertyOverview.tsx

import { FiStar } from "react-icons/fi";
import type { ListingDetail } from "@/app/listings/[id]/page";

type PropertyOverviewProps = {
  listing: ListingDetail;
};

export default function PropertyOverview({ listing }: PropertyOverviewProps) {
  return (
    <section className="listing-detail__section glass-card-strong">
      <span className="brand-kicker">
        <FiStar />
        Property overview
      </span>

      <h2>About this listing</h2>

      <p>{listing.description}</p>
    </section>
  );
}