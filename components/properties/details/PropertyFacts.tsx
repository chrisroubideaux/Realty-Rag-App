// components/properties/details/PropertyFacts.tsx

import {
  FiCalendar,
  FiDroplet,
  FiHome,
  FiMaximize2,
  FiTrendingUp,
} from "react-icons/fi";
import type { ListingDetail } from "@/app/listings/[id]/page";

type PropertyFactsProps = {
  listing: ListingDetail;
};

export default function PropertyFacts({ listing }: PropertyFactsProps) {
  return (
    <section className="listing-detail__facts">
      {typeof listing.beds === "number" && (
        <FactCard icon={<FiHome />} label="Bedrooms" value={listing.beds} />
      )}

      {typeof listing.baths === "number" && (
        <FactCard
          icon={<FiDroplet />}
          label="Bathrooms"
          value={listing.baths}
        />
      )}

      {typeof listing.sqft === "number" && (
        <FactCard
          icon={<FiMaximize2 />}
          label="Square feet"
          value={listing.sqft.toLocaleString()}
        />
      )}

      {typeof listing.acres === "number" && (
        <FactCard
          icon={<FiTrendingUp />}
          label="Acres"
          value={listing.acres}
        />
      )}

      {typeof listing.yearBuilt === "number" && (
        <FactCard
          icon={<FiCalendar />}
          label="Year built"
          value={listing.yearBuilt}
        />
      )}
    </section>
  );
}

function FactCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="listing-detail__fact-card">
      <div>{icon}</div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}