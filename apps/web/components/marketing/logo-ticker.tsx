const companies = ["Stripe", "Linear", "Notion", "Vercel", "Figma", "Wise", "Anthropic"];

export function LogoTicker() {
  const items = [...companies, ...companies];

  return (
    <div className="overflow-hidden border-y border-border py-8">
      <p className="mb-6 text-center text-label">Trusted by job seekers at</p>
      <div className="relative">
        <div
          className="logo-ticker-track flex w-max gap-12 px-6 motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-10 motion-reduce:gap-y-4"
          aria-hidden
        >
          {items.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="shrink-0 text-sm font-semibold tracking-wide text-muted-foreground/70"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
