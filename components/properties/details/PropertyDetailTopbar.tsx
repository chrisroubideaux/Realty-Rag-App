// components/properties/details/PropertyDetailTopbar.tsx

import Link from "next/link";
import { FiArrowLeft, FiHeart, FiShare2 } from "react-icons/fi";

export default function PropertyDetailTopbar() {
  return (
    <div className="listing-detail__topbar">
      <Link href="/listings" className="listing-detail__back-link">
        <FiArrowLeft />
        Back to listings
      </Link>

      <div className="listing-detail__actions">
        <button type="button">
          <FiHeart />
          Save
        </button>

        <button type="button">
          <FiShare2 />
          Share
        </button>
      </div>
    </div>
  );
}