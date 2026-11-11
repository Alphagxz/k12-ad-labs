export default function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-line py-5" aria-hidden>
      <div className="marquee-track flex w-max">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0">
            {row.map((t, i) => (
              <span key={i} className="display flex items-center gap-8 pr-8 text-3xl md:text-5xl">
                {t}
                <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
