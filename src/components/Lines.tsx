/** Headline split into masked lines; animated by ScrollFX (or Hero). */
export default function Lines({
  lines,
  as: Tag = "h2",
  className = "",
  manual = false,
}: {
  lines: readonly string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  /** true = the parent component animates it itself */
  manual?: boolean;
}) {
  return (
    <Tag className={className} {...(manual ? {} : { "data-lines": "" })} aria-label={lines.join(" ")}>
      {lines.map((l, i) => (
        <span key={i} className="line-mask" aria-hidden>
          <span className="line-inner">{l}</span>
        </span>
      ))}
    </Tag>
  );
}
