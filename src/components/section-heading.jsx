import { Reveal } from "./reveal";

/**
 * Numbered, monospace section header — e.g.  02 / experience
 * followed by a large sans title and a fading rule.
 */
export function SectionHeading({ index, command, title }) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="flex items-center gap-2 font-mono text-sm">
        <span className="text-emerald-500">{index}</span>
        <span className="text-zinc-600">/</span>
        <span className="text-emerald-400">{command}</span>
      </div>
      <div className="mt-3 flex items-center gap-5">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-100 md:text-4xl">
          {title}
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-zinc-700 to-transparent" />
      </div>
    </Reveal>
  );
}
