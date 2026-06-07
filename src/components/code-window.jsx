/**
 * A small editor/terminal window frame (traffic-light chrome + filename tab).
 * Used in the hero to render a code-styled "about" snippet.
 */
export function CodeWindow({ title = "lukas.ts", children, className = "" }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-zinc-100 bg-zinc-50/80 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-800/50">
        <span className="h-3 w-3 rounded-full bg-red-400/80" />
        <span className="h-3 w-3 rounded-full bg-amber-400/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
        <span className="ml-2 font-mono text-xs text-zinc-400 dark:text-zinc-500">
          {title}
        </span>
      </div>
      <div className="overflow-x-auto p-5 font-mono text-[0.8rem] leading-relaxed sm:text-sm">
        {children}
      </div>
    </div>
  );
}
