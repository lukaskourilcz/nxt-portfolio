import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Standard content section wrapper: centered, max-width, consistent vertical
// rhythm. Used by every page section except the hero. Each section carries a
// subtle full-bleed mesh accent (same family as the hero's), with the lobes
// mirrored per section so the page drifts left/right instead of banding.
export function Section({
  id,
  mesh,
  className,
  children,
}: {
  id: string;
  mesh: "left" | "right";
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("relative mx-auto max-w-5xl px-6 py-12 sm:py-24", className)}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 -z-10",
          mesh === "left" ? "mesh-left" : "mesh-right"
        )}
      />
      {children}
    </section>
  );
}
