export function BackgroundGrid() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0" />
      <div className="absolute left-1/2 top-[-16rem] h-[38rem] w-[62rem] -translate-x-1/2 rounded-full bg-emerald-500/[0.07] blur-[120px]" />
    </div>
  );
}
