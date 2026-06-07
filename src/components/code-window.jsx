/**
 * A small editor/terminal window frame with macOS-style traffic lights that
 * reveal their close / minimize / fullscreen glyphs on hover (like real macOS).
 * Used in the hero to render a code-styled "about" snippet.
 */
const GLYPH =
  "h-2 w-2 opacity-0 transition-opacity duration-150 group-hover/lights:opacity-100";
const DOT =
  "flex h-3 w-3 items-center justify-center rounded-full shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.2)]";

export function CodeWindow({ title = "lukas.ts", children, className = "" }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-sm ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-800/50 px-4 py-3">
        <div className="group/lights flex items-center gap-2">
          <span className={`${DOT} bg-[#ff5f57]`} aria-label="Close" role="button">
            <svg
              viewBox="0 0 12 12"
              fill="none"
              stroke="#4d0000"
              strokeWidth="1.5"
              strokeLinecap="round"
              className={GLYPH}
            >
              <path d="M3.5 3.5l5 5M8.5 3.5l-5 5" />
            </svg>
          </span>
          <span className={`${DOT} bg-[#febc2e]`} aria-label="Minimize" role="button">
            <svg
              viewBox="0 0 12 12"
              fill="none"
              stroke="#965700"
              strokeWidth="1.5"
              strokeLinecap="round"
              className={GLYPH}
            >
              <path d="M3 6h6" />
            </svg>
          </span>
          <span
            className={`${DOT} bg-[#28c840]`}
            aria-label="Enter full screen"
            role="button"
          >
            <svg viewBox="0 0 12 12" fill="#006500" className={GLYPH}>
              <path d="M3.4 3.4H7.2L3.4 7.2ZM8.6 8.6H4.8L8.6 4.8Z" />
            </svg>
          </span>
        </div>
        <span className="ml-2 font-mono text-xs text-zinc-500">{title}</span>
      </div>
      <div className="overflow-x-auto p-5 font-mono text-[0.8rem] leading-relaxed sm:text-sm">
        {children}
      </div>
    </div>
  );
}
