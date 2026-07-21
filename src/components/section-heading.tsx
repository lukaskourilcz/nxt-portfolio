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
    <header className="mb-10 max-w-3xl sm:mb-14">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-emerald-400">
        {eyebrow}
      </p>
      <h2
        id={`${id}-heading`}
        className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-zinc-100 sm:text-4xl lg:text-5xl"
      >
        {title}
      </h2>
      {intro ? (
        <p className="mt-5 max-w-[68ch] text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
          {intro}
        </p>
      ) : null}
    </header>
  );
}
