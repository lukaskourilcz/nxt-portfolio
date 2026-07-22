export function BackgroundGrid() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0" />
      <div className="absolute left-1/2 top-0 h-56 w-px bg-gradient-to-b from-accent/30 to-transparent" />
      <div className="absolute inset-x-0 top-[31rem] h-px bg-gradient-to-r from-transparent via-edge to-transparent" />
    </div>
  );
}
