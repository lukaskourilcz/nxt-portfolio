export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="mb-10 grid max-w-4xl gap-5 sm:mb-14 md:grid-cols-[10rem_1fr] md:gap-8">
      <p className="pt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
        {eyebrow}
      </p>
      <div>
        <h2
          id={`${id}-heading`}
          className="text-3xl font-semibold tracking-[-0.035em] text-primary sm:text-4xl lg:text-5xl"
        >
          {title}
        </h2>
        {intro ? (
          <p className="mt-5 max-w-[68ch] text-base leading-7 text-secondary sm:text-lg sm:leading-8">
            {intro}
          </p>
        ) : null}
      </div>
    </header>
  );
}
