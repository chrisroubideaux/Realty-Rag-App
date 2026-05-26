// components/properties/details/PropertyHighlights.tsx

type PropertyHighlightsProps = {
  highlights: string[];
};

export default function PropertyHighlights({
  highlights,
}: PropertyHighlightsProps) {
  return (
    <section className="listing-detail__section glass-card-strong">
      <span className="brand-kicker">Highlights</span>

      <h2>Key features</h2>

      <div className="listing-detail__highlights">
        {highlights.map((highlight) => (
          <span key={highlight}>{highlight}</span>
        ))}
      </div>
    </section>
  );
}